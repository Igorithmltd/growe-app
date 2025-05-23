"use client";

import { Box, VStack } from "@chakra-ui/react";
//
import { StyledText } from "@/src/components";
// import { ROUTES } from "@/src/utils/constants";
import { useRouter } from "next/navigation";
import { BackIcon } from "@/public/svgs";
import { GroupInfoCard } from "../../../cards";

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
          Join Group
        </StyledText>
      </Box>

      <VStack align="stretch" spaceY={8} mt={14}>
        <GroupInfoCard
          title="Education Savings Group"
          daysLeft={28}
          members={30}
          percentageCompletion={65}
          savingsPerMember="₦200K"
          totalSavings="₦700K"
          interest={10}
          image="/images/group/3.jpg"
        />
        <GroupInfoCard
          title="Valentine’s Day Celebration"
          daysLeft={28}
          members={10}
          percentageCompletion={25}
          savingsPerMember="₦200K"
          totalSavings="₦700K"
          interest={10}
          image="/images/group/2.jpg"
        />
        <GroupInfoCard
          title="Travel Savings Group"
          daysLeft={28}
          members={30}
          percentageCompletion={85}
          savingsPerMember="₦200K"
          totalSavings="₦700K"
          interest={10}
          image="/images/group/1.jpg"
        />
      </VStack>
    </Box>
  );
};

export default JoinGroupLayout;
