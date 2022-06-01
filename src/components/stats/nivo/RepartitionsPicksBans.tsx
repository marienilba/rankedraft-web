import { Flex } from "@chakra-ui/react";
// import { ResponsiveNetwork } from "@nivo/network";
import { useState, useEffect } from "react";
import { Breeds } from "../../../utils/BreedIndex";
import { Stats, PathPicksBansData } from "./Data";

export const RepartitionsPicksBans = ({ stats }: { stats: Stats }) => {
  // const [data, setData] = useState<PathPicksBansData>();

  // const breedsColors = [
  //   "#74D0F1",
  //   "#74D0F1",
  //   "#FEFEE2",
  //   "#FDE9E0",
  //   "#5B3C11",
  //   "#99512B",
  //   "#5A5E6B",
  //   "#7F7F7F",
  //   "#F0C300",
  //   "#FFFF6B",
  //   "#DAB30A",
  //   "#ED7F10",
  //   "#FD6C9E",
  //   "#FF0000",
  //   "#7BA05B",
  //   "#01D758",
  // ];

  // const getLink = (breed: number, position: number, isPick: boolean) => {
  //   return `${isPick ? "P" : "B"} ${Breeds[breed]} ${position}`;
  // };

  // const StatsToData = () => {
  //   let network: PathPicksBansData = {
  //     nodes: [{ id: "Start", height: 2, size: 6, color: "rgb(244, 117, 96)" }],
  //     links: [],
  //   };
  //   for (const stat of stats) {
  //     const { draft, letter } = stat;
  //     const { picks, bans } = draft;

  //     let i = 1;
  //     for (const pick of picks[letter]) {
  //       network.nodes.push({
  //         id: getLink(pick.breed, i, true),
  //         height: 1,
  //         size: 12,
  //         color: breedsColors[pick.breed - 1],
  //       });

  //       network.links.push({
  //         source: "Start",
  //         target: getLink(pick.breed, i, true),
  //         distance: i * 20,
  //       });
  //       i = i + 1;
  //     }
  //     i = 1;
  //     for (const ban of bans[letter]) {
  //       network.nodes.push({
  //         id: getLink(ban, i, false),
  //         height: 0.5,
  //         size: 12,
  //         color: breedsColors[ban],
  //       });

  //       network.links.push({
  //         source: "Start",
  //         target: getLink(ban, i, false),
  //         distance: i * 20,
  //       });
  //       i = i + 1;
  //     }
  //   }

  //   let Nodes: any[] = [];
  //   for (const nodes of network.nodes) {
  //     let idx = Nodes.findIndex((node) => node.id === nodes.id);
  //     if (idx === -1) {
  //       Nodes.push(nodes);
  //     } else {
  //       Nodes[idx] = {
  //         ...Nodes[idx],
  //         size: Nodes[idx].size < 100 ? Nodes[idx].size * 1.2 : 100,
  //       };
  //     }
  //   }
  //   network.nodes = Nodes;

  //   network.links = network.links.filter((value, index) => {
  //     const _value = JSON.stringify(value);
  //     return (
  //       index ===
  //       network.links.findIndex((obj) => {
  //         return JSON.stringify(obj) === _value;
  //       })
  //     );
  //   });
  //   setData(network);
  // };

  // useEffect(() => {
  //   StatsToData();
  // }, []);
  return (
    <Flex w="auto" h="50vh" justifyContent="center" alignItems="center">
      {/* <ResponsiveNetwork
        data={data}
        theme={{
          tooltip: { container: { color: "black" } },
        }}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        linkDistance={function (e) {
          return e.distance;
        }}
        centeringStrength={0.5}
        repulsivity={100}
        nodeSize={function (n) {
          return n.size;
        }}
        activeNodeSize={function (n) {
          return 1.5 * n.size;
        }}
        nodeColor={function (e) {
          return e.color;
        }}
        nodeBorderWidth={1}
        nodeBorderColor={{
          from: "color",
          modifiers: [["darker", 0.8]],
        }}
        linkThickness={function (n) {
          return 2 + 2 * n.target.data.height;
        }}
        motionConfig="gentle"
      /> */}
    </Flex>
  );
};
