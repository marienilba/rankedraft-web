import { BreedsWinrateData, Stats } from "./Data";
// import { ResponsiveHeatMap } from "@nivo/heatmap";
import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { makeArrayOfRange, YisWhatPercentOfX } from "../Functions";
// import { Breeds } from "../../utils/BreedIndex";
// import { useTheme } from "../../hooks/useTheme";
export const BreedsWinrate = ({ stats }: { stats: Stats }) => {
  // const [bgTheme, colorTheme, theme] = useTheme();

  // const [data, setData] = useState<BreedsWinrateData>();

  // const StatsToData = () => {
  //   const breedArr = makeArrayOfRange<{
  //     id: string;
  //     data: { x: string; y: number; t: number }[];
  //   }>([0, 18]);

  //   for (let i = 1; i < breedArr.length + 1; i++) {
  //     breedArr[i - 1] = {
  //       id: Breeds[i],
  //       data: [],
  //     };
  //   }

  //   for (const stat of stats) {
  //     const { draft, letter, result } = stat;
  //     const otherletter = letter === "A" ? "B" : "A";
  //     const isWin = result === "W" ? true : false;
  //     const { picks } = draft;

  //     for (const pick of picks[letter]) {
  //       const { breed } = pick;
  //       const data = breedArr[breed - 1].data;

  //       if (isWin) {
  //         for (const b of picks[otherletter]) {
  //           const idx = data.findIndex((d) => d.x === Breeds[b.breed]);
  //           if (idx === -1) {
  //             data.push({
  //               x: Breeds[b.breed],
  //               y: 1,
  //               t: 1,
  //             });
  //           } else {
  //             data[idx].t = data[idx].t + 1;
  //             data[idx].y = data[idx].y + 1;
  //           }
  //         }
  //       } else {
  //         for (const b of picks[otherletter]) {
  //           const idx = data.findIndex((d) => d.x === Breeds[b.breed]);
  //           if (idx === -1) {
  //             data.push({
  //               x: Breeds[b.breed],
  //               y: 0,
  //               t: 1,
  //             });
  //           } else {
  //             data[idx].t = data[idx].t + 1;
  //           }
  //         }
  //       }
  //     }

  //     for (const pick of picks[otherletter]) {
  //       const { breed } = pick;
  //       const data = breedArr[breed - 1].data;

  //       if (!isWin) {
  //         for (const b of picks[letter]) {
  //           const idx = data.findIndex((d) => d.x === Breeds[b.breed]);
  //           if (idx === -1) {
  //             data.push({
  //               x: Breeds[b.breed],
  //               y: 1,
  //               t: 1,
  //             });
  //           } else {
  //             data[idx].t = data[idx].t + 1;
  //             data[idx].y = data[idx].y + 1;
  //           }
  //         }
  //       } else {
  //         for (const b of picks[letter]) {
  //           const idx = data.findIndex((d) => d.x === Breeds[b.breed]);
  //           if (idx === -1) {
  //             data.push({
  //               x: Breeds[b.breed],
  //               y: 0,
  //               t: 1,
  //             });
  //           } else {
  //             data[idx].t = data[idx].t + 1;
  //           }
  //         }
  //       }
  //     }
  //   }
  //   let final_datas: any = [];
  //   for (const breedMap of breedArr) {
  //     const { data, id } = breedMap;
  //     let dts = [];
  //     for (const dt of data) {
  //       dts.push({ x: dt.x, y: YisWhatPercentOfX(dt.y, dt.t) });
  //     }
  //     final_datas.push({ id, data: dts });
  //   }
  //   setData(final_datas);
  //   //
  // };

  // useEffect(() => {
  //   StatsToData();
  // }, []);

  return (
    <Flex w="auto" h="50vh">
      {/* <ResponsiveHeatMap
        data={data}
        theme={{
          labels: { text: { fontSize: 14, fontWeight: 800 } },
          textColor: theme.ClassicValue,
          tooltip: { container: { color: "black" } },
        }}
        margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
        valueFormat=">-.2s"
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendOffset: 46,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Classe",
          legendPosition: "middle",
          legendOffset: -72,
        }}
        colors={{
          type: "diverging",
          scheme: "cool",
          divergeAt: 0.5,
          minValue: -100,
          maxValue: 200,
        }}
        borderRadius={5}
        borderWidth={1}
        emptyColor="#555555"
      /> */}
    </Flex>
  );
};
