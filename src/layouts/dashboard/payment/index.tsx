"use client";

import { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";

import { SuccessMark } from "@/public/svgs";
import InfoModal from "@/src/components/modals/InfoModal";
import { useModal } from "@/src/contexts/ModalContext";
import useShowToast from "@/src/hooks/useShowToast";

const PaymentCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useShowToast();
  const { setIsInfoOpen } = useModal();

  const reference = searchParams.get("reference") ?? searchParams.get("trxref");

  useEffect(() => {
    if (!reference) {
      toast({
        title: "Invalid payment",
        description: "Payment reference not found",
        status: "error",
      });

      router.replace("/home");
      return;
    }

    setIsInfoOpen(true);
  }, [reference, router, setIsInfoOpen, toast]);

  return (
    <Box>
      <InfoModal
        message="Woohoo! 🎉 Your Transaction Was Submitted!"
        hasButton
        buttonText="Go back to Dashboard"
        icon={<SuccessMark />}
        onButtonClick={() => router.push("/home")}
      />
    </Box>
  );
};

export default PaymentCallback;
