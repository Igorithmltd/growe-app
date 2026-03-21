"use client";

import { Box, VStack, Link, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { StyledField, StyledButton, StyledText } from "@/src/components";
import { BVNFormValues, bvnSchema } from "@/src/schema/kyc.schema";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/src/utils/constants";
import { useKyc } from "@/src/hooks/apis/mutation/kyc/useKyc";

const BVNLayout = () => {
  const router = useRouter();

  const { bvnMutation } = useKyc();
  const { mutate: verifyBvn, isPending } = bvnMutation;

  // ✅ BVN FORM
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BVNFormValues>({
    resolver: yupResolver(bvnSchema),
  });

  // ✅ SUBMIT BVN
  const onSubmit = (data: BVNFormValues) => {
    verifyBvn(data, {
      onSuccess: () => {
        router.push("/home");
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

  return (
    <Box px={6} py={10} mx="auto" mt={{ base: 6, lg: "unset" }}>
      <VStack align="stretch" spaceY={6}>
        <Box>
          <StyledText
            fontSize={{ base: "18px", md: "21px", lg: "24px" }}
            fontWeight="semibold"
            color="secondary"
          >
            BVN Verification
          </StyledText>
          <StyledText fontSize={{ base: "12px", md: "14px", lg: "16px" }} mt={2}>
            Enter your BVN details for quick verification
          </StyledText>
        </Box>

        {/* ✅ FIXED: Proper onSubmit usage */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spaceY={4} align="stretch">
            <StyledField
              label="Bank Verification Number"
              placeholder="Enter 11-digits BVN"
              labelColor="secondary"
              type="text"
              fieldProps={register("bvn")}
              error={errors?.bvn?.message}
              {...commonProps}
            />

            <StyledText
              smVariant="p12-regular"
              mdVariant="p12-regular"
              variant="p14-regular"
              color="secondary"
            >
              Don't know your BVN? Dial{" "}
              <Text as="span" fontWeight="bold">
                *565*0#
              </Text>{" "}
              on your registered phone number
            </StyledText>

            <StyledButton type="submit" w="full" mt={2} loading={isPending}>
              Verify
            </StyledButton>
          </VStack>
        </form>

        <StyledText textAlign="center" fontSize={{ base: "sm", md: "md", lg: "lg" }}>
          Use NIN instead? Click{" "}
          <Link href={ROUTES.KYC.NIN} fontWeight="semibold" color="secondary">
            here
          </Link>
        </StyledText>
      </VStack>
    </Box>
  );
};

export default BVNLayout;
