"use client";

import { BackIcon } from "@/public/svgs";
import { Loader, StyledButton, StyledText } from "@/src/components";
import { Box, Flex, Grid, HStack, StackSeparator, VStack } from "@chakra-ui/react";
import { ActivityCard, DetailsCard, GroupInfoCard } from "../../../../cards";
import { FaUser } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useModal } from "@/src/contexts/ModalContext";
import JoinGroupModal from "../../../modals/JoinGroupModal";
import { useQuery } from "@tanstack/react-query";
import useSavings from "@/src/hooks/apis/queries/useSavings";
import { formatDate, getDaysLeft } from "@/src/utils/helpers";

const GroupPreviewLayout = ({ id }: { id: string }) => {
  const router = useRouter();

  const { getSaving } = useSavings();

  const { data, isPending, isFetching, error } = useQuery({
    queryKey: ["group-details", id],
    queryFn: () => getSaving(id),
  });

  const loading = isPending || isFetching;
  const saving = data?.data.message;

  const daysLeft = getDaysLeft(saving?.startDate, saving?.withdrawalDate);

  const savingData = [
    { label: "Start Date", value: formatDate(saving?.startDate) },
    { label: "Withdrawal Date", value: formatDate(saving?.withdrawalDate) },
    {
      label: "Target Group savings amount",
      value: `₦${Number(saving?.targetAmount).toLocaleString()}`,
    },
    {
      label: "Target per member",
      value:
        saving?.targetAmount && saving?.memberLimit && saving.memberLimit > 0
          ? (Number(saving.targetAmount) / Number(saving.memberLimit)).toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
              minimumFractionDigits: 0,
            })
          : "N/A",
    },
    // { label: "Frequency amount", value: `₦${Number(saving?.frequentAmount).toLocaleString()}` },
    { label: "Interest Rate", value: saving?.interestRate ? `${saving.interestRate}%` : "N/A" },
    { label: "Savings duration", value: saving?.duration },
    { label: "Days left", value: daysLeft },
  ];

  const { setIsJoinSavingsOpen } = useModal();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Flex h="50vh" alignItems="center" justifyContent="center">
        <StyledText color="red.500" textAlign="justify" fontSize="md">
          {error instanceof Error ? error.message : "Unknown error"}
        </StyledText>
      </Flex>
    );
  }

  if (!saving) {
    router.push("/savings/saving-groups");
    return null;
  }

  return (
    <Box px={{ base: 3, md: 6 }} py={{ base: 5, lg: 10 }} w={{ lg: "65%" }} mx="auto">
      <HStack spaceX={3}>
        <Box onClick={() => router.back()}>
          <BackIcon />
        </Box>
        <StyledText fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" color="secondary">
          Group Info
        </StyledText>
      </HStack>

      <VStack align="stretch" spaceY={8} mt={14}>
        <GroupInfoCard
          id={saving._id}
          title={saving?.title}
          daysLeft={Number(daysLeft)}
          members={saving?.groupMembers?.length ?? 0}
          percentageCompletion={saving?.savingProgress ?? 0}
          savingsPerMember={
            saving?.targetAmount && saving?.memberLimit
              ? `₦${(Number(saving.targetAmount) / Number(saving.memberLimit)).toLocaleString()}`
              : "N/A"
          }
          totalSavings="₦700K"
          interest={Number(saving?.interestRate)}
          image={saving.groupImage.imageUrl || "/images/group/3.jpg"}
        />

        <Box>
          <StyledText fontSize={{ base: "md", md: "lg" }} fontWeight="normal" color="secondary">
            About Group
          </StyledText>
          <StyledText fontSize={{ base: "sm", md: "md" }} fontWeight="normal" color="bfgrey">
            {saving?.groupDescription || "No description provided for this group."}
          </StyledText>
        </Box>

        <StyledButton
          fontSize={{ base: "sm", md: "md" }}
          onClick={() => setIsJoinSavingsOpen(true)}
        >
          Join
        </StyledButton>

        <Box>
          <StyledText fontSize={{ base: "md", md: "lg" }} fontWeight="normal" color="secondary">
            Payout Rule
          </StyledText>
          <StyledText fontSize={{ base: "sm", md: "md" }} fontWeight="normal" color="bfgrey">
            Your savings are completely yours. Only you can access them, ensuring your money stays
            safe and secure.
          </StyledText>
        </Box>

        <Grid templateColumns="repeat(2, 1fr)" justifyContent="start" gap={6}>
          {savingData.map(({ label, value }) => (
            <DetailsCard title={label} value={String(value)} key={label} />
          ))}
        </Grid>

        <Box>
          <StyledText fontSize={{ base: "md", md: "lg" }} fontWeight="medium" color="secondary">
            Members
          </StyledText>

          <VStack
            align="stretch"
            bg="white"
            borderRadius="2xl"
            separator={<StackSeparator color="border" />}
            mt={3}
          >
            <ActivityCard
              icon={<FaUser size={20} />}
              title="Joined target"
              timeAgo="15 hours"
              status="Started"
            />
            <ActivityCard
              icon={<FaUser size={20} />}
              title="Education Savings Group created"
              timeAgo="18 hours"
            />
          </VStack>
        </Box>
      </VStack>

      <JoinGroupModal />
    </Box>
  );
};

export default GroupPreviewLayout;
