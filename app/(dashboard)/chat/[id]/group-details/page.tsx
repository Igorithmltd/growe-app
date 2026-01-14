"use client";

import {
  Box,
  Text,
  Flex,
  VStack,
  HStack,
  Button,
  Image,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { BackIcon } from "@/public/svgs";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

const groupRules = [
  "Contributions must be made on time as agreed by the group.",
  "Funds are strictly for educational purposes and cannot be used for other needs.",
  "Respect all group members and their opinions.",
  "Early withdrawal is allowed but incurs a 5% breaking fee.",
  "Any changes to the group’s rules or goals must be agreed upon by all members.",
];

const groupMembers = [
  { name: "Ben Victor", joined: true, time: "15 hours ago", img: "/images/profile-Image.jpeg" },
  { name: "Goodluck Ben", joined: true, time: "15 hours ago", img: "/images/profile-Image.jpeg" },
  { name: "Uche Mark", joined: true, time: "15 hours ago", img: "/images/profile-Image.jpeg" },
  { name: "David Lookman", joined: true, time: "15 hours ago", img: "/images/profile-Image.jpeg" },
  { name: "Adetutu Gift", joined: true, time: "15 hours ago", img: "/images/profile-Image.jpeg" },
  { name: "Chioma Charity", joined: true, time: "15 hours ago", img: "/images/profile-Image.jpeg" },
  { name: "Henry Jackson", joined: true, time: "15 hours ago", img: "/images/profile-Image.jpeg" },
  { name: "Mary Anne", joined: true, time: "12 hours ago", img: "/images/profile-Image.jpeg" },
  { name: "Chuka Bright", joined: true, time: "12 hours ago", img: "/images/profile-Image.jpeg" },
  { name: "Ifunanya Hope", joined: true, time: "12 hours ago", img: "/images/profile-Image.jpeg" },
  { name: "Blessing Ojo", joined: true, time: "12 hours ago", img: "/images/profile-Image.jpeg" },
  { name: "Desmond Peters", joined: true, time: "12 hours ago", img: "/images/profile-Image.jpeg" },
  { name: "Ibrahim Musa", joined: true, time: "12 hours ago", img: "/images/profile-Image.jpeg" },
  { name: "Favour Oke", joined: true, time: "12 hours ago", img: "/images/profile-Image.jpeg" },
];

const MotionBox = motion(Box);
const initialVisible = 6;

const GroupDetails = () => {
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();

  const handleToggle = () => setShowAll((prev) => !prev);

  return (
    <Box px={1} py={6} maxW="5xl" mx="auto">
        <BackIcon cursor="pointer" onClick={() => router.back()} />
      <Flex justify="center" mb={4}>
        <Image src="/images/group/3.jpg" alt="Group Icon" boxSize="80px" borderRadius="full" />
      </Flex>

      <Text textAlign="center" fontSize="xl" fontWeight="semibold">
        Educational Savings Group
      </Text>
      <Text textAlign="center" fontSize="sm" color="gray.500" mt={1}>
        {groupMembers.length} group members
      </Text>

      {/* Description */}
      <Box mt={6}>
        <Text fontWeight="medium" mb={2}>
          Group description
        </Text>
        <Text fontSize="sm" color="gray.700" mb={2}>
          Hi there
        </Text>
        <Text fontSize="sm" color="gray.700" mb={4}>
          This Educational Savings Group is dedicated to helping members save collectively
          for tuition, certifications, and other educational expenses. Together, we make
          learning more affordable and accessible for everyone.
        </Text>

        <Text fontWeight="medium" mb={2}>
          Group Rules:
        </Text>
        <VStack spaceY={2} align="start">
          {groupRules.map((rule, idx) => (
            <HStack key={idx} align="start">
              <Text fontSize="sm" color="gray.600">
                {idx + 1}.
              </Text>
              <Text fontSize="sm" color="gray.600">
                {rule}
              </Text>
            </HStack>
          ))}
        </VStack>
      </Box>

      <Box my={6} height="1px" bg="gray.200" w="100%" />

      {/* Members */}
      <Box>
        <Text fontWeight="medium" mb={4}>
          Group Members
        </Text>
        <VStack align="stretch">
          {[...groupMembers.slice(0, initialVisible)].map((member, idx) => (
            <Flex
              key={idx}
              justify="space-between"
              align="center"
              p={3}
              bg="gray.50"
              rounded="md"
            //   shadow="sm"
            >
              <HStack>
                <Image
                  src={member.img}
                  alt={member.name}
                  boxSize="40px"
                  borderRadius="full"
                  border="1px solid #ddd"
                />
                <Box>
                  <Text fontWeight="medium">{member.name}</Text>
                  <Text fontSize="xs" color="gray.500">
                    {member.time}
                  </Text>
                </Box>
              </HStack>
              <Text fontSize="sm" color="primary" fontWeight="semibold">
                Joined
              </Text>
            </Flex>
          ))}

          {/* Animated additional members */}
          <AnimatePresence>
            {showAll && groupMembers.length > initialVisible && (
              <MotionBox
                key="more-members"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                overflow="hidden"
              >
                <VStack align={"stretch"}>
                  {groupMembers.slice(initialVisible).map((member, idx) => (
                    <Flex
                      key={idx}
                      justify="space-between"
                      align="center"
                      p={3}
                      bg="gray.50"
                      rounded="md"
                    //   shadow="sm"
                    >
                      <HStack>
                        <Image
                          src={member.img}
                          alt={member.name}
                          boxSize="40px"
                          borderRadius="full"
                          border="1px solid #ddd"
                        />
                        <Box>
                          <Text fontWeight="medium">{member.name}</Text>
                          <Text fontSize="xs" color="gray.500">
                            {member.time}
                          </Text>
                        </Box>
                      </HStack>
                      <Text fontSize="sm" color="primary" fontWeight="semibold">
                        Joined
                      </Text>
                    </Flex>
                  ))}
                </VStack>
              </MotionBox>
            )}
          </AnimatePresence>

          <Flex justify="center">
            <Button
              onClick={handleToggle}
              variant="ghost"
              colorScheme="green"
              fontWeight="medium"
              size="sm"
              color={"primary"}
            >
              {showAll ? <ChevronUpIcon mr={2} /> : <ChevronDownIcon mr={2} />}
              {showAll
                ? "Show less"
                : `View all (${groupMembers.length - initialVisible} more)`}
            </Button>
          </Flex>
        </VStack>
      </Box>
    </Box>
  );
};

export default GroupDetails;
