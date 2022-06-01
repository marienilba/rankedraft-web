import { CopyIcon, RepeatIcon } from "@chakra-ui/icons";
import { IconButton, Input, Flex, Button, Link } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { ChangeEvent } from "react";
import { useWindowSize } from "../../../hooks/useWindowSize";

export const Url = ({
  URL,
  onReset,
  onDraft,
  onPaste,
  isDisabled = false,
}: {
  URL: string;
  onReset: () => void;
  onDraft: (e: ChangeEvent<HTMLInputElement>) => void;
  onPaste: () => void;
  isDisabled?: boolean;
}) => {
  const { isScreen, isPad } = useWindowSize();
  const { t } = useTranslation(["history", "common"]);

  return (
    <>
      {!URL ? (
        <>
          <IconButton
            icon={<CopyIcon />}
            aria-label="paste"
            onClick={onPaste}
            isDisabled={isDisabled}
            mr="4px"
          />
          <Input
            placeholder={t("module.paste_link")}
            value={URL}
            onChange={onDraft}
            isDisabled={isDisabled}
          />
        </>
      ) : (
        <Flex alignItems="center">
          <IconButton
            icon={<RepeatIcon />}
            aria-label="edit"
            onClick={onReset}
            isDisabled={isDisabled}
            mr="4px"
          />
          {isScreen || isPad ? (
            <Link isExternal href={URL}>
              <Button
                variant={"outline"}
                colorScheme={"yellow"}
                fontSize={"xs"}
                as="samp"
              >
                {URL}
              </Button>
            </Link>
          ) : (
            <Link isExternal href={URL}>
              <Button
                variant={"outline"}
                colorScheme={"yellow"}
                fontSize={"xs"}
                as="samp"
              >
                {t("open_link")}
              </Button>
            </Link>
          )}
        </Flex>
      )}
    </>
  );
};
