"use client";

import { Box, VStack, Link, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
//
import { StyledField, StyledButton, StyledText, StyledPinInput } from "@/src/components";
import { NINFormValues, ninSchema } from "@/src/schema/kyc.schema";
import { usePathname, useRouter } from "next/navigation";
import { useQueryString } from "@/src/hooks/useQueryString";
import { useQueryParams } from "@/src/hooks/useQueryParams";
import { otpSchema } from "@/src/schema/auth.schema";
import { useEffect, useState } from "react";

const NINLayout = () => {
  const router = useRouter();
  const pathname = usePathname();
  const createQueryString = useQueryString();
  const { getQueryParams } = useQueryParams();

  const [phone, setPhone] = useState<string>("");

  useEffect(() => {
    const storedPhone = sessionStorage.getItem("phone");
    if (storedPhone) {
      setPhone(storedPhone);
    }
  }, []);

  const nin = getQueryParams("verify");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NINFormValues>({
    resolver: yupResolver(ninSchema),
  });

  const {
    register: otpRegister,
    handleSubmit: handleOtpSubmit,
    reset: resetOtpForm,
    formState: { errors: otpErrors },
  } = useForm<{ code: string }>({
    resolver: yupResolver(otpSchema),
  });

  const onSubmit = (data: NINFormValues) => {
    console.log("Submitting email:", data);
    sessionStorage.setItem("phone", data.phone);
    setPhone(data.phone);
    router.replace(pathname + "?" + createQueryString("verify", String(data.nin)), {
      scroll: false,
    });
    reset();
  };

  const onSubmitOtp = (data: { code: string }) => {
    console.log("Verifying OTP:", data.code);
    resetOtpForm();
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
    <Box px={6} py={10} mx="auto" mt={{ base: 6, lg: nin ? "120px" : "unset" }}>
      {!nin ? (
        <VStack align="stretch" spaceY={6}>
          <Box>
            <StyledText
              fontSize={{ base: "18px", md: "21px", lg: "24px" }}
              fontWeight="semibold"
              color="secondary"
            >
              NIN Verification
            </StyledText>
            <StyledText fontSize={{ base: "12px", md: "14px", lg: "16px" }} mt={2}>
              Enter your NIN details for quick verification
            </StyledText>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spaceY={4} align="stretch">
              <StyledField
                label="National Identification Number"
                placeholder="Enter 11-digits NIN"
                labelColor="secondary"
                type="text"
                fieldProps={register("nin")}
                error={errors?.nin?.message}
                {...commonProps}
              />

              <StyledField
                label="Phone Number linked to NIN"
                placeholder="eg. 08163149876"
                labelColor="secondary"
                fieldProps={register("phone")}
                type="tel"
                error={errors?.phone?.message}
                {...commonProps}
              />

              <StyledText smVariant="p12-regular" mdVariant="p12-regular" variant="p14-regular">
                We'll send a one-time password to this phone number to confirm your identity{" "}
              </StyledText>

              <StyledText
                smVariant="p12-regular"
                mdVariant="p12-regular"
                variant="p14-regular"
                color="secondary"
              >
                Don't have your NIN? Visit the nearest NIMC enrollment center
              </StyledText>

              <StyledButton type="submit" w="full" mt={2}>
                Verify
              </StyledButton>
            </VStack>
          </form>

          <StyledText textAlign="center" fontSize={{ base: "sm", md: "md", lg: "lg" }}>
            Use BVN instead? Click{" "}
            <Link
              href="/kyc/bvn"
              fontWeight="semibold"
              color="secondary"
              _hover={{
                textDecor: "none",
              }}
              _focus={{
                outline: "none",
              }}
            >
              here
            </Link>
          </StyledText>
        </VStack>
      ) : (
        <VStack spaceY={6} align="stretch">
          <Box>
            <StyledText
              fontSize={{ base: "16px", md: "21px", lg: "24px" }}
              color="secondary"
              fontWeight="semibold"
            >
              NIN Verification
            </StyledText>
            <StyledText fontSize={{ base: "12px", md: "14px", lg: "16px" }} mt={3}>
              We’ve sent a verification code to “{phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")}
              ”.
            </StyledText>
          </Box>

          <form onSubmit={handleOtpSubmit(onSubmitOtp)}>
            <VStack spaceY={4} align="stretch">
              <StyledPinInput
                count={6}
                fieldProps={otpRegister("code")}
                error={otpErrors.code?.message}
              />

              <StyledText textAlign="center" fontSize={{ base: "sm", md: "md", lg: "lg" }}>
                Didn’t receive the code?{" "}
                <Text as="span" fontWeight="semibold" color="secondary">
                  Resend
                </Text>{" "}
                in 30 seconds.
              </StyledText>

              <StyledButton type="submit" w="full" mt={4}>
                Verify
              </StyledButton>
            </VStack>
          </form>
        </VStack>
      )}
    </Box>
  );
};

export default NINLayout;
