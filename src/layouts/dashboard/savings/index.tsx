"use client";

import { StyledText } from "@/src/components";
import { Box, HStack } from "@chakra-ui/react";
import PersonalSavings from "./personal";
import { motion } from "framer-motion";
import { useState } from "react";
import { GroupIcon, SavingsIcon } from "@/public/svgs";
import GroupSavings from "./group";
import QuickSavingLayout from "./personal/quick-saving";
import SavingGoalLayout from "./personal/savings-goal";
import SummaryLayout from "./personal/savings-goal/summary";
import SavingDetailsLayout from "./personal/savings-detail";

const MotionBox = motion.create(Box);

const SavingsLayout = () => {
  const [isPersonal, setIsPersonal] = useState(true);

  return (
    <Box p={2}>
      <StyledText fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" color="secondary">
        My Savings
      </StyledText>

      <HStack
        mb={6}
        mt={6}
        align="center"
        p={2}
        bg="white"
        boxShadow="xs"
        borderRadius="full"
        w={{ md: "360px" }}
        mx="auto"
        justifyContent="space-between"
      >
        {[
          { name: "Personal Savings", icon: <SavingsIcon /> },
          { name: "Group Savings", icon: <GroupIcon /> },
        ].map((item) => {
          const isSelected =
            (item.name === "Personal Savings" && isPersonal) ||
            (item.name === "Group Savings" && !isPersonal);
          return (
            <MotionBox
              key={item.name}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              bg={isSelected ? "bluelight" : "transparent"}
              textAlign="center"
              py={{ base: 2, md: 4 }}
              w="50%"
              borderRadius="full"
              border={isSelected ? "1px solid" : "unset"}
              borderColor="#F8F8F8"
              cursor="pointer"
              onClick={() => setIsPersonal(item.name === "Personal Savings")}
            >
              <StyledText
                color={isSelected ? "primary" : "#8F8F8F"}
                fontSize={{ base: "sm", md: "md" }}
                fontWeight="normal"
                display="flex"
                gap={2}
                alignItems="center"
                justifyContent="center"
              >
                <Box as="span" fontSize="20px">
                  {item.icon}
                </Box>
                {item.name}
              </StyledText>
            </MotionBox>
          );
        })}
      </HStack>

      <Box px={{ xl: 50 }}>
        <MotionBox
          key={isPersonal ? "personal" : "proup"}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.5 }}
        >
          {isPersonal ? <PersonalSavings /> : <GroupSavings />}
        </MotionBox>
      </Box>
      <SummaryLayout />
      <SavingDetailsLayout />
    </Box>
  );
};

export default SavingsLayout;
