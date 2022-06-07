import { useRouter } from "next/router";
import {
  useEffect,
  createContext,
  useContext,
  useCallback,
  useReducer,
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

type State = {
  title: string;
  previous?: string;
};

type Action = {
  type: "reset" | "edit" | "change" | "append" | "back";
  value?: string;
};
function reducer(state: State, action: Action) {
  switch (action.type) {
    case "reset":
      return { title: "RankeDraft" };
    case "edit":
      return { title: `${action.value} / RankeDraft` };
    case "change":
      return { title: action.value, previous: state.title };
    case "append":
      return { title: `${action.value} ${state.title} / RankeDraft` };
    case "back":
      return { title: state.previous ?? state.title, previous: null };
    default:
      throw new Error();
  }
}

export const TitleContextProvider = (props) => {
  const [title, dispatch] = useReducer<(state: State, action: Action) => State>(
    reducer,
    { title: "RankeDraft", previous: null }
  );
  const titles = Titles;
  const { locale, pathname } = useRouter();

  const handleTitle = useCallback((locale: string, pathname: string) => {
    if (!pathname || !locale) {
      dispatch({ type: "reset" });
      return;
    }
    if (pathname === "/") {
      dispatch({ type: "reset" });
      return;
    }
    const path_title = titles[locale][pathname];
    if (path_title === undefined) {
      dispatch({ type: "reset" });
      return;
    }
    dispatch({ type: "edit", value: path_title });
  }, []);

  useEffect(() => {
    handleTitle(locale, pathname);
    return () => {
      //
    };
  }, [locale, pathname]);

  const value = {
    title: title.title,
    dispatch,
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
