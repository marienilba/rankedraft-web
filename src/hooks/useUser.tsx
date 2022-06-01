import { useEffect, useState, createContext, useContext } from "react";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";

export const UserContext = createContext<any>(undefined);

export const UserContextProvider = (props) => {
  const [userLoaded, setUserLoaded] = useState(false);
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    const session = supabase.auth.session();
    setSession(session);
    setUser(session?.user ?? null);
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_OUT") {
          await fetch("/api/auth/set", {
            method: "POST",
            headers: new Headers({ "Content-Type": "application/json" }),
            credentials: "same-origin",
            body: JSON.stringify({ event, session }),
          });
        }
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    async function setSupabaseCookie(session) {
      await fetch("/api/auth/set", {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        credentials: "same-origin",
        body: JSON.stringify({ event: "SIGNED_IN", session }),
      });
    }
    if (userLoaded && session) {
      setSupabaseCookie(session);
    }
  }, [userLoaded]);

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
  }, [user]);

  const value = {
    session,
    user,
    userRole,
    userLoaded,
    subscription,
    signIn: () =>
      supabase.auth.signIn({
        provider: "google",
      }),
    signUp: () =>
      supabase.auth.signUp({
        provider: "google",
      }),
    signOut: async () => {
      router.push("/");
      await fetch("/api/auth/remove", {
        method: "GET",
        credentials: "same-origin",
      });
      queryClient.clear();
      setUserRole(null);
      setSubscription(null);
      return supabase.auth.signOut();
    },
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
