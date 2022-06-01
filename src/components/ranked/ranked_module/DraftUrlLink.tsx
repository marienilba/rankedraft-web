import { Flex, Button, Link } from "@chakra-ui/react";

export const DraftUrlLink = ({
  draftURL,
  onValidate,
}: {
  draftURL: string;
  onValidate?: () => void;
}) => {
  if (onValidate === undefined) {
    return (
      <Flex justifyContent="center">
        <Link isExternal href={draftURL}>
          <Button
            variant="outline"
            colorScheme={"yellow"}
            fontSize={"xs"}
            as="samp"
          >
            {draftURL}
          </Button>
        </Link>
      </Flex>
    );
  }

  return (
    <Flex justifyContent="center">
      {!draftURL ? (
        <Button variant="ghost" fontSize={"xs"} as="samp">
          draft.ktarena.com/draft/invitation/🕦🕞🕢
        </Button>
      ) : (
        <Link isExternal href={draftURL} onClick={onValidate}>
          <Button
            variant={draftURL ? "outline" : "ghost"}
            colorScheme={draftURL && "yellow"}
            fontSize={"xs"}
            as="samp"
          >
            {draftURL || "draft.ktarena.com/draft/invitation/🕦🕞🕢"}
          </Button>
        </Link>
      )}
    </Flex>
  );
};
