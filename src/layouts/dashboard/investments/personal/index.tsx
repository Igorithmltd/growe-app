import { StyledText } from "@/src/components";
import { Box, Flex, HStack, VStack } from "@chakra-ui/react";
import { ActiveSavingsCard, EmptyCard, InvestmentCard, SavingsCard } from "../../cards";
import { useRouter } from "next/navigation";
import { MdChevronRight } from "react-icons/md";

const PersonalInvestments = () => {
  const router = useRouter();
  const isEmpty = !false;

  return (
    <Box>
      <VStack align="stretch" spaceY={5} mt={6}>
        <SavingsCard
          title="Total Personal Investments"
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
            router.push("/savings/quick-saving");
          }}
        />
      </VStack>
      <Box mt={12}>
        <StyledText
          fontSize={{ base: "md", md: "lg", lg: "xl" }}
          fontWeight="medium"
          color="secondary"
        >
          Active Personal Investments
        </StyledText>

        <VStack align="stretch" spaceY={4} mt={6}>
          {isEmpty ? (
            <EmptyCard title="You Don’t Have Any Active Personal Investments Yet!" />
          ) : (
            <VStack align="stretch" spaceY={4}>
              <ActiveSavingsCard amount="800,000" name="Rent" plan="6 months" value={90} />
              <ActiveSavingsCard amount="800,000" name="Rent" plan="6 months" value={10} />
              <ActiveSavingsCard amount="800,000" name="Rent" plan="6 months" value={25} />
              <ActiveSavingsCard amount="800,000" name="Rent" plan="6 months" value={50} />
              <ActiveSavingsCard amount="800,000" name="Rent" plan="6 months" value={75} />
            </VStack>
          )}
        </VStack>
      </Box>

      <Box mt={6}>
        <HStack justify="space-between">
          <StyledText
            fontSize={{ base: "md", md: "lg", lg: "xl" }}
            fontWeight="medium"
            color="secondary"
          >
            Promoted Groups
          </StyledText>

          <Flex align="center" color="primary" cursor="pointer">
            <StyledText fontSize={{ base: "sm", md: "md" }} fontWeight="medium" color="inherit">
              Find more
            </StyledText>
            <MdChevronRight size={30} fontWeight={400} cursor="pointer" color="secondary" />
          </Flex>
        </HStack>

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
            name="Enviable Transport"
            annualReturn={20}
            image="/images/investments/3.png"
          />
          <InvestmentCard
            name="Enviable Transport"
            annualReturn={20}
            image="/images/investments/3.png"
          />
          <InvestmentCard
            name="Enviable Transport"
            annualReturn={20}
            image="/images/investments/3.png"
          />
        </HStack>
      </Box>
    </Box>
  );
};

export default PersonalInvestments;
