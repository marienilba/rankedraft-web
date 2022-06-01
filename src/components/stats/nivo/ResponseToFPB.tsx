import { Button, Flex, Stack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
// import { ResponsiveSunburst } from "@nivo/sunburst";
import { ResponseToFPBData, Stats } from "./Data";
import { Breeds } from "../../../utils/BreedIndex";
import { useTheme } from "../../../hooks/useTheme";

export const ResponseToFPB = ({ stats }: { stats: Stats }) => {
  // const [bgTheme, colorTheme, theme] = useTheme();

  // const [data, setData] = useState<ResponseToFPBData>();
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

  // const [isForBan, setIsForBan] = useState(false);
  // const [choiceLetter, setChoiceLetter] = useState("A");
  // const [handler, setHandler] = useState(false);
  // const StatsToData = () => {
  //   let response_data = { name: "start", color: "", children: null };
  //   let childrens: {
  //     name: string;
  //     color: string;
  //     children: { name: string; color: string; loc: number }[];
  //   }[] = [];

  //   for (const stat of stats) {
  //     const { letter, draft } = stat;
  //     const { picks, bans } = draft;
  //     let FP = 1;
  //     let RP = 1;
  //     if (letter === "A" && choiceLetter === "A") {
  //       if (!isForBan) {
  //         FP = picks.A[0].breed;
  //         RP = picks.B[0].breed;
  //       } else {
  //         FP = bans.A[0];
  //         RP = bans.B[0];
  //       }

  //       let idx = childrens.findIndex((fp) => fp.name === Breeds[FP]);
  //       if (idx === -1) {
  //         childrens.unshift({
  //           name: Breeds[FP],
  //           color: breedsColors[FP - 1],
  //           children: [],
  //         });
  //         idx = 0;
  //       }
  //       const index = childrens[idx].children.findIndex(
  //         (rp) => rp.name === Breeds[RP]
  //       );

  //       if (index === -1) {
  //         childrens[idx].children.push({
  //           name: Breeds[RP],
  //           color: breedsColors[RP - 1],
  //           loc: 1,
  //         });
  //       } else {
  //         childrens[idx].children[index].loc =
  //           childrens[idx].children[index].loc + 1;
  //       }
  //     } else if (letter === "B" && choiceLetter === "B") {
  //       if (!isForBan) {
  //         FP = picks.A[0].breed;
  //         RP = picks.B[0].breed;
  //       } else {
  //         FP = bans.A[0];
  //         RP = bans.B[0];
  //       }

  //       let idx = childrens.findIndex((fp) => fp.name === Breeds[RP]);
  //       if (idx === -1) {
  //         childrens.unshift({
  //           name: Breeds[RP],
  //           color: breedsColors[RP - 1],
  //           children: [],
  //         });
  //         idx = 0;
  //       }
  //       const index = childrens[idx].children.findIndex(
  //         (rp) => rp.name === Breeds[FP]
  //       );

  //       if (index === -1) {
  //         childrens[idx].children.push({
  //           name: Breeds[FP],
  //           color: breedsColors[FP - 1],
  //           loc: 1,
  //         });
  //       } else {
  //         childrens[idx].children[index].loc =
  //           childrens[idx].children[index].loc + 1;
  //       }
  //     }
  //   }

  //   response_data.children = childrens;
  //   setData(response_data);
  // };

  // useEffect(() => {
  //   StatsToData();
  // }, []);

  // useEffect(() => {
  //   setHandler(true);
  //   StatsToData();
  // }, [isForBan, choiceLetter]);

  // useEffect(() => {
  //   if (handler) setHandler(false);
  // }, [handler]);

  return (
    <Flex>
      {/* <Flex>
        <Stack>
          <Button
            colorScheme={isForBan ? "pink" : "green"}
            variant="outline"
            onClick={() => setIsForBan(!isForBan)}
          >
            {isForBan ? "Ban" : "Pick"}
          </Button>
          <Button
            colorScheme={choiceLetter === "A" ? "pink" : "green"}
            variant="outline"
            onClick={() => setChoiceLetter(choiceLetter === "A" ? "B" : "A")}
          >
            {choiceLetter === "A" ? "A" : "B"}
          </Button>
        </Stack>
      </Flex>
      <Flex w="30vw" h="50vh">
        {!handler && (
          <ResponsiveSunburst
            theme={{
              labels: {
                text: {
                  fontSize: 14,
                  fontWeight: 800,
                  textShadow:
                    "2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff",
                },
              },
              textColor: "black",
              tooltip: { container: { color: "black" } },
            }}
            data={data}
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            id="name"
            value="loc"
            cornerRadius={2}
            borderColor={{ theme: "background" }}
            colorBy="id"
            inheritColorFromParent={false}
            // colors={{ scheme: "nivo" }}
            enableArcLabels={true}
            arcLabel={(d) => `${d.id}`}
            arcLabelsSkipAngle={10}
          />
        )}
      </Flex> */}
    </Flex>
  );
};
