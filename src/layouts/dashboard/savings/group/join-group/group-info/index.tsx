"use client";

import { BackIcon } from "@/public/svgs";
import { StyledButton, StyledText } from "@/src/components";
import { Box, Grid, HStack, StackSeparator, VStack } from "@chakra-ui/react";
import { ActivityCard, DetailsCard, GroupInfoCard } from "../../../../cards";
import { FaUser } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import useShowToast from "@/src/hooks/useShowToast";
import { useModal } from "@/src/contexts/ModalContext";

const data = [
  { label: "Start Date", value: "10th Jan 2025" },
  { label: "Withdrawal Date", value: "10th June 2025" },
  { label: "Target Group savings amount", value: "₦2Million" },
  { label: "Target per member", value: "₦200,000" },
  { label: "Frequency amount", value: "₦25,000 Monthly" },
  { label: "Interest Rate", value: "10%" },
  { label: "Savings duration", value: "6 months" },
  { label: "Days left", value: "160" },
];

const GroupPreviewLayout = () => {
  const router = useRouter();

  const { setIsJoinSavingsOpen } = useModal();

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
          title="Education Savings Group"
          daysLeft={28}
          members={30}
          percentageCompletion={65}
          savingsPerMember="₦200K"
          totalSavings="₦700K"
          interest={10}
          image="/images/group/3.jpg"
        />

        <Box>
          <StyledText fontSize={{ base: "md", md: "lg" }} fontWeight="normal" color="secondary">
            About Group
          </StyledText>
          <StyledText fontSize={{ base: "sm", md: "md" }} fontWeight="normal" color="bfgrey">
            Education Savings Group helps you and others save collectively for tuition,
            certifications, and educational goals. Together, make learning affordable and achievable
            for everyone!
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
          {data.map(({ label, value }) => (
            <DetailsCard title={label} value={value} key={label} />
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
    </Box>
  );
};

export default GroupPreviewLayout;
