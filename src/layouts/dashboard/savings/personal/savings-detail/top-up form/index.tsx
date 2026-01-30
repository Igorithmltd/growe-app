"use client";

import { Box, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
//
import { StyledButton, StyledText } from "@/src/components";
import { useParams, useRouter } from "next/navigation";
import { quickSavingSchema, QuickSavingValues } from "@/src/schema/savings.schema";
import { AmountInput } from "@/src/components/amount-input";
import { BackIcon } from "@/public/svgs";
import { useUserDetailsStore } from "@/src/stores/user-details";
import { usePayment } from "@/src/hooks/apis/mutation/dashboard/usePayment";

const TopUpLayout = () => {
  const router = useRouter();
  const { id } = useParams();

  const user = useUserDetailsStore((state) => state.user);

  const { mutate: makePayment, isPending } = usePayment();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuickSavingValues>({
    resolver: yupResolver(quickSavingSchema),
  });

  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://js.paystack.co/v1/inline.js";
  //   document.body.appendChild(script);
  // }, []);

  // const onSubmit = async (data: QuickSavingValues) => {
  //   const amount = Number(data.amount);
  //   const email = user?.email || "guest@example.com";

  //   const metadata = {
  //     amount,
  //     email,
  //     type: "savings",
  //     actionId: id,
  //   };

  //   initializePayment(
  //     { email, amount, metadata },
  //     () => {
  //       toast({
  //         title: "Payment Successful!",
  //         description: "Your top-up was successful and will reflect shortly.",
  //         status: "success",
  //         duration: 3000,
  //       });

  //       setIsInfoOpen(true);
  //     },
  //     () => {
  //       toast({
  //         title: "Payment window closed.",
  //         status: "info",
  //         duration: 2000,
  //       });
  //     }
  //   );
  // };

  const onSubmit = (data: QuickSavingValues) => {
    const payload = {
      email: user?.email as string,
      amount: String(data.amount),
      actionType: "savings" as const,
      actionId: id as string,
    };

    makePayment(payload, {
      onSuccess: (res) => {
        window.location.href = res.data.authorization_url;
      },
    });
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
    <Box px={{ lg: 6 }} py={{ base: 2, lg: 6 }} w={{ lg: "65%" }} mx="auto">
      <Box display="flex" gap={4} alignItems="center">
        <Box cursor="pointer" onClick={() => router.back()}>
          <BackIcon />
        </Box>

        <StyledText fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" color="secondary">
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

            <StyledButton type="submit" w="full" mt={2} loading={isSubmitting || isPending}>
              Top up
            </StyledButton>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default TopUpLayout;
