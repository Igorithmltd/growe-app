import { Box, Flex, Icon, Circle, VStack, StackSeparator } from "@chakra-ui/react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { StyledText } from "@/src/components";
import { FaChartPie } from "react-icons/fa";

const PortfolioAllocation = ({
  data,
}: {
  data: { name: string; value: number; color: string }[];
}) => {
  const COLORS = data.map((entry) => entry.color);

  return (
    <Box bg="white" borderRadius="10px" p={4} py={6}>
      <Flex justify="space-between" align="center" mb={4}>
        <StyledText color="#285100" fontSize={{ base: "xs", md: "sm", lg: "md" }}>
          Current Allocation
        </StyledText>
        <Icon as={FaChartPie} color="primary" boxSize={10} />
      </Flex>

      <Box h="200px">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Box>

      <StyledText mt={6} mb={2} color="#285100" fontSize={{ base: "xs", md: "sm", lg: "sm" }}>
        Investment Details
      </StyledText>

      <VStack align="stretch" spaceY={3} separator={<StackSeparator color="border" />} mt={2}>
        {data.map((item, idx) => (
          <Flex key={idx} justify="space-between" align="center" mb={3}>
            <Flex align="center">
              <Circle size="10px" bg={item.color} mr={2} />

              <StyledText color="bfgrey" fontSize={{ base: "xs", md: "sm", lg: "sm" }}>
                {item.name}
              </StyledText>
            </Flex>

            <StyledText color="#285100" fontSize={{ base: "xs", md: "sm", lg: "sm" }}>
              {item.value}%
            </StyledText>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};

export default PortfolioAllocation;
