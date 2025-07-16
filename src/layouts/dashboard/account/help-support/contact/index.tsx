"use client";

import { Box, Text, VStack, Flex, Icon, Link, useBreakpointValue, HStack } from "@chakra-ui/react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { PiPhoneCallFill } from "react-icons/pi";
import { MdEmail } from "react-icons/md";
import { FaFacebookF, FaXTwitter, FaInstagram } from "react-icons/fa6";
import { BackIcon } from "@/public/svgs";
import { StyledText } from "@/src/components";
import { useRouter } from "next/navigation";

const center = {
  lat: 6.2349,
  lng: 7.0838,
};

const ContactItem = ({
  icon,
  label,
  href,
  text,
}: {
  icon: any;
  label: string;
  href: string;
  text: string;
}) => (
  <Flex align="center" justify="space-between" bg="gray.50" rounded="lg" p={{ base: 4, md: 5 }}>
    <Flex align="center" gap={4}>
      <Flex bg="#F4FCE5" rounded="full" p={2} align="center" justify="center">
        <Icon as={icon} boxSize={5} color="primary" />
      </Flex>
      <Text fontSize={{ base: "sm", md: "md" }} color="secondary">
        {label}
      </Text>
    </Flex>
    <Link href={href} fontSize={{ base: "sm", md: "md" }} color="primary" fontWeight="medium">
      {text}
    </Link>
  </Flex>
);

export default function ContactSupportLayout() {
  const router = useRouter();

  const mapContainerStyle = useBreakpointValue({
    base: { width: "100%", height: "200px" },
    md: { width: "100%", height: "300px" },
    lg: { width: "100%", height: "400px" },
  });

  const handleBack = () => router.back();

  return (
    <Box px={3} py={{ base: 3, lg: 10 }} w={{ lg: "65%" }} mx="auto">
      <HStack gap={4} alignItems="center" mt={{ base: 6, lg: "unset" }}>
        <Box cursor="pointer" onClick={handleBack}>
          <BackIcon />
        </Box>
        <StyledText fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" color="secondary">
          Contact Support
        </StyledText>
      </HStack>
      <StyledText fontSize={{ base: "sm", md: "md" }} color="bfgrey" mt={2}>
        Reach out to our team via email or phone for personalized assistance.
      </StyledText>

      <Box rounded="lg" overflow="hidden" my={6}>
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
          <GoogleMap mapContainerStyle={mapContainerStyle!} center={center} zoom={15}>
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </Box>

      <VStack spaceY={4} align="stretch" mt={6}>
        <ContactItem
          icon={PiPhoneCallFill}
          label="Contact Support"
          href="tel:+1234567890"
          text="Call"
        />
        <ContactItem icon={MdEmail} label="Email us" href="mailto:growe@support.com" text="Send" />
        <ContactItem
          icon={FaFacebookF}
          label="Facebook"
          href="https://facebook.com/groweapp"
          text="Visit"
        />
        <ContactItem
          icon={FaXTwitter}
          label="X-Twitter"
          href="https://twitter.com/groweapp"
          text="Visit"
        />
        <ContactItem
          icon={FaInstagram}
          label="Instagram"
          href="https://instagram.com/groweapp"
          text="Visit"
        />
      </VStack>
    </Box>
  );
}
