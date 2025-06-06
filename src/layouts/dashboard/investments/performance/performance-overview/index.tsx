import { StyledText } from "@/src/components";
import { Box } from "@chakra-ui/react";
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Tooltip, Area } from "recharts";

const PerformanceOverview = ({ data }: { data: any }) => {
  return (
    <Box height="300px">
      <StyledText mb={4} color="#285100" fontSize={{ base: "xs", md: "sm", lg: "md" }}>
        Performance Trend
      </StyledText>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <radialGradient
              id="areaGradient"
              cx="50.16%"
              cy="-173.64%"
              r="273.64%"
              fx="50.16%"
              fy="-173.64%"
            >
              <stop offset="70%" stopColor="#E9F5D7" />
              <stop offset="94.9%" stopColor="#FFFFFF" />
            </radialGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#9BAB69"
            strokeWidth={2}
            fill="url(#areaGradient)"
            dot={{ r: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default PerformanceOverview;
