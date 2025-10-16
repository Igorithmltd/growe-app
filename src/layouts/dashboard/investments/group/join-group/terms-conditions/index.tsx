"use client";

import { BackIcon } from "@/public/svgs";
import { StyledButton, StyledText, StyledField, StyledCheckbox } from "@/src/components";
import { Box, VStack, Text, List } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  joinInvestmentGroupSchema,
  JoinInvestmentGroupValues,
} from "@/src/schema/investments.schema";
import { yupResolver } from "@hookform/resolvers/yup";

const InvestmentGroupTerms = () => {
  const terms = [
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
      bullets: ["Any disputes will be resolved through a group meeting facilitated by the admin."],
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<JoinInvestmentGroupValues>({
    resolver: yupResolver(joinInvestmentGroupSchema),
  });

  const [agreed, setAgreed] = useState(true);
  const router = useRouter();

  const commonProps = {
    py: "20px",
    bg: "#F8F8F8",
    border: "2px solid #9BAB69",
    _focus: {
      outlineWidth: "2px",
      border: "none",
    },
  };

  const onSubmit = (data: JoinInvestmentGroupValues) => {
    // if (!agreed) {
    //   toast({
    //     title: "Agreement required",
    //     description: "You must agree to the terms to join the group.",
    //     status: "warning",
    //     duration: 3000,
    //     isClosable: true,
    //   });
    //   return;
    // }

    console.log(data);
  };

  return (
    <Box px={6} py={{ base: 2, lg: 6 }} w={{ lg: "65%" }} mx="auto">
      {/* Header */}
      <Box display="flex" gap={4} alignItems="center">
        <Box cursor="pointer" onClick={() => router.back()}>
          <BackIcon />
        </Box>

        <StyledText fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" color="secondary">
          Join Enviable Transport Investment Group
        </StyledText>
      </Box>

      {/* Form */}
      <Box mt={14}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack align="stretch" spaceY={8}>
            {/* Input */}
            <StyledField
              label="Enter Referral / invite code"
              placeholder="eg. Ref/2098Bvk"
              labelColor="secondary"
              fieldProps={register("inviteCode")}
              error={errors?.inviteCode?.message}
              {...commonProps}
            />

            {/* Terms and Conditions */}
            <Box>
              <StyledText color="secondary" fontSize={{ base: "sm", md: "md", lg: "lg" }} mb={2}>
                Agreement for Participation in Group Investment
              </StyledText>
              <StyledText fontSize={{ base: "sm", md: "md", lg: "lg" }} color="bfgrey" mb={2}>
                By joining this group investment, you agree to the following terms and conditions:
              </StyledText>

              <List.Root
                as="ol"
                gap="3"
                mt={4}
                color="secondary"
                fontSize={{ base: "sm", md: "md", lg: "lg" }}
              >
                {terms.map((term, index) => (
                  <List.Item key={index}>
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
              label={`By clicking "Agree and Join", you acknowledge that you have read, understood, and
              agreed to these terms of participation.`}
              checked={agreed}
              onChange={() => setAgreed((prev) => !prev)}
            />

            {/* Button */}
            <StyledButton type="submit" w="full" mt={2} loading={isSubmitting} disabled={!agreed}>
              Agree and Join Group
            </StyledButton>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default InvestmentGroupTerms;
