import { StyledText } from "@/src/components";
import { Box, Flex, HStack, VStack } from "@chakra-ui/react";
import { EmptyCard, InvestmentCard, SavingsCard } from "../../cards";
import { useRouter } from "next/navigation";
import { MdChevronRight } from "react-icons/md";

const PersonalInvestments = () => {
  const router = useRouter();
  const isEmpty = false;

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
      <HStack justify="space-between" mt={12}>
        <StyledText
          fontSize={{ base: "md", md: "lg", lg: "xl" }}
          fontWeight="medium"
          color="secondary"
        >
          Active Personal Investments
        </StyledText>

        {!isEmpty && (
          <Flex align="center" color="primary" cursor="pointer">
            <StyledText fontSize={{ base: "sm", md: "md" }} fontWeight="medium" color="inherit">
              Find more
            </StyledText>
            <MdChevronRight size={30} fontWeight={400} cursor="pointer" color="secondary" />
          </Flex>
        )}
      </HStack>

      <VStack align="stretch" spaceY={4} mt={6}>
        {isEmpty ? (
          <EmptyCard title="You Don’t Have Any Active Personal Investments Yet!" />
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
              name="Enviable Transport"
              annualReturn={20}
              image="/images/investments/1.png"
            />
            <InvestmentCard
              name="Enviable Transport"
              annualReturn={20}
              image="/images/investments/2.png"
            />
            <InvestmentCard
              name="Enviable Transport"
              annualReturn={20}
              image="/images/investments/3.png"
            />
          </HStack>
        )}
      </VStack>
    </Box>
  );
};

export default PersonalInvestments;
