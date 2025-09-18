"use client";

import { BackIcon } from "@/public/svgs";
import { Loader, StyledButton, StyledText } from "@/src/components";
import { Box, Flex, Grid, HStack, StackSeparator, VStack } from "@chakra-ui/react";
import { ActivityCard, DetailsCard, GroupInfoCard } from "../../../../cards";
import { FaGear, FaUser } from "react-icons/fa6";
import { MdContentCopy, MdPayment } from "react-icons/md";
import { CiUnlock } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { copyToClipboard, formatDate, getDaysLeft } from "@/src/utils/helpers";
import useShowToast from "@/src/hooks/useShowToast";
import { useModal } from "@/src/contexts/ModalContext";
import GroupSettingsModal from "../../../modals/GroupSettingsModal";
import useSavings from "@/src/hooks/apis/queries/useSavings";
import { useQuery } from "@tanstack/react-query";

const GroupDetailsLayout = ({ id }: { id: string }) => {
  const router = useRouter();
  const toast = useShowToast();
  const { setIsGroupSettingsOpen } = useModal();

  const { getSaving } = useSavings();

  const { data, isPending, isFetching, error } = useQuery({
    queryKey: ["group-details", id],
    queryFn: () => getSaving(id),
  });

  const loading = isPending || isFetching;
  const saving = data?.data.message;

  const handleCopy = async () => {
    const success = await copyToClipboard(String(saving?.groupRefferalCode));
    toast({
      title: success ? "Copied!" : "Copy failed",
      status: success ? "success" : "error",
    });
  };

  const daysLeft = getDaysLeft(saving?.startDate, saving?.withdrawalDate);

  const savingData = [
    { label: "Start Date", value: formatDate(saving?.startDate) },
    { label: "Withdrawal Date", value: formatDate(saving?.withdrawalDate) },
    { label: "Target Group savings amount", value: saving?.targetAmount },
    {
      label: "Target per member",
      value:
        saving?.targetAmount && saving?.memberLimit
          ? `₦${(Number(saving.targetAmount) / Number(saving?.memberLimit)).toLocaleString()}`
          : "N/A",
    },
    { label: "Frequency amount", value: "₦25,000 Monthly" },
    { label: "Interest Rate", value: saving?.interestRate ? `${saving.interestRate}%` : "N/A" },
    { label: "Savings duration", value: saving?.duration },
    { label: "Days left", value: daysLeft },
  ];

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
    <Box px={{ base: 2, md: 6 }} py={{ base: 5, lg: 10 }} w={{ lg: "65%" }} mx="auto">
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
          image="/images/group/3.jpg"
        />

        <Box>
          <StyledText fontSize={{ base: "md", md: "lg" }} fontWeight="normal" color="secondary">
            About Group
          </StyledText>
          <StyledText fontSize={{ base: "sm", md: "md" }} fontWeight="normal" color="bfgrey">
            {saving?.groupDescription}
          </StyledText>
        </Box>

        <HStack alignSelf={{ lg: "start" }} spaceX={6}>
          <StyledButton
            type="button"
            color="primary"
            bg="border"
            flex={{ base: 1, lg: "unset" }}
            onClick={handleCopy}
          >
            <Grid
              boxSize="30px"
              bg="transparent"
              color="primary"
              placeItems="center"
              borderRadius="full"
            >
              <MdContentCopy />
            </Grid>
            Copy invite link
          </StyledButton>
          <StyledButton
            type="button"
            color="primary"
            bg="border"
            flex={{ base: 1, lg: "unset" }}
            px={8}
            fontSize={{ base: "sm", md: "md" }}
            onClick={() => setIsGroupSettingsOpen(true)}
          >
            <Grid h="30px" w="30px" color="primary" placeItems="center" borderRadius="full">
              <FaGear />
            </Grid>
            Settings
          </StyledButton>
        </HStack>

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

        <HStack alignSelf={{ lg: "start" }} spaceX={6}>
          <StyledButton
            type="button"
            color="secondary"
            flex={{ base: 1, lg: "unset" }}
            bg="white"
            onClick={() => router.push(`/savings/saving-groups/${id}/top-up`)}
            fontSize={{ base: "sm", md: "md" }}
          >
            <Grid
              boxSize="30px"
              bg="#F8FBEB"
              color="primary"
              placeItems="center"
              borderRadius="full"
            >
              <MdPayment fontSize="14px" />
            </Grid>
            Top Up
          </StyledButton>
          <StyledButton
            type="button"
            color="secondary"
            flex={{ base: 1, lg: "unset" }}
            bg="white"
            px={8}
            fontSize={{ base: "sm", md: "md" }}
            onClick={() => router.push(`/savings/saving-groups/${id}/disbursement`)}
          >
            <Grid
              h="30px"
              w="30px"
              bg="#F8FBEB"
              color="primary"
              placeItems="center"
              borderRadius="full"
            >
              <CiUnlock />
            </Grid>
            Disbursement
          </StyledButton>
        </HStack>

        <Box>
          <StyledText fontSize={{ base: "md", md: "lg" }} fontWeight="medium" color="secondary">
            Latest Activities
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

      <GroupSettingsModal />
    </Box>
  );
};

export default GroupDetailsLayout;
