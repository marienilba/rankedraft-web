import { Flex } from "@chakra-ui/react";
// import { ResponsivePie } from "@nivo/pie";
import { useEffect, useState } from "react";
// import { useTheme } from "../../hooks/useTheme";
// import { Breeds } from "../../utils/BreedIndex";
import { BreedGlobaleWinrateData, Stats } from "./Data";
import { makeArrayOfRange, YisWhatPercentOfX } from "../Functions";

export const BreedGlobaleWinrate = ({ stats }: { stats: Stats }) => {
  // const [bgTheme, colorTheme, theme] = useTheme();

  // const [data, setData] = useState<Array<BreedGlobaleWinrateData>>([]);
  // const [fill, setFill] = useState<any[]>([]);
  // const [total, setTotal] = useState<number>();
  // const capitalizeFirstLetter = (txt) => {
  //   if (typeof txt === "string")
  //     return txt.charAt(0).toUpperCase() + txt.slice(1);
  // };
  // const StatsToData = () => {
  //   const breedArr = makeArrayOfRange<BreedGlobaleWinrateData>([1, 18]);
  //   let total = 0;
  //   for (let i = 1; i < breedArr.length + 1; i++) {
  //     breedArr[i - 1] = {
  //       id: capitalizeFirstLetter(Breeds[i]),
  //       label: Breeds[i],
  //       value: 0,
  //       color: "",
  //     };
  //   }

  //   for (const stat of stats) {
  //     const { letter, result, draft } = stat;
  //     total++;
  //     if (result === "L" || result === "") {
  //       const { picks } = draft;
  //       for (const pick of picks[letter]) {
  //         breedArr[pick.breed - 1] = {
  //           ...breedArr[pick.breed - 1],
  //           value: breedArr[pick.breed - 1].value + 1,
  //         };
  //       }
  //     }
  //   }

  //   breedArr.sort((a, b) => b.value - a.value);
  //   const fillArr = makeArrayOfRange([1, 19]);
  //   for (let i = 1; i < fillArr.length + 1; i++) {
  //     const index = breedArr.findIndex((v) => v.id === Breeds[i]);
  //     let pattern = index > 8 ? "dots" : index > 5 ? "dots" : "lines";
  //     fillArr[i - 1] = {
  //       match: {
  //         id: capitalizeFirstLetter(breedArr[i]),
  //       },
  //       id: pattern,
  //     };
  //   }
  //   setFill(fillArr);
  //   setData(breedArr);
  //   setTotal(total);
  // };

  // useEffect(() => {
  //   StatsToData();
  // }, []);
  return (
    <Flex w="auto" h="30vw">
      {/* <ResponsivePie
        data={data}
        theme={{
          labels: {
            text: { fontSize: 16, fontWeight: 800, color: theme.ClassicValue },
          },
          textColor: theme.ClassicValue,
          tooltip: { container: { color: "black" } },
        }}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={24}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        enableArcLabels={true}
        arcLabel={(d) => `${Math.round(YisWhatPercentOfX(d.value, total))}%`}
        arcLabelsSkipAngle={10}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={fill}
      /> */}
    </Flex>
  );
};
