import { ActivitiesData, Stats } from "./Data";
// import { ResponsiveCalendar } from "@nivo/calendar";
import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { useTheme } from "../../../hooks/useTheme";
export const Activities = ({ stats }: { stats: Stats }) => {
  // const [bgTheme, colorTheme, theme] = useTheme();

  // const [data, setData] = useState<ActivitiesData>([]);
  // const [from, setFrom] = useState("1970-10-10");
  // const [to, setTo] = useState("1970-11-11");

  // const orderDate = (date: string): string => {
  //   let yyyy = date.split("-")[0];
  //   let mm = date.split("-")[1];
  //   let dd = date.split("-")[2];

  //   return `${yyyy}-${dd}-${mm}`;
  // };
  // const StatsToData = () => {
  //   let activities: ActivitiesData = [];
  //   let dates: Array<{ date: number; day: string; value: number }> = [];
  //   for (const stat of stats) {
  //     const { date } = stat;
  //     if (date) {
  //       let d = new Date(date * 1000);
  //       let day = d.toISOString().split("T")[0];
  //       let idx = dates.findIndex((d) => d.day === day);
  //       if (idx === -1) {
  //         dates.push({ date, day, value: 1 });
  //       } else {
  //         dates[idx] = { ...dates[idx], value: dates[idx].value + 1 };
  //       }
  //     }
  //   }
  //   let max = Math.max(...dates.map((d) => d.date));
  //   let min = Math.min(...dates.map((d) => d.date));
  //   for (const date of dates) {
  //     activities.push({ day: orderDate(date.day), value: date.value });
  //   }
  //   setFrom(orderDate(new Date(min * 1000).toISOString().split("T")[0]));
  //   setTo(orderDate(new Date(max * 1000).toISOString().split("T")[0]));
  //   setData(activities);
  // };

  // useEffect(() => {
  //   StatsToData();
  // }, []);

  return (
    <Flex w="auto" h="50vh">
      {/* <ResponsiveCalendar
        theme={{
          textColor: theme.ClassicValue,
          tooltip: { container: { color: "black" } },
        }}
        data={data}
        from={from}
        to={to}
        emptyColor="#eeeeee"
        colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
          {
            anchor: "bottom-right",
            direction: "row",
            translateY: 36,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: "right-to-left",
          },
        ]}
      /> */}
    </Flex>
  );
};
