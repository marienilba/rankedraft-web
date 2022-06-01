import {
  Stack,
  Wrap,
  WrapItem,
  Tooltip,
  Flex,
  Divider,
  Heading,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  Button,
  useBoolean,
} from "@chakra-ui/react";
import {
  useState,
  ChangeEvent,
  Fragment,
  useRef,
  useEffect,
  useCallback,
} from "react";
import useInput from "../../hooks/useInput";
import { Transfer } from "./Transfer";
import { SiGooglesheets } from "react-icons/si";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useTranslation } from "next-i18next";

export const ImportFromTsv = () => {
  const { isMobile } = useWindowSize();
  const { t } = useTranslation(["settings", "common"]);
  const [tsvParsed, setTsvParsed] = useState<string[][]>([]);
  const ref: any = useRef();
  const [Settings, setSettings] = useLocalStorage("user-settings", null);
  const [url] = useInput("-1");
  const [result] = useInput("-1");
  const [map] = useInput("-1");
  const [comments] = useInput("-1");
  const [initiative] = useInput("-1");
  const [format, setFormat] = useState({ w: "", l: "" });
  const [hasAutocplt, setHasAutocplt] = useBoolean(false);

  const handleHasAutocplt = useCallback(() => {
    if (Settings) {
      if (Settings.hasOwnProperty("autocplt")) {
        let at = Settings["autocplt"];
        if (at.length < 1) return false;
      } else {
        return false;
      }
    } else {
      return false;
    }
    return true;
  }, [Settings]);

  const handleInputFile = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      setTsvParsed(
        (e.target.result as string).split("\n").map((line) => line.split("\t"))
      );
    };
    reader.readAsText(e.target.files[0]);
  }, []);

  useEffect(() => {
    handleHasAutocplt() ? setHasAutocplt.on() : setHasAutocplt.off();
  }, [Settings]);

  return (
    <Stack>
      <Heading fontSize="2xl">{t("import_from_sheet")}</Heading>
      <Stack>
        <Flex>
          <Button
            leftIcon={<SiGooglesheets />}
            onClick={() => {
              if (!ref.current) return;
              ref.current.click();
            }}
            isDisabled={tsvParsed.length > 0 || !hasAutocplt}
          >
            {t("import_file")} .tsv
          </Button>
        </Flex>
        <Text fontSize="sm">{!hasAutocplt && t("import_file_warning")}</Text>
      </Stack>

      <input
        ref={ref}
        style={{ width: "200px", visibility: "hidden", height: "0px" }}
        type="file"
        placeholder="input"
        accept=".tsv"
        onChange={handleInputFile}
      />
      {tsvParsed.length > 0 && (
        <Fragment>
          {tsvParsed.slice(0, 5).map((lines, idx) => {
            return (
              <Wrap key={`parsed-lines-${idx}`} direction="row">
                {lines.map((line, index) => {
                  return (
                    <WrapItem key={`parsed-lines-${idx}-line-${index}`}>
                      <Tooltip label={`Index ${index}`}>
                        <Flex
                          borderColor="cyan.500"
                          borderWidth="2px"
                          borderRadius={5}
                          padding={2}
                        >
                          <Text noOfLines={[0, 4]} fontSize="xs">
                            {line}
                          </Text>
                        </Flex>
                      </Tooltip>
                    </WrapItem>
                  );
                })}
              </Wrap>
            );
          })}
          <Divider margin={5} />
          <Wrap>
            <WrapItem alignItems="center" maxW={isMobile ? "auto" : "25%"}>
              <Heading fontSize="md" mr={1}>
                Index {t("url")}*
              </Heading>
              <NumberInput
                defaultValue={-1}
                min={-1}
                clampValueOnBlur={false}
                maxW={"100px"}
                {...url}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </WrapItem>
            <WrapItem alignItems="center" maxW={isMobile ? "auto" : "25%"}>
              <Heading fontSize="md" mr={1}>
                Index {t("result")}?
              </Heading>
              <NumberInput
                defaultValue={-1}
                min={-1}
                clampValueOnBlur={false}
                {...result}
                maxW={"100px"}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </WrapItem>
            <WrapItem alignItems="center" maxW={isMobile ? "auto" : "25%"}>
              <Heading fontSize="md" mr={1}>
                Index {t("initiative")}?
              </Heading>
              <NumberInput
                defaultValue={-1}
                min={-1}
                clampValueOnBlur={false}
                {...initiative}
                maxW={"100px"}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </WrapItem>
            <WrapItem alignItems="center" maxW={isMobile ? "auto" : "25%"}>
              <Heading fontSize="md" mr={1}>
                Index {t("map")}?
              </Heading>
              <NumberInput
                defaultValue={-1}
                min={-1}
                clampValueOnBlur={false}
                {...map}
                maxW={"100px"}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </WrapItem>
            <WrapItem alignItems="center" maxW={isMobile ? "auto" : "25%"}>
              <Heading fontSize="md" mr={1}>
                Index {t("comments")}?
              </Heading>
              <NumberInput
                defaultValue={-1}
                min={-1}
                clampValueOnBlur={false}
                {...comments}
                maxW={"100px"}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </WrapItem>
          </Wrap>
          <Transfer
            tsv={tsvParsed}
            idxs={{
              url: url.value,
              result: result.value,
              initiative: initiative.value,
              map: map.value,
              comments: comments.value,
            }}
            format={format}
          />
        </Fragment>
      )}
    </Stack>
  );
};
