import {
  Box,
  Heading,
  Divider,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useTheme } from "../../hooks/useTheme";
import { Changelog } from "../../pages/api/news/Types";
import { formatDate } from "../../utils/HelpersFunction";

export const ChangelogCard = ({
  version,
  created_at: date,
  logs,
}: Changelog) => {
  const { backgroundColor: bg } = useTheme({ variant: "secondary" });
  const { locale } = useRouter();
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
  const created_at = new Date(date);

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
          <Box key={`${type}-logs-${version}`} mb="4">
            {logs.length > 0 && (
              <Heading fontSize="md" textTransform="capitalize">
                {type}
              </Heading>
            )}
            <UnorderedList spacing={1}>
              {(logs.length ? logs : []).map(({ locales }, index) => (
                <Box key={`log-list-${index}-${type}-${version}`}>
                  <ListItem> {locales[locale] || locales["fr"]}</ListItem>
                </Box>
              ))}
            </UnorderedList>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
