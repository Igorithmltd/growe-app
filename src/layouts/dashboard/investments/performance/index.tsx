"use client";

import { BackIcon } from "@/public/svgs";
import { StyledText } from "@/src/components";
import { Box, Text, Grid, HStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { SummaryCard } from "../../cards";
import { motion } from "framer-motion";
import { useState } from "react";
import CalendarModal from "../../savings/modals/CalenderModal";
import { useModal } from "@/src/contexts/ModalContext";
import PerformanceOverview from "./performance-overview";
import PortfolioAllocation from "./portfolio-allocation";
import TransactionHistory from "./transaction-history";

const MotionBox = motion(Box);

const data = [
  { name: "Jan", value: 45000 },
  { name: "Feb", value: 30000 },
  { name: "Mar", value: 60000 },
  { name: "Apr", value: 72000 },
  { name: "May", value: 65000 },
  { name: "Jun", value: 70000 },
];

const pieData = [
  { name: "Farmcrowdy Maize Farming investment", value: 60, color: "#3DBBFF" },
  { name: "Enviable Transport", value: 40, color: "#FF8A80" },
];

const transactionData = [
  {
    name: "Farmcrowdy Maize Farming",
    type: "Investment",
    date: "Jan 12th, 2025",
    value: 2000000,
  },
  {
    name: "Farmcrowdy Maize Farming",
    type: "Return",
    date: "Feb 1st, 2025",
    value: 400000,
  },
  {
    name: "Enviable Transport",
    type: "Investment",
    date: "Feb 1st, 2025",
    value: 100000,
  },
];

const tabs = ["Performance overview", "Portfolio Allocation", "Transaction History"];

export default function InvestmentPerformance() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("Performance overview");

  const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });

  const [selecting, setSelecting] = useState<"start" | "end" | null>(null);

  const { setIsCalendarOpen } = useModal();

  const handleBack = () => router.back();

  return (
    <Box px={{ md: 6 }} py={{ base: 5, lg: 10 }} w={{ lg: "65%" }} mx="auto">
      {/* Header */}
      <Box display="flex" gap={4} alignItems="center" mt={{ base: 6, lg: "unset" }}>
        <Box cursor="pointer" onClick={handleBack}>
          <BackIcon />
        </Box>
        <StyledText fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" color="secondary">
          Investment Performance
        </StyledText>
      </Box>

      {/* Date Range */}
      <HStack spaceX={4} my={6}>
        <Box
          onClick={() => {
            setSelecting("start");
            setIsCalendarOpen(true);
          }}
          cursor="pointer"
          bg="#F8F8F8"
          p={4}
          borderRadius="md"
          border="1px solid #9BAB69"
          flex={1}
        >
          <Text color="secondary" fontWeight="medium">
            {dateRange.start ? dateRange.start.toLocaleDateString() : "Start date"}
          </Text>
        </Box>

        <Box
          onClick={() => {
            setSelecting("end");
            setIsCalendarOpen(true);
          }}
          cursor="pointer"
          bg="#F8F8F8"
          p={4}
          borderRadius="md"
          border="1px solid #9BAB69"
          flex={1}
        >
          <Text color="secondary" fontWeight="medium">
            {dateRange.end ? dateRange.end.toLocaleDateString() : "End date"}
          </Text>
        </Box>
      </HStack>

      {/* Summary Cards */}
      <Grid templateColumns="repeat(2, 1fr)" gap={4} mb={4}>
        <SummaryCard title="Total Investment" value="₦2,100,000" change="+8.7% Overall" />
        <SummaryCard title="Total Returns" value="₦400,000" change="+2.1% This Month" />
        <SummaryCard title="Active Investments" value="2" subtitle="Across 2 Groups" />
        <SummaryCard
          title="Next Maturity"
          value="15 Days"
          subtitle="Farmcrowdy Maize Farming investment"
        />
      </Grid>

      {/* Tabs */}
      <HStack
        mb={6}
        mt={6}
        align="center"
        p={2}
        bg="white"
        boxShadow="xs"
        borderRadius="full"
        w={{ md: "360px", lg: "540px" }}
        mx="auto"
        justifyContent="space-between"
      >
        {tabs.map((tab) => {
          const isSelected = selectedTab === tab;
          return (
            <MotionBox
              key={tab}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              bg={isSelected ? "bluelight" : "transparent"}
              textAlign="center"
              py={{ base: 2, md: 4 }}
              w="100%"
              borderRadius="full"
              border={isSelected ? "1px solid" : "unset"}
              borderColor="#F8F8F8"
              cursor="pointer"
              onClick={() => setSelectedTab(tab)}
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
                {tab}
              </StyledText>
            </MotionBox>
          );
        })}
      </HStack>

      {/* Tab Content */}
      {selectedTab === "Performance overview" && <PerformanceOverview data={data} />}

      {selectedTab === "Portfolio Allocation" && <PortfolioAllocation data={pieData} />}

      {selectedTab === "Transaction History" && <TransactionHistory data={transactionData} />}

      <CalendarModal
        selectedDate={(selecting === "start" ? dateRange.start : dateRange.end) ?? undefined}
        onSelect={(date) => {
          if (!date) return;

          setDateRange((prev) => {
            if (selecting === "start") {
              return { ...prev, start: date };
            } else if (selecting === "end") {
              return { ...prev, end: date };
            }
            return prev;
          });

          setSelecting(null);
        }}
        onClear={() => {
          setDateRange({ start: null, end: null });
          setSelecting(null);
        }}
      />
    </Box>
  );
}
