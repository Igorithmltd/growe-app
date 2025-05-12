"use client";

import { StyledText } from "@/src/components";
import { Box, HStack } from "@chakra-ui/react";
import PersonalSavings from "./personal";
import { motion } from "framer-motion";
import { useState } from "react";
import { SavingsIcon } from "@/public/svgs";

const MotionBox = motion.create(Box);

const SavingsLayout = () => {
  const [isPersonal, setIsPersonal] = useState(true);

  return (
    <Box p={2}>
      <StyledText fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" color="secondary">
        My Savings
      </StyledText>

      <HStack
        mb={{ base: 8, md: 12 }}
        align="center"
        p={2}
        bg="white"
        boxShadow="xs"
        borderRadius="full"
        w={{ md: "360px" }}
        mx="auto"
        justifyContent="space-between"
      >
        {["Personal Savings", "Group Savings"].map((item) => {
          // Determine if the current item matches the `isCustomer` state
          const isSelected =
            (item === "Personal Savings" && isPersonal) ||
            (item === "Group Savings" && !isPersonal);
          return (
            <MotionBox
              key={item}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              bg={isSelected ? "#FDFDFD" : "transparent"}
              textAlign="center"
              py={{ base: 2, md: 4 }}
              w="50%"
              borderRadius="full"
              border={isSelected ? "1px solid" : "unset"}
              borderColor="#F8F8F8"
              cursor="pointer"
              onClick={() => setIsPersonal(item === "Personal Savings")}
            >
              <StyledText
                color="primary"
                fontSize={{ base: "sm", md: "md" }}
                fontWeight="normal"
                display="flex"
                gap={2}
                alignItems="center"
                justifyContent="center"
              >
                <Box as="span" fontSize="20px">
                  <SavingsIcon />
                </Box>
                {item}
              </StyledText>
            </MotionBox>
          );
        })}
      </HStack>

      <PersonalSavings />
    </Box>
  );
};

export default SavingsLayout;
