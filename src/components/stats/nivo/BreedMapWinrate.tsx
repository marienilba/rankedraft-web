import { BreedMapWinrateData, Stats } from "./Data";
// import { ResponsiveHeatMap } from "@nivo/heatmap";
import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { makeArrayOfRange, YisWhatPercentOfX } from "../Functions";
// import { Breeds } from "../../utils/BreedIndex";
// import { useTheme } from "../../hooks/useTheme";
export const BreedMapWinrate = ({ stats }: { stats: Stats }) => {
  // const [bgTheme, colorTheme, theme] = useTheme();

  // const [data, setData] = useState<BreedMapWinrateData>();

  // const StatsToData = () => {
  //   const breedMapArr = makeArrayOfRange<{
  //     id: string;
  //     data: { x: string; y: number; t: number }[];
  //   }>([0, 18]);

  //   for (let i = 1; i < breedMapArr.length + 1; i++) {
  //     breedMapArr[i - 1] = {
  //       id: Breeds[i],
  //       data: [],
  //     };
  //   }

  //   for (const stat of stats) {
  //     const { draft, letter, result, map_id } = stat;
  //     const isWin = result === "W" ? true : false;
  //     const { picks: _picks } = draft;
  //     const picks = _picks[letter];

  //     for (const pick of picks) {
  //       const { breed } = pick;
  //       const data = breedMapArr[breed - 1].data;
  //       const idx = data.findIndex((o) => o.x === "" + map_id);
  //       if (idx === -1) {
  //         breedMapArr[breed - 1].data = [
  //           ...breedMapArr[breed - 1].data,
  //           { x: "" + map_id, y: isWin ? 1 : 0, t: 1 },
  //         ];
  //       } else {
  //         isWin &&
  //           (breedMapArr[breed - 1].data[idx].y =
  //             breedMapArr[breed - 1].data[idx].y + 1);

  //         breedMapArr[breed - 1].data[idx].t =
  //           breedMapArr[breed - 1].data[idx].t + 1;
  //       }
  //     }
  //   }
  //   let final_datas: any = [];
  //   for (const breedMap of breedMapArr) {
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
        axisRight={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "country",
          legendPosition: "middle",
          legendOffset: 70,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "country",
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
