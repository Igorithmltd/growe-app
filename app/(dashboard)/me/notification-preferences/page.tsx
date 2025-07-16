/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { Box, Text, Flex, VStack, Button } from "@chakra-ui/react";
import { useState } from "react";

export default function NotificationPreferencesPage() {
  const [preferences, setPreferences] = useState({
    savingUpdates: true,
    investmentAlerts: false,
    groupActivities: true,
    marketingEmails: true,
    referralRewards: true,
    pushNotifications: false,
  });

  type PreferenceKey = keyof typeof preferences;

  // const togglePreference = (key: PreferenceKey) => {
  //   setPreferences((prev) => ({
  //     ...prev,
  //     [key]: !prev[key],
  //   }));
  // };

  const renderToggle = (label: string, description: string, stateKey: keyof typeof preferences) => (
    <Flex justify="space-between" align="center" py={4}>
      <Box>
        <Text fontWeight="semibold" mb={1}>{label}</Text>
        <Text fontSize="sm" color="gray.500">{description}</Text>
      </Box>
      {/* <Switch
        colorScheme="green"
        isChecked={preferences[stateKey]}
        onChange={() => togglePreference(stateKey)}
      /> */}
    </Flex>
  );

  return (
    <Box px={4} py={6}>
      <Text fontSize="xl" fontWeight="bold" mb={6}>
        Notification Preference
      </Text>

      <VStack align="stretch" spaceX={4}>
        <Text fontWeight="semibold" color="gray.600">General Notification</Text>
        {renderToggle("Saving Updates", "Get updates on savings contributions and progress.", "savingUpdates")}
        {renderToggle("Investment Alerts", "Receive alerts for investment maturity, new opportunities, and returns.", "investmentAlerts")}
        {renderToggle("Group Activities", "Stay informed about group savings and disbursements.", "groupActivities")}

        {/* <Divider borderColor="gray.200" /> */}

        <Text fontWeight="semibold" color="gray.600">Promotional Notifications</Text>
        {renderToggle("Marketing Emails", "Get special offers, tips, and app updates.", "marketingEmails")}
        {renderToggle("Referral Rewards", "Notifications for bonuses earned through referrals.", "referralRewards")}

        {/* <Divider borderColor="gray.200" /> */}

        <Text fontWeight="semibold" color="gray.600">Delivery Notification</Text>
        {renderToggle("Push Notifications", "Receive alerts directly on your phone", "pushNotifications")}
      </VStack>

      <Button
        mt={8}
        bg="green.400"
        color="white"
        width="full"
        size="lg"
        borderRadius="md"
        _hover={{ bg: "green.500" }}
      >
        Save Notification Preferences
      </Button>
    </Box>
  );
}
