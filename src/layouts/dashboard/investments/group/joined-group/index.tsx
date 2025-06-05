"use client";

import { Box, VStack } from "@chakra-ui/react";
//
import { StyledText } from "@/src/components";
// import { ROUTES } from "@/src/utils/constants";
import { useRouter } from "next/navigation";
import { BackIcon } from "@/public/svgs";
import { InvestmentGroupCard } from "../../../cards";

const JoinedInvestmentsGroupsLayout = () => {
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
          Investment Groups
        </StyledText>
      </Box>

      <VStack align="stretch" spaceY={8} mt={14}>
        <InvestmentGroupCard
          title="Enviable Transport Invest Group"
          image="/images/investments/1.png"
          members={30}
          target="1M"
          contribution="100K"
          returnRate="10"
          progress={30}
          daysLeft={20}
          link="/investements/join-group/123"
        />
        <InvestmentGroupCard
          title="Enviable Transport Invest Group"
          image="/images/investments/1.png"
          members={30}
          target="1M"
          contribution="100K"
          returnRate="10"
          progress={30}
          daysLeft={20}
          link="/investements/join-group/123"
        />
        <InvestmentGroupCard
          title="Enviable Transport Invest Group"
          image="/images/investments/1.png"
          members={30}
          target="1M"
          contribution="100K"
          returnRate="10"
          progress={30}
          daysLeft={20}
          link="/investements/join-group/123"
        />
        <InvestmentGroupCard
          title="Enviable Transport Invest Group"
          image="/images/investments/1.png"
          members={30}
          target="1M"
          contribution="100K"
          returnRate="10"
          progress={30}
          daysLeft={20}
          link="/investements/join-group/123"
        />
      </VStack>
    </Box>
  );
};

export default JoinedInvestmentsGroupsLayout;
