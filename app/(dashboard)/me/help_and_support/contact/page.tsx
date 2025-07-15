"use client";

import {
  Box,
  Text,
  VStack,
  Flex,
  Icon,
  Link,
  useBreakpointValue,
} from "@chakra-ui/react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { PiPhoneCallFill } from "react-icons/pi";
import { MdEmail } from "react-icons/md";
import { FaFacebookF, FaXTwitter, FaInstagram } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const center = {
  lat: 6.2349,
  lng: 7.0838,
};

export default function ContactSupportPage() {
  const router = useRouter();

  const mapContainerStyle = useBreakpointValue({
    base: { width: "100%", height: "200px" },
    md: { width: "100%", height: "300px" },
    lg: { width: "100%", height: "400px" },
  });

  const ContactItem = ({
    icon,
    label,
    href,
    isExternal = false,
    text,
  }: {
    icon: any;
    label: string;
    href: string;
    isExternal?: boolean;
    text: string;
  }) => (
    <Flex
      align="center"
      justify="space-between"
      bg="gray.50"
      rounded="lg"
      p={{ base: 4, md: 5 }}
    >
      <Flex align="center" gap={4}>
        <Flex
          bg="green.100"
          rounded="full"
          p={2}
          align="center"
          justify="center"
        >
          <Icon as={icon} boxSize={5} color="green.600" />
        </Flex>
        <Text fontSize={{ base: "sm", md: "md" }}>{label}</Text>
      </Flex>
      <Link
        href={href}
        isExternal={isExternal}
        fontSize={{ base: "sm", md: "md" }}
        color="green.500"
        fontWeight="medium"
      >
        {text}
      </Link>
    </Flex>
  );

  return (
    <Box px={{ base: 4, md: 8 }} py={{ base: 6, md: 10 }} maxW="3xl" mx="auto">
      <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="semibold" mb={2}>
        Contact Support
      </Text>
      <Text fontSize={{ base: "sm", md: "md" }} color="gray.600" mb={4}>
        Reach out to our team via email or phone for personalized assistance.
      </Text>

      <Box rounded="lg" overflow="hidden" mb={6}>
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle!}
            center={center}
            zoom={15}
          >
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </Box>

      <VStack spacing={4} align="stretch">
        <ContactItem
          icon={PiPhoneCallFill}
          label="Contact Support"
          href="tel:+1234567890"
          text="Call"
        />
        <ContactItem
          icon={MdEmail}
          label="Email us"
          href="mailto:growe@support.com"
          text="Send"
        />
        <ContactItem
          icon={FaFacebookF}
          label="Facebook"
          href="https://facebook.com/groweapp"
          text="Visit"
          isExternal
        />
        <ContactItem
          icon={FaXTwitter}
          label="X-Twitter"
          href="https://twitter.com/groweapp"
          text="Visit"
          isExternal
        />
        <ContactItem
          icon={FaInstagram}
          label="Instagram"
          href="https://instagram.com/groweapp"
          text="Visit"
          isExternal
        />
      </VStack>
    </Box>
  );
}
