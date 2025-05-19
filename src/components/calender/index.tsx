// components/SingleDatePicker.tsx
"use client";

import { Box, Button, HStack, Text, VStack, useDisclosure } from "@chakra-ui/react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { useState } from "react";
import { StyledText } from "../text";
import { StyledButton } from "../button";

export function Calender() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const { onOpen, onClose } = useDisclosure();

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  return (
    <VStack spaceY={0} w="333px">
      {/* Header */}
      <Box w="full" bg="primary" p={4} color="white" borderTopRadius="md">
        <StyledText fontSize="sm" color="white">
          {selectedDate ? format(selectedDate, "yyyy") : "Select Date"}
        </StyledText>
        <StyledText fontSize="2xl" fontWeight="medium" color="white">
          {selectedDate ? format(selectedDate, "EEE, MMM d") : ""}
        </StyledText>
      </Box>

      {/* Calendar */}
      <Box p={4} py={2} w="full" bg="white" borderBottomRadius="md">
        <DayPicker
          navLayout="around"
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          disabled={{ before: new Date() }}
          classNames={{
            // month_caption: `text-[#454839] text-[10px]`,
            nav_button: "text-green-700 hover:text-green-500 transition-colors duration-200",
            nav_icon: "w-6 h-6 text-[red]",
            today: `border-[#9BAB69]`,
            selected: `bg-[#9BAB69] border-[#9BAB69] text-white rounded-full `,
          }}
        />

        {/* Footer Buttons */}
        <HStack justify="end" pt={4}>
          <StyledButton
            variant="ghost"
            bg="transparent"
            color="#C5C5C5"
            onClick={() => setSelectedDate(undefined)}
          >
            CANCEL
          </StyledButton>
          <StyledButton bg="transparent" color="primary" onClick={onClose}>
            OK
          </StyledButton>
        </HStack>
      </Box>
    </VStack>
  );
}
