import { StyledText } from "@/src/components";
import { Box, VStack, Text, HStack } from "@chakra-ui/react";
import Link from "next/link";
import { CiLock } from "react-icons/ci";
import { MdOutlineLock } from "react-icons/md";

interface VerificationOptionProps {
  title: string;
  subtitle: string;
  label: string;
}

const VerificationOption = ({ title, subtitle, label }: VerificationOptionProps) => {
  return (
    <Box w="full" px={4} py={6} borderRadius="lg" bg="white" boxShadow="sm">
      <Link href={`/kyc/${label.toLowerCase()}`} style={{ textDecoration: "none" }}>
        <StyledText
          smVariant="p14-medium"
          mdVariant="p14-medium"
          variant="p16-medium"
          color="secondary"
        >
          {label}{" "}
          <Text as="span" fontWeight="normal" color="grey">
            ({title})
          </Text>
        </StyledText>
        <StyledText smVariant="p12-regular" mdVariant="p12-regular" variant="p14-regular" mt={4}>
          {subtitle}
        </StyledText>
      </Link>
    </Box>
  );
};

const KycPage = () => {
  return (
    <Box px={6} py={10} mx="auto" mt={{ base: 6, lg: "80px" }}>
      <VStack spaceY={6} align="stretch">
        <Box>
          <StyledText
            fontSize={{ base: "16px", md: "21px", lg: "24px" }}
            color="secondary"
            fontWeight="semibold"
          >
            Identity Verification
          </StyledText>
          <StyledText fontSize={{ base: "12px", md: "14px", lg: "16px" }} mt={3}>
            To protect your account and comply with regulations, we need to verify your identity
          </StyledText>
        </Box>

        <VStack spaceY={6}>
          <VerificationOption
            title="Bank Verification Number"
            subtitle="Quick and secure verification using your 11-digit BVN"
            label="BVN"
          />

          <VerificationOption
            title="National Identification Number"
            subtitle="Verify your National Identification Number"
            label="NIN"
          />
        </VStack>

        <HStack mt={4} justify="center">
          <MdOutlineLock color="#9BAB69" size="18px" />
          <StyledText smVariant="p12-regular" mdVariant="p12-regular" variant="p14-regular">
            Your data is encrypted and securely stored
          </StyledText>
        </HStack>
      </VStack>
    </Box>
  );
};

export default KycPage;
