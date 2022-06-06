import { Box, Heading, Divider, UnorderedList } from "@chakra-ui/react";
import { Fragment } from "react";
import { useTheme } from "../../hooks/useTheme";
import { Changelog } from "../../pages/home/Types";
import { formatDate } from "../../utils/HelpersFunction";

export const ChangelogCard = ({ version, created_at, logs }: Changelog) => {
  const { backgroundColor: bg } = useTheme({ variant: "secondary" });

  const addedLogs = {
    type: "added",
    logs: logs.filter(({ type }) => type === "added"),
  };
  const fixedLogs = {
    type: "fixed",
    logs: logs.filter(({ type }) => type === "fixed"),
  };
  const removedLogs = {
    type: "removed",
    logs: logs.filter(({ type }) => type === "removed"),
  };

  return (
    <Box
      width="100%"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      {...bg}
    >
      <Heading p={2} textTransform="uppercase">
        màj: {version}
        <Box
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          textTransform="uppercase"
          ml="2"
        >
          &bull; {formatDate(created_at)}
        </Box>
      </Heading>
      <Divider />
      <Box p="3">
        {[addedLogs, fixedLogs, removedLogs].map(({ type, logs }) => (
          <Fragment key={`${type}-logs-${version}`}>
            <Heading fontSize="md" textTransform="capitalize">
              {type}
            </Heading>
            <UnorderedList spacing={1}>
              {logs.map(({ content }, index) => (
                <Fragment key={`log-list-${index}-${type}-${version}`}>
                  {content(null)}
                </Fragment>
              ))}
            </UnorderedList>
          </Fragment>
        ))}
      </Box>
    </Box>
  );
};
