import { Box, Flex } from "@chakra-ui/react";
// import { ResponsiveNetwork } from "@nivo/network";
import { Breeds } from "../../utils/BreedIndex";
import { PathPicksBansData, Stats } from "./Data";
import { useState, useRef, useEffect } from "react";

export const PathPicksBans = ({ stats }: { stats: Stats }) => {
  // const [data, setData] = useState<PathPicksBansData>();
  // const [scale, setScale] = useState(1);
  // const ref: any = useRef();
  // const getLink = (breed: number, isPick: boolean) => {
  //   return `${isPick ? "P" : "B"} ${Breeds[breed]}`;
  // };

  // const StatsToData = () => {
  //   let network: PathPicksBansData = {
  //     nodes: [{ id: "_", height: 2, size: 6, color: "rgb(244, 117, 96)" }],
  //     links: [],
  //   };
  //   for (const stat of stats) {
  //     const { draft, letter } = stat;
  //     const { picks, bans } = draft;

  //     let rules = [0, 1, 0, 0, 1, 0, 1];
  //     let Rules = [1, 1, 2, 3, 2, 4, 3];
  //     let previous = "_";
  //     for (let i = 0; i < rules.length; i++) {
  //       let source = "";
  //       const r = rules[i];
  //       if (r === 0) {
  //         source = getLink(bans[letter][Rules[i] - 1], r === 0 ? true : false);
  //         network.nodes.push({
  //           id: previous + " " + source,
  //           height: 0.5,
  //           size: 12,
  //           color: "hsl(322,81%,43%)",
  //         });

  //         network.links.push({
  //           source: previous,
  //           target: previous + " " + source,
  //           distance: 1,
  //         });
  //       } else {
  //         source = getLink(
  //           picks[letter][Rules[i] - 1].breed,
  //           r === 0 ? true : false
  //         );
  //         network.nodes.push({
  //           id: previous + " " + source,
  //           height: 0.5,
  //           size: 12,
  //           color: "hsl(120,61%,50%)",
  //         });

  //         network.links.push({
  //           source: previous,
  //           target: previous + " " + source,
  //           distance: 1,
  //         });
  //       }

  //       previous = previous + " " + source;
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
  //         size: Nodes[idx].size < 100 ? Nodes[idx].size * 1.1 : 100,
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

  // const onZoom = (value: number) => {
  //   if (ref.current) {
  //     ref.current.style.zoom = "150%";
  //   }
  // };
  return (
    <Box
      w="100%"
      h="60vh"
      css={{
        overflow: "hidden",
      }}
    >
      {/* <Flex
        w="auto"
        h="60vh"
        justifyContent="center"
        alignItems="center"
        ref={ref}
        css={{ transform: "scale(1.0)", transformOrigin: "0% 0% 0px" }}
      >
        <ResponsiveNetwork
          theme={{
            tooltip: { container: { color: "black" } },
          }}
          data={data}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          linkDistance={function (e) {
            return e.distance;
          }}
          centeringStrength={0.1}
          onClick={(e) => console.log(e)}
          repulsivity={1}
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
        />
      </Flex> */}
    </Box>
  );
};
