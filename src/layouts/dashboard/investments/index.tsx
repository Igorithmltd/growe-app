"use client";

import { StyledText } from "@/src/components";
import { Box, Flex, HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import PersonalInvestments from "./personal";
import { InvestmentCard, PromoCard } from "../cards";
import { MdChevronRight } from "react-icons/md";
import { useRouter } from "next/navigation";

const MotionBox = motion.create(Box);

const InvestmentLayout = () => {
  const router = useRouter();

  const [isPersonal, setIsPersonal] = useState(true);

  return (
    <Box p={2} px={{ xl: 50 }}>
      <StyledText fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" color="secondary">
        My Investments
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
        {["Personal Ivestments", "Group Investments", ,].map((item) => {
          const isSelected =
            (item === "Personal Ivestments" && isPersonal) ||
            (item === "Group Investments" && !isPersonal);
          return (
            <MotionBox
              key={item}
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
              onClick={() => setIsPersonal(item === "Personal Ivestments")}
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
                {item}
              </StyledText>
            </MotionBox>
          );
        })}
      </HStack>

      <Box>
        <MotionBox
          key={isPersonal ? "personal" : "proup"}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.5 }}
        >
          {isPersonal ? <PersonalInvestments /> : "<GroupSavings />}"}
        </MotionBox>
      </Box>

      <Box mt={6}>
        <HStack justify="space-between">
          <StyledText
            fontSize={{ base: "md", md: "lg", lg: "xl" }}
            fontWeight="medium"
            color="secondary"
          >
            Suggested Investments
          </StyledText>

          <Flex
            align="center"
            color="primary"
            cursor="pointer"
            onClick={() => router.push("/investments/suggested-investments")}
          >
            <StyledText fontSize={{ base: "sm", md: "md" }} fontWeight="medium" color="inherit">
              Find more
            </StyledText>
            <MdChevronRight size={30} fontWeight={400} cursor="pointer" color="secondary" />
          </Flex>
        </HStack>

        <HStack
          spaceX={{ base: 2, md: 4 }}
          mt={6}
          overflowX="auto"
          css={{
            // "@media (min-width: 62em)": {
            //   // 62em = 992px = lg breakpoint
            //   "&::-webkit-scrollbar": {
            //     display: "initial",
            //   },
            //   scrollbarWidth: "auto",
            //   msOverflowStyle: "auto",
            // },
            "@media (max-width: 61.99em)": {
              "&::-webkit-scrollbar": {
                display: "none",
              },
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE 10+
            },
          }}
        >
          <InvestmentCard
            name="Enviable Transport"
            annualReturn={20}
            image="/images/investments/1.png"
          />
          <InvestmentCard
            name="Enviable Transport"
            annualReturn={20}
            image="/images/investments/2.png"
          />
          <InvestmentCard
            name="Enviable Transport"
            annualReturn={20}
            image="/images/investments/3.png"
          />
        </HStack>
      </Box>

      <PromoCard />
    </Box>
  );
};

export default InvestmentLayout;
