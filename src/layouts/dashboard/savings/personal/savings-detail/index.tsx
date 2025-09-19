"use client";

import { BackIcon } from "@/public/svgs";
import { Loader, StyledButton, StyledText } from "@/src/components";
import { Box, Flex, Grid, HStack, StackSeparator, VStack } from "@chakra-ui/react";
import { ActiveSavingsCard, ActivityCard, DetailsCard } from "../../../cards";
import { FaUser } from "react-icons/fa6";
import { MdPayment } from "react-icons/md";
import { CiUnlock } from "react-icons/ci";
import { useRouter } from "next/navigation";
import InfoModal from "@/src/components/modals/InfoModal";
import { useModal } from "@/src/contexts/ModalContext";
import useSavings from "@/src/hooks/apis/queries/useSavings";
import { useQuery } from "@tanstack/react-query";
import { calculateFutureAmount, formatDate } from "@/src/utils/helpers";

const SavingDetailsLayout = ({ id }: { id: string }) => {
  const router = useRouter();
  const { setIsInfoOpen } = useModal();

  const { getSaving } = useSavings();

  const { data, isPending, isFetching, error } = useQuery({
    queryKey: ["goal-details", id],
    queryFn: () => getSaving(id),
  });

  const loading = isPending || isFetching;
  const saving = data?.data.message;

  const handleContinue = () => {
    setIsInfoOpen(false);
    router.push(`/savings/saving-goals/${id}/break-savings`);
  };

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
    router.push("/savings/saving-goals");
    return null;
  }

  const savingData = [
    { label: "Target Amount", value: `₦${saving.targetAmount.toLocaleString()}` },
    { label: "Interest Rate", value: `${saving.interestRate}% p.a ` },
    { label: "Maturity Date", value: formatDate(saving.withdrawalDate) },
    // { label: "Payment Interval", value: "Every Sunday" },
    {
      label: "Estimated Future Amount",
      value: `₦${calculateFutureAmount(saving.targetAmount, saving.duration, Number(saving.interestRate)).toLocaleString()}`,
    },
  ];

  return (
    <Box px={6} py={{ base: 5, lg: 10 }} w={{ lg: "65%" }} mx="auto">
      <HStack spaceX={3}>
        <Box onClick={() => router.back()} cursor="pointer">
          <BackIcon />
        </Box>
        <StyledText fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" color="secondary">
          Goal Info
        </StyledText>
      </HStack>

      <VStack align="stretch" spaceY={8} mt={14}>
        <ActiveSavingsCard
          id={saving._id}
          amount={String(saving.targetAmount.toLocaleString())}
          name={saving.title}
          plan={saving.duration}
          value={saving.savingProgress}
        />

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
            onClick={() => router.push("/savings/saving-goals/123/top-up")}
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
            onClick={() => setIsInfoOpen(true)}
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
            Break Savings
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
              title="Rent Personal Savings Goal created"
              timeAgo="15 hours"
              status="Started"
            />
            <ActivityCard
              icon={<FaUser size={20} />}
              title="Deposited ₦133,000 for Rent savings goal"
              timeAgo="18 hours"
            />
          </VStack>
        </Box>
      </VStack>

      <InfoModal
        title="Breaking Your Savings Will Incur a 5% Fee!"
        message="If you proceed with breaking this savings plan before the withdrawal date, you will lose 5% of your total savings. To avoid charges, we recommend completing the full savings duration."
        hasButton
        buttonText="Continue"
        onButtonClick={handleContinue}
      />
    </Box>
  );
};

export default SavingDetailsLayout;
