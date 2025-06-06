import { Box, VStack, StackSeparator, HStack } from "@chakra-ui/react";
import { StyledText } from "@/src/components";

const TransactionHistory = ({
  data,
}: {
  data: { name: string; type: string; date: string; value: number }[];
}) => {
  return (
    <Box bg="white" borderRadius="10px" p={4} py={6}>
      <VStack align="stretch" spaceY={1} separator={<StackSeparator color="border" />} mt={2}>
        {data.map((item, idx) => (
          <Box key={idx} py={2}>
            <StyledText color="bfgrey" fontSize={{ base: "xs", md: "sm", lg: "sm" }}>
              {item.type}
            </StyledText>

            <HStack justify="space-between" align="center" mb={1}>
              <StyledText color="secondary" fontSize={{ base: "xs", md: "sm", lg: "md" }}>
                {item.name}
              </StyledText>
              <VStack align="flex-end" spaceY={2}>
                <StyledText
                  color="secondary"
                  fontSize={{ base: "sm", md: "md", lg: "lg" }}
                  fontWeight="semibold"
                >
                  ₦{item.value.toLocaleString()}
                </StyledText>
                <StyledText color="bfgrey" fontSize={{ base: "xs", md: "sm", lg: "sm" }}>
                  {item.date}
                </StyledText>
              </VStack>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default TransactionHistory;
