"use client";

import { BackIcon } from "@/public/svgs";
import { StyledButton, StyledText, StyledField, StyledCheckbox } from "@/src/components";
import { QuickSavingValues } from "@/src/schema/savings.schema";
import { Box, VStack, Text, List } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";

const InvestmentGroupTerms = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuickSavingValues>();

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

  const onSubmit = (data: QuickSavingValues) => {
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
    <Box px={6} py={{ base: 5, lg: 10 }} w={{ lg: "65%" }} mx="auto">
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
              fieldProps={register("amount")}
              error={errors?.amount?.message}
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

              <List.Root as="ol" gap="3" mt={4} color="secondary" fontSize={{ base: "sm", md: "md", lg: "lg" }}>
                <List.Item>
                  <Text fontWeight="semibold" mb={1}>
                    Contribution Commitment:
                  </Text>
                  <List.Root as="ul" pl={5} gap="1.5">
                    <List.Item>
                      You commit to contributing the agreed-upon amount as specified by the group.
                    </List.Item>
                    <List.Item>
                      Late or missed contributions may result in penalties or removal from the
                      group.
                    </List.Item>
                  </List.Root>
                </List.Item>

                <List.Item>
                  <Text fontWeight="semibold" mb={1}>
                    Non-Refundable Contributions:
                  </Text>
                  <List.Root as="ul" pl={5} gap="1.5">
                    <List.Item>
                      Contributions are non-refundable once the group target is met and the
                      investment is initiated.
                    </List.Item>
                  </List.Root>
                </List.Item>

                <List.Item>
                  <Text fontWeight="semibold" mb={1}>
                    Shared Ownership and Returns:
                  </Text>
                  <List.Root as="ul" pl={5} gap="1.5">
                    <List.Item>
                      Your ownership in the group investment is proportional to your contribution.
                    </List.Item>
                    <List.Item>
                      Returns will be distributed based on the percentage of your contribution.
                    </List.Item>
                  </List.Root>
                </List.Item>

                <List.Item>
                  <Text fontWeight="semibold" mb={1}>
                    Disbursement and Investment Rules:
                  </Text>
                  <List.Root as="ul" pl={5} gap="1.5">
                    <List.Item>
                      Funds will be disbursed according to the group's agreed timeline and purpose.
                    </List.Item>
                    <List.Item>
                      Any changes to the investment plan require approval from the group admin and
                      majority members.
                    </List.Item>
                  </List.Root>
                </List.Item>

                <List.Item>
                  <Text fontWeight="semibold" mb={1}>
                    Transparency and Accountability:
                  </Text>
                  <List.Root as="ul" pl={5} gap="1.5">
                    <List.Item>
                      All transactions will be logged and accessible to members for review.
                    </List.Item>
                    <List.Item>
                      Group members are expected to act in good faith and maintain confidentiality.
                    </List.Item>
                  </List.Root>
                </List.Item>

                <List.Item>
                  <Text fontWeight="semibold" mb={1}>
                    Dispute Resolution:
                  </Text>
                  <List.Root as="ul" pl={5} gap="1.5">
                    <List.Item>
                      Any disputes will be resolved through a group meeting facilitated by the
                      admin.
                    </List.Item>
                  </List.Root>
                </List.Item>
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
