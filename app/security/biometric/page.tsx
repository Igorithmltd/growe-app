// biometric/page.tsx
"use client";

import {
    Box,
    Button,
    Flex,
    Icon,
    Text,
    VStack,
    //   useToast,
} from "@chakra-ui/react";

import useShowToast from "@/src/hooks/useShowToast";
import { HiArrowLeft } from "react-icons/hi2";
import { BsFingerprint } from "react-icons/bs";
import { RiFingerprint2Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { HiOutlineChevronLeft } from "react-icons/hi";

export default function BiometricLoginSetup() {
    const router = useRouter();
    //   const toast = useToast();
    const showToast = useShowToast();

    const [touched, setTouched] = useState(false);
    const [scanning, setScanning] = useState(false);

    const handleTouch = () => {
        if (scanning) return;
        setTouched(true);
        setScanning(true);

        setTimeout(() => {
            showToast({
                title: "Biometric recognized",
                status: "success",
                duration: 1500,
            });
            router.push("/security/biometric/confirm");
        }, 2000);
    };

    return (
        <Box px={5} py={6} mx="auto">
            {/* Header */}
            <Flex align={"center"} mb={6} gap={3} >
                <HiOutlineChevronLeft size={"20px"} onClick={() => router.push("/security")} cursor="pointer" />
                <Text fontSize={"md"} color={"secondary"}>
                    Biometric Login Setup
                </Text>
            </Flex>

            {/* Description */}
            <Text display="flex" fontSize={["sm","md"]} color="bfgrey" mb={12} justifyContent="center">
                Quickly and securely access your account with biometric authentication.
                Set up fingerprint recognition for seamless login
            </Text>

            {/* Fingerprint Interaction */}
            <VStack spaceY={4} align="center" justify="center" mt={20} >
                <Icon
                    as={RiFingerprint2Line}
                    boxSize="140px"
                    color={touched ? "primary" : "gray.300"}
                    cursor="pointer"
                    onClick={handleTouch}
                />
                <Text fontSize="md" color="gray.600" pt={8}>
                    {scanning ? "Scanning in progress..." : "Place your finger on the sensor"}
                </Text>
            </VStack>
        </Box>
    );
}
