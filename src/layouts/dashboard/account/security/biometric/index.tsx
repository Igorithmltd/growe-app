"use client";

import { Box, Icon, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { RiFingerprint2Line } from "react-icons/ri";

import useShowToast from "@/src/hooks/useShowToast";
import { PasswordInput, StyledButton, StyledText } from "@/src/components";
import { BackIcon } from "@/public/svgs";
import { biometricSchema, BiometricValues } from "@/src/schema/profile.schema";

export default function BiometricLayout() {
  const router = useRouter();
  const showToast = useShowToast();

  const [hasTouched, setHasTouched] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BiometricValues>({
    resolver: yupResolver(biometricSchema),
  });

  const handleBack = () => router.back();

  const handleFingerprintScan = () => {
    if (isScanning) return;

    setHasTouched(true);
    setIsScanning(true);

    setTimeout(() => {
      showToast({
        title: "Biometric recognized",
        status: "success",
        duration: 1500,
      });

      setIsConfirming(true);
      setIsScanning(false);
    }, 2000);
  };

  const onSubmit = (data: BiometricValues) => {
    console.log(data);
    // You can route or show success message here
  };

  const commonInputProps = {
    py: "20px",
    bg: "#F8F8F8",
    border: "2px solid #9BAB69",
    _focus: { outlineWidth: "2px", border: "none" },
  };

  return (
    <Box px={6} py={{ base: 5, lg: 10 }} w={{ lg: "65%" }} mx="auto">
      <Box display="flex" gap={4} alignItems="center" mt={{ base: 6, lg: "unset" }}>
        <Box cursor="pointer" onClick={handleBack}>
          <BackIcon />
        </Box>
        <StyledText fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" color="secondary">
          {isConfirming ? "Confirm Your Identity" : "Biometric Login Setup"}
        </StyledText>
      </Box>

      <StyledText display="flex" fontSize={["sm", "md"]} color="bfgrey" mb={12} mt={4}>
        {isConfirming
          ? "Confirm your identity by entering your password to finalize the biometric setup."
          : "Quickly and securely access your account with biometric authentication. Tap the fingerprint icon to begin setup."}
      </StyledText>

      {isConfirming ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spaceY={6} align="stretch" mt={8}>
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              labelColor="secondary"
              field={register("currentPassword")}
              error={errors.currentPassword?.message}
              {...commonInputProps}
            />

            <StyledButton type="submit" w="full" mt={2} loading={isSubmitting}>
              Confirm & Enable Biometric
            </StyledButton>
          </VStack>
        </form>
      ) : (
        <VStack spaceY={4} align="center" justify="center" mt={20}>
          <Icon
            as={RiFingerprint2Line}
            boxSize="140px"
            color={hasTouched ? "primary" : "gray.300"}
            cursor="pointer"
            onClick={handleFingerprintScan}
          />
          <StyledText fontSize="md" color="bfgrey" pt={8}>
            {isScanning ? "Scanning in progress..." : "Place your finger on the sensor"}
          </StyledText>
        </VStack>
      )}
    </Box>
  );
}
