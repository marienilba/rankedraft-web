import { useRouter } from "next/router";
import {
  useEffect,
  useState,
  createContext,
  useContext,
  useCallback,
} from "react";

const Titles = {
  fr: {
    "/home": "Accueil",
    "/ranked": "Ranked",
    "/history": "Historique",
    "/teams": "Équipes",
    "/profile": "Profil",
    "/settings": "Paramètres",
    "/moderation": "Modération",
    "/tos": "Conditions d'utilisation",
    "/policy": "Politique de confidentialité",
    "/contribute": "Contribuer",
    "/stats": "Statistique",
    "/account": "Compte",
    "/account/reset": "Réinitialiser",
    "/panel": "Panel",
  },
  en: {
    "/home": "Home",
    "/ranked": "Ranked",
    "/history": "History",
    "/teams": "Teams",
    "/profile": "Profile",
    "/settings": "Settings",
    "/moderation": "Moderation",
    "/tos": "Term of use",
    "/policy": "Privacy policy",
    "/contribute": "Contribute",
    "/stats": "Statistics",
    "/account": "Account",
    "/account/reset": "Reset",
    "/panel": "Panel",
  },
};

export const TitleContext = createContext<any>(undefined);

export const TitleContextProvider = (props) => {
  const [title, setTitle] = useState<string>(null);
  const titles = Titles;
  const { locale, pathname } = useRouter();

  const editTitle = useCallback((t: string) => {
    setTitle(`${t} / RankeDraft`);
  }, []);

  const onFocus = () => {
    handleTitle(locale, pathname);
  };

  useEffect(() => {
    if (typeof window === undefined) return;
    window.addEventListener("focus", onFocus);
    return () => {
      if (typeof window === undefined) return;
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  const handleTitle = useCallback((locale: string, pathname: string) => {
    if (!pathname || !locale) {
      setTitle("RankeDraft");
      return;
    }
    if (pathname === "/") {
      setTitle("RankeDraft");
      return;
    }
    const path_title = titles[locale][pathname];
    if (path_title === undefined) {
      setTitle("RankeDraft");
      return;
    }
    editTitle(path_title);
  }, []);

  useEffect(() => {
    handleTitle(locale, pathname);
    return () => {
      //
    };
  }, [locale, pathname]);

  const append = useCallback((ap: string) => {
    setTitle((t) => `${ap} ${t}`);
  }, []);

  const value = {
    title,
    append,
  };

  return <TitleContext.Provider value={value} {...props} />;
};
export const useTitle = () => {
  const context = useContext(TitleContext);
  if (context === undefined) {
    throw new Error(`useTitle must be used within a TitleContextProvider.`);
  }
  return context;
};
