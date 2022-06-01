import {
  Stack,
  Wrap,
  WrapItem,
  Switch,
  useColorMode,
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useState, useRef, useEffect, useCallback, ChangeEvent } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

export const SwitchRankedSfx = () => {
  const { t } = useTranslation(["settings", "common"]);
  const [Settings, setSettings] = useLocalStorage("user-settings", null);
  const [isSfxDisabled, setIsSfxDisabled] = useState<boolean>(false);

  const handleSwitch = (e: ChangeEvent<HTMLInputElement>) => {
    setIsSfxDisabled(e.target.checked);
    handleSettings(e.target.checked);
  };

  const handleSettings = useCallback(
    (v: boolean) => {
      if (Settings) {
        let us = Settings["us"];
        if (us !== undefined) {
          setSettings({ ...Settings, us: v });
        } else {
          setSettings({ ...Settings, us: false });
        }
      } else {
        setSettings({ us: false });
      }
    },
    [Settings]
  );

  const isMount: any = useRef();
  useEffect(() => {
    if (isMount?.current === true) return;
    isMount.current = true;
    if (Settings) {
      let us = Settings["us"];
      if (us !== undefined) {
        setIsSfxDisabled(us);
      } else {
        setSettings({ ...Settings, us: false });
      }
    } else {
      setSettings({ us: false });
    }
  }, [Settings]);

  return (
    <Wrap>
      <WrapItem>
        <Switch
          onChange={handleSwitch}
          isDisabled={Settings === undefined}
          isChecked={isSfxDisabled}
          colorScheme="green"
          size="lg"
        />
      </WrapItem>
      <WrapItem alignItems="center">
        <Text fontSize="sm">{t("switch_sfx")}</Text>
      </WrapItem>
    </Wrap>
  );
};
