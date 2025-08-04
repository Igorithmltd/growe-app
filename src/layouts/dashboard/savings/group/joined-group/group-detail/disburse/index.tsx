"use client";

import { BackIcon } from "@/public/svgs";
import { StyledButton, StyledText } from "@/src/components";
import { Badge, Avatar, Box, Checkbox, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import useShowToast from "@/src/hooks/useShowToast";
import { useModal } from "@/src/contexts/ModalContext";
import { GroupInfoCard } from "@/src/layouts/dashboard/cards";

const DisbursementLayout = () => {
  const router = useRouter();
  const toast = useShowToast();

  const { setIsGroupSettingsOpen } = useModal();

  const members = [
    { name: "Ben Victor", image: "/avatars/ben-victor.jpg", amount: "₦200K" },
    { name: "Goodluck Ben", image: "/avatars/goodluck-ben.jpg", amount: "₦200K" },
    { name: "Uche Mark", image: "/avatars/uche-mark.jpg", amount: "₦200K" },
    { name: "David Lookman", image: "/avatars/david-lookman1.jpg", amount: "₦200K" },
    { name: "David Lookman", image: "/avatars/david-lookman2.jpg", amount: "₦200K" },
    { name: "Chioma Charity", image: "/avatars/chioma-charity.jpg", amount: "₦200K" },
    { name: "Henry Jackson", image: "/avatars/henry-jackson.jpg", amount: "₦200K" },
  ];

  return (
    <Box px={{ base: 3, md: 6 }} py={{ base: 5, lg: 10 }} w={{ lg: "65%" }} mx="auto">
      <HStack spaceX={3}>
        <Box onClick={() => router.back()}>
          <BackIcon />
        </Box>
        <StyledText fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" color="secondary">
          Disburse Funds to Group Members
        </StyledText>
      </HStack>

      <VStack align="stretch" spaceY={8} mt={14}>
        <GroupInfoCard
          title="Education Savings Group"
          daysLeft={28}
          members={30}
          percentageCompletion={100}
          savingsPerMember="₦200K"
          totalSavings="₦700K"
          interest={10}
          image="/images/group/3.jpg"
        />

        <VStack
          align="stretch"
          spaceY={0}
          border="1px"
          borderColor="gray.200"
          borderRadius="md"
          overflow="hidden"
        >
          <Text fontWeight="normal" fontSize={{ base: "sm", md: "md" }} color="secondary">
            Members
          </Text>

          {members.map((member, idx) => (
            <Flex
              key={idx}
              align="center"
              justify="space-between"
              w="full"
              p={4}
              borderBottom="1px solid"
              borderColor="gray.200"
              _last={{ borderBottom: "none" }}
            >
              <Flex align="center" gap={4} cursor="pointer">
                <Checkbox.Root cursor="pointer">
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                </Checkbox.Root>
                <Avatar.Root size="lg">
                  <Avatar.Fallback name={member.name} />
                  <Avatar.Image src={member.image} />
                </Avatar.Root>
                <Box>
                  <Text
                    fontWeight="normal"
                    fontSize={{ base: "sm", md: "md" }}
                    color="secondary"
                    mb={2}
                  >
                    {member.name}
                  </Text>
                  <Badge colorPalette="orange" borderRadius="md" mt={1}>
                    Pending
                  </Badge>
                </Box>
              </Flex>
              <Flex align="center" gap={2}>
                <Box textAlign="right">
                  <Text fontSize={{ base: "sm", md: "md" }} color="primary" mb={2}>
                    {member.amount}
                  </Text>
                  <Text fontSize={{ base: "2xs", md: "xs" }} color="bfgrey">
                    Amount
                  </Text>
                </Box>
              </Flex>
            </Flex>
          ))}
        </VStack>

        <StyledButton
          type="button"
          px={8}
          fontSize={{ base: "sm", md: "md" }}
        >
          Initiate Payment
        </StyledButton>
      </VStack>
    </Box>
  );
};

export default DisbursementLayout;
