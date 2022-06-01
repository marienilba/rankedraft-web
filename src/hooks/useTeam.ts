import { useBoolean } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getTeamsNames } from "../queries/Team";
import useLocalStorage from "./useLocalStorage";

interface Options {
  save?: boolean;
}

export interface Team {
  id: string;
  team_name: string;
}

export function useTeam(options: Options): [Team, (s: Team) => void, Team[]] {
  const { t } = useTranslation(["common"]);
  const [Selected, SetSelected] = useState<Team>({
    id: "",
    team_name: t("all"),
  });
  const [List, setList] = useState<Team[]>([{ id: "", team_name: t("all") }]);
  const [Settings, setSettings] = useLocalStorage("user-settings", null);
  const [firstLoad, setFirstLoad] = useBoolean(false);

  const [Save, setSave] = useBoolean(false);

  const { isLoading, data, isSuccess, isError } = useQuery(
    ["team", "names"],
    getTeamsNames
  );

  const handleSet = (Selection: Team) => {
    if (Selection === undefined) return;

    if (Settings) {
      if (Settings.hasOwnProperty("lt")) {
        if (Settings.lt !== null || Settings.lt !== undefined) {
          Save && setSettings({ ...Settings, lt: JSON.stringify(Selection) });
        }
      }
    }
    SetSelected(Selection);
  };

  useEffect(() => {
    const { save } = options;
    if (save !== undefined && save !== null)
      save ? setSave.on() : setSave.off();
  }, []);

  useEffect(() => {
    if (!isSuccess && !isError) {
      if (isSuccess) {
        if (data && data.length > 0) {
          setList([{ id: "", team_name: t("all") }, ...data]);
          if (!firstLoad) return;
          let f = data.find((t: Team) => t.id === Selected.id);
          if (f === undefined) SetSelected({ id: "", team_name: t("all") });
          else if (f && f.length < 1) {
            Save && SetSelected({ id: "", team_name: t("all") });
          }
        }
      }
    }
  }, [firstLoad]);

  useEffect(() => {
    if (!firstLoad) {
      if (Settings) {
        if (Settings.hasOwnProperty("lt")) {
          if (Settings.lt !== null || Settings.lt !== undefined) {
            let lt;
            try {
              lt = JSON.parse(Settings.lt);
            } catch (e) {
              lt = { id: "", team_name: t("all") };
            }
            SetSelected(lt);
          }
        } else {
          setSettings({ ...Settings, lt: {} });
        }
      } else {
        setSettings({
          lt: {},
        });
      }
      setFirstLoad.on();
    }
  }, [Settings]);

  useEffect(() => {
    if (isSuccess) {
      if (data && data.length > 0) {
        setList([{ id: "", team_name: t("all") }, ...data]);
        if (!firstLoad) return;
        let f = data.find((t: Team) => t.id === Selected.id);
        if (f === undefined) SetSelected({ id: "", team_name: t("all") });
        else if (f && f.length < 1) {
          Save && SetSelected({ id: "", team_name: t("all") });
        }
      }
    }
  }, [data, isSuccess, isError]);

  return [Selected, handleSet, List];
}
