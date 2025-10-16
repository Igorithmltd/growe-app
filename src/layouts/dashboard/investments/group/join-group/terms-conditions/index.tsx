"use client";

import { BackIcon } from "@/public/svgs";
import {
  Loader,
  StyledButton,
  StyledText,
  StyledField,
  StyledCheckbox,
} from "@/src/components";
import { Box, VStack, Text, List } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState, useMemo } from "react";
import {
  joinInvestmentGroupSchema,
  JoinInvestmentGroupValues,
} from "@/src/schema/investments.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import useShowToast from "@/src/hooks/useShowToast";
import useInvestments from "@/src/hooks/apis/queries/useInvestments";
import { useQuery } from "@tanstack/react-query";
import { useInvestmentsMutations } from "@/src/hooks/apis/mutation/dashboard/useInvestments";

interface InvestmentGroupTermsProps {
  id: string;
}

const InvestmentGroupTerms = ({ id }: InvestmentGroupTermsProps) => {
  const router = useRouter();
  const toast = useShowToast();

  const { getInvestment } = useInvestments();
  const { isJoiningGroup, joinInvestmentGroup } = useInvestmentsMutations();

  const { data, isPending, isFetching, error } = useQuery({
    queryKey: ["investment-details", id],
    queryFn: () => getInvestment(id),
    enabled: Boolean(id),
  });

  const investment = data?.data?.message;
  const loading = isPending || isFetching;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<JoinInvestmentGroupValues>({
    resolver: yupResolver(joinInvestmentGroupSchema),
  });

  const [agreed, setAgreed] = useState(false);

  const commonProps = {
    py: "20px",
    bg: "#F8F8F8",
    border: "2px solid #9BAB69",
    _focus: {
      outlineWidth: "2px",
      border: "none",
    },
  };

  const terms = useMemo(
    () => [
      {
        title: "Contribution Commitment",
        bullets: [
          "You commit to contributing the agreed-upon amount as specified by the group.",
          "Late or missed contributions may result in penalties or removal from the group.",
        ],
      },
      {
        title: "Non-Refundable Contributions",
        bullets: [
          "Contributions are non-refundable once the group target is met and the investment is initiated.",
        ],
      },
      {
        title: "Shared Ownership and Returns",
        bullets: [
          "Your ownership in the group investment is proportional to your contribution.",
          "Returns will be distributed based on the percentage of your contribution.",
        ],
      },
      {
        title: "Disbursement and Investment Rules",
        bullets: [
          "Funds will be disbursed according to the group's agreed timeline and purpose.",
          "Any changes to the investment plan require approval from the group admin and majority members.",
        ],
      },
      {
        title: "Transparency and Accountability",
        bullets: [
          "All transactions will be logged and accessible to members for review.",
          "Group members are expected to act in good faith and maintain confidentiality.",
        ],
      },
      {
        title: "Dispute Resolution",
        bullets: [
          "Any disputes will be resolved through a group meeting facilitated by the admin.",
        ],
      },
    ],
    []
  );

  const onSubmit = (values: JoinInvestmentGroupValues) => {
    if (!agreed) {
      toast({
        title: "Agreement required",
        description: "You must agree to the terms to join the group.",
        status: "warning",
      });
      return;
    }

    try {
      joinInvestmentGroup({ ...values, investmentGroupId: id });
    } catch (err: any) {
      toast({
        title: "Failed to join group",
        description: err?.response?.data?.message || "Please try again.",
        status: "error",
      });
    }
  };

  if (loading) return <Loader />;

  if (error)
    return (
      <Box py={10} textAlign="center">
        <StyledText color="red.400">
          Failed to load investment details.
        </StyledText>
      </Box>
    );

  return (
    <Box px={1} py={{ base: 2, lg: 6 }} w={{ lg: "65%" }} mx="auto">
      {/* Header */}
      <Box display="flex" gap={4} alignItems="center" mb={6}>
        <Box cursor="pointer" onClick={() => router.back()}>
          <BackIcon />
        </Box>

        <StyledText
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="medium"
          color="secondary"
        >
          Join {investment?.title ?? "Investment Group"}
        </StyledText>
      </Box>

      {/* Form */}
      <Box mt={10}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack align="stretch" spaceY={8}>
            <StyledField
              label="Enter Referral / Invite Code"
              placeholder="e.g. REF12345"
              labelColor="secondary"
              fieldProps={register("groupRefferalCode")}
              error={errors?.groupRefferalCode?.message}
              {...commonProps}
            />

            {/* Terms and Conditions */}
            <Box>
              <StyledText
                color="secondary"
                fontSize={{ base: "sm", md: "md", lg: "lg" }}
                mb={2}
              >
                Agreement for Participation in Group Investment
              </StyledText>
              <StyledText
                fontSize={{ base: "sm", md: "md", lg: "lg" }}
                color="bfgrey"
                mb={2}
              >
                By joining this group investment, you agree to the following
                terms and conditions:
              </StyledText>

              <List.Root
                as="ol"
                gap="3"
                mt={4}
                color="secondary"
                fontSize={{ base: "sm", md: "md", lg: "lg" }}
              >
                {terms.map((term, idx) => (
                  <List.Item key={idx}>
                    <Text mb={1}>{term.title}:</Text>
                    <List.Root as="ul" pl={5} gap="1.5" color="bfgrey">
                      {term.bullets.map((bullet, i) => (
                        <List.Item key={i}>{bullet}</List.Item>
                      ))}
                    </List.Root>
                  </List.Item>
                ))}
              </List.Root>
            </Box>

            <StyledCheckbox
              label={`By clicking "Agree and Join", you acknowledge that you have read, understood, and agreed to these terms of participation.`}
              checked={agreed}
              onChange={() => setAgreed((prev) => !prev)}
            />

            <StyledButton
              type="submit"
              w="full"
              mt={2}
              loading={isSubmitting || isJoiningGroup}
              disabled={!agreed}
            >
              Agree and Join Group
            </StyledButton>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default InvestmentGroupTerms;
