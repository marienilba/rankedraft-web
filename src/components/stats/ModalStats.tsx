import {
  Flex,
  Heading,
  Spacer,
  Stack,
  Tab,
  Table,
  TableCaption,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useQuery } from "react-query";
import { fetchStats } from "../../queries/Stats";
import { Breeds } from "../../utils/BreedIndex";
import { LoadingTopBar } from "../LoadingTopBar";

export const ModalStats = ({ options, search }) => {
  const { t } = useTranslation(["stats"]);
  const { isLoading, data, isSuccess, isError } = useQuery(
    [
      "stats",
      options.pseudo,
      options.team_id,
      options.map_id,
      options.result,
      options.letter,
      options.is_kta,
      options.initiative,
      options.start_date,
      options.end_date,
      search.compo,
      search.respect_order,
    ],
    () => fetchStats({ options, search })
  );

  if (isLoading || !data) {
    return <LoadingTopBar />;
  }

  const { Globale, Lettre, MyPicks, TheirPicks, Maps, Opponents } = data;
  return (
    <Tabs isFitted variant="line" isLazy marginX="3" marginY="2">
      <TabList mb="1em">
        <Tab>{t("tabs.globale")}</Tab>
        <Tab>{t("tabs.letter")}</Tab>
        <Tab>{t("tabs.picks")}</Tab>
        <Tab>{t("tabs.opponents")}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <GlobaleTable globale={Globale} />
        </TabPanel>
        <TabPanel>
          <LettreTable lettre={Lettre} />
        </TabPanel>
        <TabPanel>
          <PicksTables myPicks={MyPicks} theirPicks={TheirPicks} />
        </TabPanel>
        <TabPanel>
          <OpponentsTable opponents={Opponents} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

const OpponentsTable = ({ opponents }) => {
  const { t } = useTranslation(["stats"]);

  return (
    <TableContainer
      maxHeight="60vh"
      overflowY="auto"
      css={{
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-track": {
          width: "6px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "gray",
          borderRadius: "24px",
        },
      }}
    >
      <Table size="sm" variant="striped">
        <TableCaption placement="top">{t("caption.opponents")}</TableCaption>
        <Thead>
          <Tr>
            <Th>{t("th.opponent")}</Th>
            <Th>{t("th.win")}</Th>
            <Th>{t("th.lose")}</Th>
            <Th isNumeric>{t("th.winrate")}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.keys(opponents.repartitions).map((value, idx) => {
            const { wins, looses, percent } = opponents.repartitions[value];
            return (
              <Tr key={`opp-${idx}`}>
                <Td>{value}</Td>
                <Td>{wins}</Td>
                <Td>{looses}</Td>
                <Td isNumeric>{percent.toFixed(2)}%</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

const PicksTables = ({ myPicks, theirPicks }) => {
  const { t } = useTranslation(["stats"]);
  const { repartitions: myRepartitions } = myPicks;
  const { repartitions: theirRepartitions } = theirPicks;

  const capitalizeFirstLetter = (txt: string): string => {
    return txt.charAt(0).toUpperCase() + txt.slice(1);
  };

  return (
    <Stack direction="row" alignItems="center">
      <Spacer />
      <Stack>
        <Heading textAlign="center" fontSize="md">
          {t("caption.my_picks")}
        </Heading>
        <TableContainer
          maxHeight="60vh"
          overflowY="auto"
          css={{
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "gray",
              borderRadius: "24px",
            },
          }}
        >
          <Table size="sm" variant="striped">
            <Thead>
              <Tr>
                <Th>{t("th.breed")}</Th>
                <Th>{t("th.number")}</Th>
                <Th isNumeric>{t("th.winrate")}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {myRepartitions.slice(0).map(({ wins, looses, percent }, idx) => {
                if (wins + looses > 0)
                  return (
                    <Tr key={`picks_m-${idx}`}>
                      <Td>{capitalizeFirstLetter(Breeds[idx + 1])}</Td>
                      <Td>{wins + looses}</Td>
                      <Td isNumeric>{percent.toFixed(2)}%</Td>
                    </Tr>
                  );
                else <></>;
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Stack>
      <Spacer />
      <Stack>
        <Heading textAlign="center" fontSize="md">
          {t("caption.opp_picks")}
        </Heading>
        <TableContainer
          maxHeight="60vh"
          overflowY="auto"
          css={{
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "gray",
              borderRadius: "24px",
            },
          }}
        >
          <Table size="sm" variant="striped">
            <Thead>
              <Tr>
                <Th>{t("th.breed")}</Th>
                <Th>{t("th.number")}</Th>
                <Th isNumeric>{t("th.winrate")}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {theirRepartitions
                .slice(0)
                .map(({ wins, looses, percent }, idx) => {
                  if (wins + looses > 0)
                    return (
                      <Tr key={`picks_t-${idx}`}>
                        <Td>{capitalizeFirstLetter(Breeds[idx + 1])}</Td>
                        <Td>{wins + looses}</Td>
                        <Td isNumeric>{percent.toFixed(2)}%</Td>
                      </Tr>
                    );
                  else <></>;
                })}
            </Tbody>
          </Table>
        </TableContainer>
      </Stack>

      <Spacer />
    </Stack>
  );
};

const LettreTable = ({ lettre }) => {
  const { t } = useTranslation(["stats"]);

  const { A, B } = lettre;
  return (
    <TableContainer>
      <Table size="sm">
        <TableCaption placement="top">
          {t("caption.letter", { nb: A.number + B.number })}
        </TableCaption>
        <Thead>
          <Tr>
            <Th>{t("th.letter")}</Th>
            <Th>{t("th.number")}</Th>
            <Th isNumeric>{t("th.winrate")}</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>A</Td>
            <Td>{A.number}</Td>
            <Td isNumeric>{A.wins_percent.toFixed(2)}%</Td>
          </Tr>
          <Tr>
            <Td>B</Td>
            <Td>{B.number}</Td>
            <Td isNumeric>{B.wins_percent.toFixed(2)}%</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

const GlobaleTable = ({ globale }) => {
  const { t } = useTranslation(["stats"]);
  const { wins, looses, wins_percent, looses_percent } = globale;
  return (
    <TableContainer>
      <Table size="sm">
        <TableCaption placement="top">
          {t("caption.globale", { nb: wins + looses })}
        </TableCaption>
        <Thead>
          <Tr>
            <Th>{t("th.result")}</Th>
            <Th>{t("th.number")}</Th>
            <Th isNumeric>{t("th.winrate")}</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>{t("td.wins")}</Td>
            <Td>{wins}</Td>
            <Td isNumeric>{wins_percent.toFixed(2)}%</Td>
          </Tr>
          <Tr>
            <Td>{t("td.loses")}</Td>
            <Td>{looses}</Td>
            <Td isNumeric>{looses_percent.toFixed(2)}%</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};
