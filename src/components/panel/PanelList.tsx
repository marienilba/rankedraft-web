import {
  Divider,
  Flex,
  Heading,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

import { LobbyLine } from "../ranked/LobbyLine";
import { Player } from "./Player";

export const PanelList = ({ queue, lobbies }) => {
  return (
    <Flex direction="column" width="100%" marginLeft="5%">
      <Heading textAlign="center">Panel</Heading>
      <Divider />
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Queue ({queue.length})</Tab>
          <Tab>Lobbies ({lobbies.length})</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {queue.map((player, idx: number) => {
              return <Player {...player} key={`queue_line-${idx}`} />;
            })}
          </TabPanel>
          <TabPanel>
            <Stack>
              {lobbies.map((lobby, idx: number) => {
                return <LobbyLine {...lobby} key={`lobby_line-${idx}`} />;
              })}
            </Stack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};
