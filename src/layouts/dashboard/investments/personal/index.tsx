import { StyledText } from "@/src/components";
import { Box, VStack } from "@chakra-ui/react";
import { ActiveSavingsCard, EmptyCard, SavingsCard } from "../../cards";
import { useRouter } from "next/navigation";

const PersonalInvestments = () => {
  const router = useRouter();
  const isEmpty = false;

  return (
    <Box>
      <VStack align="stretch" spaceY={5} mt={6}>
        <SavingsCard
          title="Total Personal Investments"
          amount="0.00"
          amountColor="secondary"
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
    </Box>
  );
};

export default PersonalInvestments;
