import { DateWinrateData, Stats } from "./Data";
// import { ResponsiveLine } from "@nivo/line";
import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { YisWhatPercentOfX } from "../Functions";
import { useTheme } from "../../hooks/useTheme";

export const DateWinrate = ({ stats }: { stats: Stats }) => {
  // const [bgTheme, colorTheme, theme] = useTheme();

  // const [data, setData] = useState<DateWinrateData>([
  //   {
  //     id: "japan",
  //     color: "hsl(327, 70%, 50%)",
  //     data: [
  //       {
  //         x: "plane",
  //         y: 283,
  //       },
  //       {
  //         x: "helicopter",
  //         y: 178,
  //       },
  //     ],
  //   },
  // ]);
  // const StatsToData = () => {
  //   let lines: DateWinrateData = [];
  //   let teams: { id: string; datas: any[] }[] = [];
  //   for (const stat of stats) {
  //     let { team_id } = stat;
  //     if (team_id === undefined || team_id === null) team_id = "All";
  //     const idx = teams.findIndex((t) => t.id === team_id);
  //     if (idx === -1) {
  //       teams.push({ id: team_id, datas: [stat] });
  //     } else {
  //       teams[idx] = { ...teams[idx], datas: [...teams[idx].datas, stat] };
  //     }
  //   }
  //   for (const team of teams) {
  //     const { id, datas } = team;
  //     let date_winrate: any = [];
  //     let dates: Array<{ day: string; datas: any[] }> = [];
  //     for (const stat of datas) {
  //       const { date } = stat;
  //       if (date) {
  //         let d = new Date(date * 1000);
  //         let day = d.toISOString().split("T")[0];
  //         let idx = dates.findIndex((d) => d.day === day);
  //         if (idx === -1) {
  //           dates.push({ day, datas: [stat] });
  //         } else {
  //           dates[idx] = { ...dates[idx], datas: [...dates[idx].datas, stat] };
  //         }
  //       }
  //     }
  //     for (const date of dates) {
  //       const { day, datas } = date;
  //       let wins = 0;
  //       let total = 0;
  //       for (const history of datas) {
  //         const { result } = history;
  //         if (result === "W") {
  //           wins++;
  //           total++;
  //         }
  //         if (result === "L") total++;
  //       }
  //       date_winrate.push({
  //         x: day,
  //         y: YisWhatPercentOfX(wins, total),
  //       });
  //     }
  //     const id_name = teams
  //       .find((t) => t.id === id)
  //       .datas.find((t) => t.team_id === id); // need to query name even if not teams, or i do double query idk
  //     lines.push({ id, color: "", data: date_winrate });
  //   }
  //   setData(lines);
  // };

  // useEffect(() => {
  //   StatsToData();
  // }, []);
  return (
    <Flex w="auto" h="30vh">
      {/* <ResponsiveLine
        data={data}
        theme={{
          textColor: theme.ClassicValue,
          tooltip: { container: { color: "black" } },
        }}
        enablePointLabel
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: 0,
          max: 100,
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickRotation: 0,
          legend: "Date",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Winrate",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        enableGridY={false}
        gridYValues={[0, 100]}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        curve="stepAfter"
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      /> */}
    </Flex>
  );
};
