"use client";

import { Box, Flex, HStack, Spacer, Stack } from "@chakra-ui/react";
import { BackIcon } from "@/public/svgs";
import { usePathname, useRouter } from "next/navigation";
import KycCarousel from "@/src/layouts/kyc/carousel";
import { StyledText } from "@/src/components";
import { Suspense } from "react";

function KycLayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const isKycPage = pathname === "/kyc";
  const isSecond = pathname === "/kyc/nin" || pathname === "/kyc/bvn";

  const step = isKycPage ? 1 : isSecond ? 2 : 0;

  const handleBack = () => {
    if (isKycPage) {
      router.back();
    } else if (isSecond) {
      router.back();
    } else {
      router.push("/kyc");
    }
  };

  return (
    <Stack direction={{ base: "column", lg: "row" }}>
      <KycCarousel />
      <Spacer />
      <Box w={{ lg: "45%" }} px={{ lg: 10 }} py={{ lg: 6 }}>
        <HStack alignItems="center" spaceX={2} mt={{ base: 6, lg: "unset" }} mx={5}>
          <Box cursor="pointer" onClick={handleBack}>
            <BackIcon />
          </Box>

          <Flex w="90%">
            <Box h="7px" bg="primary" flex="1" borderLeftRadius="50px" />
            <Box h="7px" bg={isSecond ? "primary" : "#F8F8F8"} flex="1" />
            {/* <Box h="7px" bg={hasQuery ? "primary" : "#F8F8F8"} flex="1" borderRightRadius="50px" /> */}
          </Flex>

          <StyledText textWrap="nowrap" fontSize={{ base: "10px", md: "12px", lg: "14px" }}>
            Step {step} of 2
          </StyledText>
        </HStack>

        {children}
      </Box>
    </Stack>
  );
}

export default function KycLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Suspense>
      <KycLayoutContent>{children}</KycLayoutContent>
    </Suspense>
  );
}
