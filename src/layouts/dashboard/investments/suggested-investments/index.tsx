"use client";

import { Box, VStack } from "@chakra-ui/react";
//
import { StyledText } from "@/src/components";
// import { ROUTES } from "@/src/utils/constants";
import { useRouter } from "next/navigation";
import { BackIcon } from "@/public/svgs";
import { InvestmentInfoCard } from "../../cards";

const JoinGroupLayout = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <Box px={{ base: 3, md: 6 }} py={{ base: 5, lg: 10 }} w={{ lg: "65%" }} mx="auto">
      <Box display="flex" gap={4} alignItems="center" mt={{ base: 6, lg: "unset" }}>
        <Box cursor="pointer" onClick={handleBack}>
          <BackIcon />
        </Box>

        <StyledText fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" color="secondary">
          Suggested Investments
        </StyledText>
      </Box>

      <VStack align="stretch" spaceY={8} mt={14}>
        <InvestmentInfoCard
          name="Enviable Transport"
          investors={30}
          amountPerUnit="₦1M"
          annualReturn={10}
          image="/images/investments/1.png"
        />
        <InvestmentInfoCard
          name="Enviable Transport"
          investors={30}
          amountPerUnit="₦1M"
          annualReturn={10}
          image="/images/investments/1.png"
        />
        <InvestmentInfoCard
          name="Enviable Transport"
          investors={30}
          amountPerUnit="₦1M"
          annualReturn={10}
          image="/images/investments/1.png"
        />
        <InvestmentInfoCard
          name="Enviable Transport"
          investors={30}
          amountPerUnit="₦1M"
          annualReturn={10}
          image="/images/investments/1.png"
        />
      </VStack>
    </Box>
  );
};

export default JoinGroupLayout;
