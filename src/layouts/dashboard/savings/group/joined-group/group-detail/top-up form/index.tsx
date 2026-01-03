"use client";

import { Box, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
//
import { StyledButton, StyledText } from "@/src/components";
import { useParams, useRouter } from "next/navigation";
import {
  quickSavingSchema,
  QuickSavingValues,
} from "@/src/schema/savings.schema";
import { AmountInput } from "@/src/components/amount-input";
import { BackIcon, SuccessMark } from "@/public/svgs";
import InfoModal from "@/src/components/modals/InfoModal";
import { usePaystackPayment } from "@/src/hooks/usePaystack";
import { useUserDetailsStore } from "@/src/stores/user-details";
import { useModal } from "@/src/contexts/ModalContext";
import useShowToast from "@/src/hooks/useShowToast";

const TopUpLayout = () => {
  const router = useRouter();
  const { id } = useParams(); // actionId (if top-up is tied to a specific saving)
  const toast = useShowToast();
  const { setIsInfoOpen } = useModal();
  const user = useUserDetailsStore((state) => state.user);

  const initializePayment = usePaystackPayment();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuickSavingValues>({
    resolver: yupResolver(quickSavingSchema),
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    document.body.appendChild(script);
  }, []);

  const onSubmit = async (data: QuickSavingValues) => {
    const amount = Number(data.amount);
    const email = user?.email || "guest@example.com";

    const metadata = {
      amount,
      email,
      type: "savings",
      actionId: id,
    };

    initializePayment(
      { email, amount, metadata },
      () => {
        toast({
          title: "Payment Successful!",
          description: "Your top-up was successful and will reflect shortly.",
          status: "success",
          duration: 3000,
        });

        setIsInfoOpen(true);
      },
      () => {
        toast({
          title: "Payment window closed.",
          status: "info",
          duration: 2000,
        });
      }
    );
  };

  const commonProps = {
    py: "20px",
    bg: "#F8F8F8",
    border: "2px solid #9BAB69",
    _focus: {
      outlineWidth: "2px",
      border: "none",
    },
  };

  return (
    <Box px={{lg:6}} py={{ base: 2, lg: 6 }} w={{ lg: "65%" }} mx="auto">
      <Box display="flex" gap={4} alignItems="center">
        <Box cursor="pointer" onClick={() => router.back()}>
          <BackIcon />
        </Box>

        <StyledText
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="medium"
          color="secondary"
        >
          Top Up Savings
        </StyledText>
      </Box>

      <StyledText
        mt={6}
        fontSize={{ base: "sm", md: "md", lg: "lg" }}
        fontWeight="normal"
        color="bfgrey"
      >
        Add money to your savings and watch your goals grow instantly!
      </StyledText>

      <Box mt={14}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spaceY={8} align="stretch">
            <AmountInput
              label="Amount"
              placeholder="Enter amount to save (Min: 1000)"
              labelColor="secondary"
              field={register("amount")}
              error={errors?.amount?.message}
              {...commonProps}
            />

            <StyledButton type="submit" w="full" mt={2} loading={isSubmitting}>
              Top up
            </StyledButton>
          </VStack>
        </form>
      </Box>

      <InfoModal
        message="Woohoo! 🎉 Your Transaction Was a Success!"
        hasButton={true}
        buttonText="Go back to Quick Save"
        icon={<SuccessMark />}
        onButtonClick={() => router.push("/savings")}
      />
    </Box>
  );
};

export default TopUpLayout;
