"use client";

import { StyledText } from "@/src/components";
import { Box, VStack, HStack } from "@chakra-ui/react";
import { GoBell } from "react-icons/go";
import { AccountCard, ActiveSavingsCard, GroupCard, MessageCard, SavingsCard } from "../cards";
import { MdChevronRight } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa6";
import { useUserDetailsStore } from "@/src/stores/user-details";
import { useRouter } from "next/navigation";

const DashboardHome = () => {
  const router = useRouter();
  const user = useUserDetailsStore((state) => state.user);

  return (
    <VStack w="full" align="stretch" spaceY={{ base: 6, md: 8 }} p={2}>
      {/* Header with welcome message */}
      <HStack justify="space-between" align="center">
        <VStack align="flex-start" spaceY={0}>
          <StyledText fontSize={{ base: "lg", md: "xl" }} fontWeight="medium" color="primary">
            Hello,{""} {user?.firstName}
          </StyledText>
          <StyledText fontSize={{ base: "sm", md: "md" }} fontWeight="normal" color="secondary">
            Welcome back
          </StyledText>
        </VStack>

        <Box boxSize={{ base: "22px", md: "24px" }} color="bfgrey">
          <GoBell size="100%" />
        </Box>
      </HStack>

      <Box spaceY={{ base: 6, md: 8 }} px={{ xl: 50 }}>
        {/* Total savings section */}
        <SavingsCard
          title="Total Savings"
          amount="0.00"
          interest="0%"
          bgImage="url('/images/card-image.webp')"
          notes={
            <HStack as="span">
              Financial Notes <FaChevronRight />
            </HStack>
          }
          buttonText="View Savings"
          buttonAction={() => {}}
          notesAction={() => router.push("/finance-notes")}
        />

        {/* Account info */}

        <HStack
          spaceX={{ base: 2, md: 4 }}
          overflowX="auto"
          css={{
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE 10+
            "&::-webkit-scrollbar": {
              display: "none", // Chrome, Safari
            },
          }}
        >
          <AccountCard
            accountName="John Doe"
            accountNumber="0123456789"
            bank="Monniepoint Microfinance Bank"
          />

          <AccountCard
            accountName="John Doe"
            accountNumber="0123456789"
            bank="Monniepoint Microfinance Bank"
            bg="#F6EDD9"
          />
        </HStack>

        {/* Recent messages section */}
        <Box>
          <HStack justify="space-between">
            <StyledText
              fontSize={{ base: "md", md: "lg", lg: "2xl" }}
              fontWeight="medium"
              color="secondary"
            >
              Recent Messages
            </StyledText>

            <MdChevronRight size={30} fontWeight={400} cursor="pointer" color="secondary" />
          </HStack>

          <VStack align="stretch" spaceY={4} mt={6}>
            <MessageCard
              timeAgo="2m ago"
              title="Family Savings"
              message="Payment for this month has been received"
            />

            <MessageCard
              timeAgo="1hr ago"
              title="Investment Group"
              message="New investment opportunity available"
            />
          </VStack>
        </Box>

        {/* Active savings */}
        <Box>
          <HStack justify="space-between">
            <StyledText
              fontSize={{ base: "md", md: "lg", lg: "2xl" }}
              fontWeight="medium"
              color="secondary"
            >
              Active Savings
            </StyledText>

            <MdChevronRight size={30} fontWeight={400} cursor="pointer" color="secondary" />
          </HStack>

          <VStack align="stretch" spaceY={4} mt={6}>
            <ActiveSavingsCard amount="800,000" name="Rent" plan="6 months" value={90} />
          </VStack>
        </Box>

        <Box>
          <HStack justify="space-between">
            <StyledText
              fontSize={{ base: "md", md: "lg", lg: "2xl" }}
              fontWeight="medium"
              color="secondary"
            >
              Promoted Groups
            </StyledText>

            <MdChevronRight size={30} fontWeight={400} cursor="pointer" color="secondary" />
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
            <GroupCard
              title="Education Savings Group"
              maxMemberAllowed={30}
              membersJoined={13}
              amountEach="10K"
              image="/images/group/3.jpg"
            />
            <GroupCard
              title="Valentine’s Day Celebrations"
              maxMemberAllowed={20}
              membersJoined={18}
              amountEach="50K"
              image="/images/group/2.jpg"
            />
            <GroupCard
              title="Travel Savings Group"
              maxMemberAllowed={10}
              membersJoined={7}
              amountEach="100K"
              image="/images/group/1.jpg"
            />
            <GroupCard
              title="Education Savings Group"
              maxMemberAllowed={30}
              membersJoined={13}
              amountEach="10K"
              image="/images/group/3.jpg"
            />
            <GroupCard
              title="Valentine’s Day Celebrations"
              maxMemberAllowed={20}
              membersJoined={18}
              amountEach="50K"
              image="/images/group/2.jpg"
            />
            <GroupCard
              title="Travel Savings Group"
              maxMemberAllowed={10}
              membersJoined={7}
              amountEach="100K"
              image="/images/group/1.jpg"
            />
          </HStack>
        </Box>
      </Box>
    </VStack>
  );
};

export default DashboardHome;
