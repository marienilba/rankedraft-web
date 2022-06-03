import { InfoOutlineIcon, PlusSquareIcon } from "@chakra-ui/icons";
import {
  useBoolean,
  Stack,
  Heading,
  Tooltip,
  Flex,
  Input,
  IconButton,
  Divider,
  Wrap,
  WrapItem,
  CloseButton,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useState, useEffect, useCallback, useRef } from "react";
import { useDevice } from "../../hooks/useDevice";
import useInput from "../../hooks/useInput";
import useLocalStorage from "../../hooks/useLocalStorage";

export const AutoCompleteSettings = () => {
  const { t } = useTranslation(["settings", "common"]);
  const { isMobile } = useDevice();
  const [pseudo] = useInput();
  const [Settings, setSettings] = useLocalStorage("user-settings", null);
  const [pseudos, setPseudos] = useState([]);
  const [mouseEnter, setMouserEnter] = useState("");
  const onMouseEnt = useCallback((p: string) => {
    setMouserEnter(p);
  }, []);
  const onMouseLef = useCallback(() => {
    setMouserEnter("");
  }, []);
  const AddPseudo = useCallback(() => {
    if (
      pseudo.value.trim() &&
      pseudo.value.trim().length < 30 &&
      !pseudos.includes(pseudo.value.trim())
    ) {
      setPseudos((arr) => [...arr, pseudo.value.trim()]);
      pseudo.onChange("");
    }
  }, [pseudo]);

  const RemovePseudo = useCallback((p: string) => {
    setPseudos((ps) => ps.filter((a) => a !== p));
    setMouserEnter("");
  }, []);

  useEffect(() => {
    if (Settings) {
      let st = { ...Settings, autocplt: pseudos };
      setSettings(st);
    }
  }, [pseudos]);

  const isMount: any = useRef();
  useEffect(() => {
    if (isMount?.current === true) return;
    isMount.current = true;
    if (Settings) {
      if (Settings.hasOwnProperty("autocplt")) {
        const p = Settings["autocplt"];
        setPseudos(p);
      } else {
        let st = { ...Settings, autocplt: [] };
        setSettings(st);
      }
    } else {
      setSettings({ autocplt: [] });
    }
  }, [Settings]);

  return (
    <Stack>
      <Stack direction="row">
        <Heading fontSize="2xl">{t("auto-complete")}</Heading>
        <Tooltip label={t("auto-complete_tooltip")}>
          <InfoOutlineIcon color="cyan.600" />
        </Tooltip>
      </Stack>
      <Wrap align="center">
        <Flex maxW="auto">
          <Input
            placeholder={`${t("username", { ns: "common" })} ${t("linking.or", {
              ns: "common",
            })} ${t("team", { ns: "common" })}`}
            {...pseudo}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                AddPseudo();
              }
            }}
          />
        </Flex>
        <IconButton
          icon={<PlusSquareIcon />}
          onClick={AddPseudo}
          aria-label="Add auto complete"
        />
        <Divider orientation="vertical" />
        <Wrap spacing={2} height="100%">
          {pseudos.map((p, idx) => {
            return isMobile ? (
              <WrapItem
                key={`pseudo-${p}-${idx}`}
                onMouseEnter={() => onMouseEnt(p)}
                onMouseLeave={onMouseLef}
              >
                <Heading fontSize="lg">{p}</Heading>
                <CloseButton size="sm" onClick={() => RemovePseudo(p)} />
              </WrapItem>
            ) : (
              <WrapItem
                key={`pseudo-${p}-${idx}`}
                onMouseEnter={() => onMouseEnt(p)}
                onMouseLeave={onMouseLef}
              >
                <Heading fontSize="lg">{p}</Heading>
                {mouseEnter === p && (
                  <CloseButton size="sm" onClick={() => RemovePseudo(p)} />
                )}
                <Divider orientation="vertical" ml={2} />
              </WrapItem>
            );
          })}
        </Wrap>
      </Wrap>
    </Stack>
  );
};
