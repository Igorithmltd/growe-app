// components/SingleDatePicker.tsx
'use client';

import { Box, Button, HStack, Text, VStack, useDisclosure } from '@chakra-ui/react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import { useState } from 'react';

export function Calender() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const {  onOpen, onClose } = useDisclosure();

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  return (
    <VStack spaceY={4} w="full">
      {/* Header */}
      <Box w="full" bg="green.300" p={4} color="white" borderTopRadius="md">
        <Text fontSize="sm">{selectedDate ? format(selectedDate, 'yyyy') : 'Select Date'}</Text>
        <Text fontSize="2xl" fontWeight="bold">
          {selectedDate ? format(selectedDate, 'EEE, MMM d') : ''}
        </Text>
      </Box>

      {/* Calendar */}
      <Box p={4} pt={0} w="full" bg="white" borderBottomRadius="md">
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          disabled={{ before: new Date() }} // Disable past dates
          styles={{
            caption: { textAlign: 'center', fontWeight: 'bold' },
            day_selected: {
              backgroundColor: '#A3BF6C', // green.300
              color: 'white',
              borderRadius: '100%',
            },
            day_today: {
              fontWeight: 'bold',
              borderBottom: '2px solid #A3BF6C',
            },
          }}
        />

        {/* Footer Buttons */}
        <HStack justify="space-between" pt={4}>
          <Button variant="ghost" color="gray.400" onClick={() => setSelectedDate(undefined)}>
            Cancel
          </Button>
          <Button colorScheme="green" onClick={onClose}>
            OK
          </Button>
        </HStack>
      </Box>
    </VStack>
  );
}
