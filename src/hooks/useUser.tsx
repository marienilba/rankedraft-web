import { useRouter } from "next/router";
import {
  useEffect,
  useState,
  createContext,
  useContext,
  useCallback,
} from "react";
import { supabase } from "../lib/supabaseClient";

export const UserContext = createContext<any>(undefined);

export const UserContextProvider = (props) => {
  const [userLoaded, setUserLoaded] = useState(false);
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [isFetchingUser, setIsFetchingUser] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const session = supabase.auth.session();
    setSession(session);
    setUser(session?.user ?? null);
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        await fetch("/api/auth/set", {
          method: "POST",
          headers: new Headers({ "Content-Type": "application/json" }),
          credentials: "same-origin",
          body: JSON.stringify({ event, session }),
        });

        if (
          event === "SIGNED_IN" &&
          router.pathname === "/" &&
          typeof window !== "undefined"
        ) {
          // this is here because provider don't success to redirect to /home
          router.push({ pathname: "/home" });
          router.pathname = "/home"; // Otherwise, because callback don't have any deps, so never change, so pathname is not updated, and user would go back to home each time he refocus the window
        }

        if (event === "SIGNED_OUT") router.push("/");
        if (event === "PASSWORD_RECOVERY") {
          console.log(event);
        }
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const getUserRole = () => supabase.auth.user();

  useEffect(() => {
    if (user) {
      Promise.allSettled([getUserRole()]).then((results) => {
        const userDetailsPromise = results[0];

        if (userDetailsPromise.status === "fulfilled") {
          setUserRole(userDetailsPromise.value.app_metadata?.role);
        }

        setUserLoaded(true);
      });
    }
    setIsFetchingUser(false);
  }, [user]);

  const value = {
    session,
    user,
    userRole,
    userLoaded,
    isFetchingUser,
    subscription,
    signUpWithEmail: async ({ email, password, username }) =>
      supabase.auth.signUp(
        { email, password },
        {
          data: { name: username },
          redirectTo:
            process.env.NODE_ENV === "production"
              ? process.env.NEXT_PUBLIC_HOST
              : "http://localhost:3000",
        }
      ),
    signInWithEmail: async ({ email, password }) =>
      supabase.auth.signIn(
        { email, password },
        {
          redirectTo:
            process.env.NODE_ENV === "production"
              ? process.env.NEXT_PUBLIC_HOST
              : "http://localhost:3000/home",
        }
      ),
    signInWithProvider: async (provider: "google" | "discord") =>
      supabase.auth.signIn(
        {
          provider,
        },
        {
          redirectTo:
            process.env.NODE_ENV === "production"
              ? process.env.NEXT_PUBLIC_HOST
              : "http://localhost:3000/home",
        }
      ),

    signOut: async () => {
      setUserRole(null);
      setSubscription(null);
      await fetch("/api/auth/remove", {
        method: "GET",
        credentials: "same-origin",
      });
      return supabase.auth.signOut();
    },
    recoverPassword: async (email: string) =>
      supabase.auth.api.resetPasswordForEmail(email, {
        redirectTo:
          process.env.NODE_ENV === "production"
            ? `${process.env.NEXT_PUBLIC_HOST}/account/reset`
            : "http://localhost:3000/account/reset",
      }),
    resetPassword: async (token: string, password: string) =>
      supabase.auth.api.updateUser(token, { password: password }),
  };

  return <UserContext.Provider value={value} {...props} />;
};
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`);
  }
  return context;
};
