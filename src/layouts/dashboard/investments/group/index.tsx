import { StyledButton, StyledText } from "@/src/components";
import { Box, Flex, HStack, VStack } from "@chakra-ui/react";
import { EmptyCard, InvestmentCard, SavingsCard } from "../../cards";
import { useRouter } from "next/navigation";
import { MdChevronRight } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { GroupIcon } from "@/public/svgs";

const GroupInvestments = () => {
  const router = useRouter();
  const isEmpty = false;

  return (
    <Box>
      <VStack align="stretch" spaceY={5} mt={6}>
        <SavingsCard
          title="Total Group Investments"
          amount="0.00"
          amountColor="#285100"
          interest="0%"
          bg="#F6EDD9"
          color="primary"
          bgImage="url('/images/card-image2.webp')"
          buttonBg="#F8FBEB"
          boxShadow="sm"
          buttonText="Performance"
          buttonAction={() => {
            router.push("/investments/performance");
          }}
        />

        <HStack alignSelf={{ lg: "start" }}>
          <StyledButton
            type="button"
            flex={1}
            onClick={() => router.push("/investments/create-group")}
          >
            <FaPlus size="18px" /> Create Group
          </StyledButton>

          <StyledButton
            type="button"
            bg="#EDF5CE"
            color="primary"
            flex={1}
            onClick={() => router.push("/investments/join-group")}
          >
            <GroupIcon /> Join Group
          </StyledButton>
        </HStack>
      </VStack>
      <HStack justify="space-between" mt={12}>
        <StyledText
          fontSize={{ base: "md", md: "lg", lg: "xl" }}
          fontWeight="medium"
          color="secondary"
        >
          My Investments Group
        </StyledText>

        {!isEmpty && (
          <Flex
            align="center"
            color="primary"
            cursor="pointer"
            onClick={() => router.push("/investments/active-groups")}
          >
            <StyledText fontSize={{ base: "sm", md: "md" }} fontWeight="medium" color="inherit">
              Find more
            </StyledText>
            <MdChevronRight size={30} fontWeight={400} cursor="pointer" color="secondary" />
          </Flex>
        )}
      </HStack>

      <VStack align="stretch" spaceY={4} mt={6}>
        {isEmpty ? (
          <EmptyCard title="You Don’t Have Any Active Group Investments Yet!" />
        ) : (
          <HStack
            spaceX={{ base: 2, md: 4 }}
            mt={6}
            overflowX="auto"
            css={{
              // "@media (min-width: 62em)": {
              //   // 62em = 992px = lg breakpoint
              //   "&::-webkit-scrollbar": {
              //     display: "initial",
              //   },
              //   scrollbarWidth: "auto",
              //   msOverflowStyle: "auto",
              // },
              "@media (max-width: 61.99em)": {
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                scrollbarWidth: "none", // Firefox
                msOverflowStyle: "none", // IE 10+
              },
            }}
          >
            <InvestmentCard
              name="Enviable Transport Group"
              annualReturn={20}
              image="/images/investments/1.png"
            />
            <InvestmentCard
              name="Enviable Transport Group"
              annualReturn={20}
              image="/images/investments/2.png"
            />
            <InvestmentCard
              name="Enviable Transport Group"
              annualReturn={20}
              image="/images/investments/3.png"
            />
          </HStack>
        )}
      </VStack>
    </Box>
  );
};

export default GroupInvestments;
