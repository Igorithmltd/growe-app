"use client";

import { Box, VStack, Link } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { StyledField, StyledButton, StyledText } from "@/src/components";
import { NINFormValues, ninSchema } from "@/src/schema/kyc.schema";
import { usePathname, useRouter } from "next/navigation";
import { ROUTES } from "@/src/utils/constants";
import { useKyc } from "@/src/hooks/apis/mutation/kyc/useKyc";
import { useUserDetailsStore } from "@/src/stores/user-details";
import { useEffect } from "react";

const NINLayout = () => {
  const router = useRouter();

  const pathname = usePathname();
  const user = useUserDetailsStore((state) => state.user);

  const { ninMutation } = useKyc();
  const { mutate: verifyNin, isPending } = ninMutation;

  // ✅ NIN FORM
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NINFormValues>({
    resolver: yupResolver(ninSchema),
  });

  // ✅ SUBMIT NIN
  const onSubmit = (data: NINFormValues) => {
    verifyNin(data, {
      onSuccess: () => {
        router.push(ROUTES.DASHBOARD.HOME);
        reset();
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

  useEffect(() => {
    if (
      pathname.startsWith(ROUTES.KYC.ROOT) &&
      user?.identityVerification?.status === "completed"
    ) {
      router.push(ROUTES.DASHBOARD.HOME);
    }
  }, [pathname, user, router]);

  return (
    <Box px={6} py={10} mx="auto" mt={{ base: 6, lg: "unset" }}>
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

        {/* ✅ SAME PATTERN AS BVN */}
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

            <StyledText
              smVariant="p12-regular"
              mdVariant="p12-regular"
              variant="p14-regular"
              color="secondary"
            >
              Don't have your NIN? Visit the nearest NIMC enrollment center
            </StyledText>

            <StyledButton type="submit" w="full" mt={2} loading={isPending}>
              Verify
            </StyledButton>
          </VStack>
        </form>

        <StyledText textAlign="center" fontSize={{ base: "sm", md: "md", lg: "lg" }}>
          Use BVN instead? Click{" "}
          <Link href={ROUTES.KYC.BVN} fontWeight="semibold" color="secondary">
            here
          </Link>
        </StyledText>
      </VStack>
    </Box>
  );
};

export default NINLayout;
