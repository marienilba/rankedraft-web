import { FPWinrateData, Stats } from "./Data";
// import { ResponsiveHeatMap } from "@nivo/heatmap";
import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { YisWhatPercentOfX } from "../Functions";
// import { Breeds } from "../../utils/BreedIndex";
// import { useTheme } from "../../hooks/useTheme";
export const FPWinrate = ({ stats }: { stats: Stats }) => {
  // const [bgTheme, colorTheme, theme] = useTheme();
  // const [data, setData] = useState<FPWinrateData>();

  // const StatsToData = () => {
  //   const fpArr: { id: string; data: { x: string; y: number; t: number }[] }[] =
  //     [];

  //   for (const stat of stats) {
  //     const { draft, letter, result } = stat;
  //     const otherletter = letter === "A" ? "B" : "A";
  //     const isWin = result === "W" ? true : false;
  //     const { picks, bans } = draft;
  //     const fp_1 =
  //       letter === "A" ? picks[letter][0].breed : picks[otherletter][0].breed;
  //     const fp_2 =
  //       letter === "A" ? picks[otherletter][0].breed : picks[letter][0].breed;

  //     let idx = fpArr.findIndex((f) => f.id === Breeds[fp_1]);
  //     if (idx === -1) {
  //       fpArr.unshift({
  //         id: Breeds[fp_1],
  //         data: [],
  //       });
  //       idx = 0;
  //     }

  //     let index = fpArr[idx].data.findIndex((f2) => f2.x === Breeds[fp_2]);
  //     if (index === -1) {
  //       fpArr[idx].data.unshift({
  //         x: Breeds[fp_2],
  //         y: isWin ? 1 : 0,
  //         t: 1,
  //       });
  //       index = 0;
  //     } else {
  //       fpArr[idx].data[index].t = fpArr[idx].data[index].t + 1;
  //       isWin && (fpArr[idx].data[index].y = fpArr[idx].data[index].y + 1);
  //     }

  //     let idx_2 = fpArr.findIndex((f) => f.id === Breeds[fp_2]);
  //     if (idx_2 === -1) {
  //       fpArr.unshift({
  //         id: Breeds[fp_2],
  //         data: [],
  //       });
  //       idx_2 = 0;
  //     }

  //     let index_2 = fpArr[idx_2].data.findIndex((f2) => f2.x === Breeds[fp_1]);
  //     if (index_2 === -1) {
  //       fpArr[idx_2].data.unshift({
  //         x: Breeds[fp_1],
  //         y: !isWin ? 1 : 0,
  //         t: 1,
  //       });
  //       index_2 = 0;
  //     } else {
  //       fpArr[idx_2].data[index_2].t = fpArr[idx_2].data[index_2].t + 1;
  //       !isWin &&
  //         (fpArr[idx_2].data[index_2].y = fpArr[idx_2].data[index_2].y + 1);
  //     }
  //   }
  //   let final_datas: any = [];
  //   for (const fp of fpArr) {
  //     const { data, id } = fp;
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
        forceSquare
        hoverTarget="row"
        valueFormat=">-.2s"
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Classe 2",
          legendOffset: -30,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Classe 1",
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
