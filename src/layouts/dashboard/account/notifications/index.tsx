"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Text, Flex, VStack, HStack, Switch } from "@chakra-ui/react";
import { BackIcon } from "@/public/svgs";
import { StyledButton, StyledText } from "@/src/components";

export default function NotificationPreferencesLayout() {
  const router = useRouter();

  const [preferences, setPreferences] = useState({
    savingUpdates: true,
    investmentAlerts: false,
    groupActivities: true,
    marketingEmails: true,
    referralRewards: true,
    pushNotifications: false,
    emailNotifications: true,
    smsNotifications: false,
  });

  type PreferenceKey = keyof typeof preferences;

  const togglePreference = (key: PreferenceKey) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const sections: {
    title: string;
    items: {
      label: string;
      description: string;
      key: PreferenceKey;
    }[];
  }[] = [
    {
      title: "General Notification",
      items: [
        {
          label: "Saving Updates",
          description: "Get updates on savings contributions and progress.",
          key: "savingUpdates",
        },
        {
          label: "Investment Alerts",
          description: "Receive alerts for investment maturity, new opportunities, and returns.",
          key: "investmentAlerts",
        },
        {
          label: "Group Activities",
          description: "Stay informed about group savings and disbursements.",
          key: "groupActivities",
        },
      ],
    },
    {
      title: "Promotional Notifications",
      items: [
        {
          label: "Marketing Emails",
          description: "Get special offers, tips, and app updates.",
          key: "marketingEmails",
        },
        {
          label: "Referral Rewards",
          description: "Notifications for bonuses earned through referrals.",
          key: "referralRewards",
        },
      ],
    },
    {
      title: "Delivery Notification",
      items: [
        {
          label: "Push Notifications",
          description: "Receive alerts directly on your phone.",
          key: "pushNotifications",
        },
        {
          label: "Email Notifications",
          description: "Get updates sent to your registered email.",
          key: "emailNotifications",
        },
        {
          label: "SMS Notifications",
          description: "Receive alerts via text message.",
          key: "smsNotifications",
        },
      ],
    },
  ];

  const handleBack = () => router.back();

  return (
    <Box px={4} py={{ base: 4, lg: 10 }} maxW="600px" mx="auto">
      <HStack gap={4} alignItems="center" mb={6}>
        <Box cursor="pointer" onClick={handleBack}>
          <BackIcon />
        </Box>
        <StyledText fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" color="secondary">
          Notification Preference
        </StyledText>
      </HStack>

      <VStack align="stretch" spaceY={6}>
        {sections.map((section) => (
          <Box key={section.title}>
            <Text fontSize={{ base: "lg", md: "2xl" }} color="secondary" mb={4}>
              {section.title}
            </Text>

            <VStack spaceY={4} align="stretch">
              {section.items.map(({ label, description, key }) => (
                <Flex
                  key={key}
                  justify="space-between"
                  align="center"
                  p={4}
                  bg="white"
                  rounded="10px"
                >
                  <Box>
                    <Text fontSize={{ base: "sm", md: "md" }} color="secondary">
                      {label}
                    </Text>
                    <Text fontSize={{ base: "xs", md: "sm" }} color="bfgrey" mt={2}>
                      {description}
                    </Text>
                  </Box>

                  <Switch.Root
                    checked={preferences[key]}
                    onCheckedChange={() => togglePreference(key)}
                  >
                    <Switch.HiddenInput />
                    <Switch.Control
                      width="42px"
                      height="24px"
                      bg={preferences[key] ? "primary" : "gray.300"}
                      borderRadius="full"
                      transition="background 0.2s"
                    >
                      <Switch.Thumb
                        bg="white"
                        boxSize="24px"
                        borderRadius="full"
                        transform={preferences[key] ? "translateX(2px)" : "translateX(1px)"}
                        transition="transform 0.2s"
                      />
                    </Switch.Control>
                  </Switch.Root>
                </Flex>
              ))}
            </VStack>
          </Box>
        ))}
      </VStack>

      <StyledButton mt={8} width="full" size="lg" onClick={() => console.log(preferences)}>
        Save Notification Preferences
      </StyledButton>
    </Box>
  );
}
