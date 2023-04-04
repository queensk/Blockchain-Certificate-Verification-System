import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";
import api from "../../../api/api";
import { useEffect, useState } from "react";

const PieChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [statsData, SetStatData] = useState([]);
  const data = [
    {
      id: "certificate_increase",
      label: "Certificate Increase",
      value: statsData.certificate_increase,
      color: "hsl(57, 70%, 50%)",
    },
    {
      id: "schools",
      label: "Schools",
      value: statsData.schools,
      color: "hsl(310, 70%, 50%)",
    },
    {
      id: "schools_increase",
      label: "Schools Increase",
      value: statsData.schools_increase,
      color: "hsl(173, 70%, 50%)",
    },
    {
      id: "users",
      label: "Users",
      value: statsData.users,
      color: "hsl(233, 70%, 50%)",
    },
    {
      id: "users_increase",
      label: "Users Increase",
      value: statsData.users_increase,
      color: "hsl(17, 70%, 50%)",
    },
    {
      id: "verified_certificate",
      label: "Verified Certificate",
      value: statsData.verified_certificate,
      color: "hsl(120, 70%, 50%)",
    },
  ];

  useEffect(() => {
    api
      .get("/stats")
      .then((response) => {
        SetStatData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <ResponsivePie
      data={data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
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
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;
