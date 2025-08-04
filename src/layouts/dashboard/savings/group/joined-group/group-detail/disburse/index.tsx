"use client";

import { BackIcon } from "@/public/svgs";
import { StyledButton, StyledText } from "@/src/components";
import { Badge, Avatar, Box, Checkbox, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { copyToClipboard } from "@/src/utils/helpers";
import useShowToast from "@/src/hooks/useShowToast";
import { useModal } from "@/src/contexts/ModalContext";
import { GroupInfoCard } from "@/src/layouts/dashboard/cards";

const GroupDetailsLayout = () => {
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
          w="full"
          maxW="md"
          border="1px"
          borderColor="gray.200"
          borderRadius="md"
          overflow="hidden"
        >
          {members.map((member, idx) => (
            <Flex
              key={idx}
              align="center"
              justify="space-between"
              p={4}
              borderBottom="1px solid"
              borderColor="gray.100"
              bg="black"
              color="white"
            >
              <Flex align="center" gap={3}>
                <Checkbox.Root defaultChecked>
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                </Checkbox.Root>
                <Avatar.Root size="md">
                  <Avatar.Fallback name={member.name} />
                  <Avatar.Image src={member.image} />
                </Avatar.Root>
                <Box>
                  <Text fontWeight="medium">{member.name}</Text>
                  <Badge colorScheme="yellow" borderRadius="md" mt={1}>
                    Pending
                  </Badge>
                </Box>
              </Flex>
              <Flex align="center" gap={2}>
                <Box textAlign="right">
                  <Text fontWeight="bold" color="green.300">
                    {member.amount}
                  </Text>
                  <Text fontSize="xs" color="gray.400">
                    Amount
                  </Text>
                </Box>
              </Flex>
            </Flex>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default GroupDetailsLayout;
