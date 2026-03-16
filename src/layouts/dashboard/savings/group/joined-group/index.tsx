"use client";

import { Box, VStack, Flex } from "@chakra-ui/react";
import { Loader, StyledText } from "@/src/components";
import { useRouter } from "next/navigation";
import { BackIcon } from "@/public/svgs";
import { EmptyCard, GroupInfoCard } from "../../../cards";
import useSavings from "@/src/hooks/apis/queries/useSavings";
import { useQuery } from "@tanstack/react-query";

const JoinedGroupsLayout = () => {
  const router = useRouter();
  const { getActiveSavings } = useSavings();

  const { data, isPending, isFetching, error } = useQuery({
    queryKey: ["all-active-groups"],
    queryFn: getActiveSavings,
  });

  const handleBack = () => {
    router.back();
  };

  const savings = data?.data.message || [];
  const loading = isPending || isFetching;

  let content;

  if (loading) {
    content = <Loader />;
  } else if (error) {
    content = (
      <Flex h="50vh" alignItems="center" justifyContent="center">
        <StyledText color="red.500" textAlign="justify" fontSize="md">
          {error instanceof Error ? error.message : "Unknown error"}
        </StyledText>
      </Flex>
    );
  } else if (savings.length === 0) {
    content = <EmptyCard title="You Don’t Have Any Active Group Savings Yet!" />;
  } else {
    content = savings.map((group) => {
      const daysLeft = Math.max(
        0,
        Math.ceil((new Date(group.withdrawalDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      );

      return (
        <GroupInfoCard
          key={group._id}
          id={group._id}
          title={group.title}
          daysLeft={daysLeft}
          members={group.groupMembers.length}
          percentageCompletion={group.savingProgress}
          savingsPerMember={`₦${(group.targetAmount / group.memberLimit).toLocaleString()}`}
          totalSavings={`₦${group.targetAmount.toLocaleString()}`}
          interest={group.interestRate}
          image="/images/group/3.jpg"
          isJoin={false}
        />
      );
    });
  }

  return (
    <Box px={{ base: 3, md: 6 }} py={{ base: 5, lg: 10 }} w={{ lg: "65%" }} mx="auto">
      <Box display="flex" gap={4} alignItems="center" mt={{ base: 6, lg: "unset" }}>
        <Box cursor="pointer" onClick={handleBack}>
          <BackIcon />
        </Box>

        <StyledText fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" color="secondary">
          Active Groups
        </StyledText>
      </Box>

      <VStack align="stretch" spaceY={8} mt={14}>
        {content}
      </VStack>
    </Box>
  );
};

export default JoinedGroupsLayout;
