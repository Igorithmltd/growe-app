import { HStack, Box } from "@chakra-ui/react";
import Image from "next/image";

const Partners = () => {
  const providers = [
    { name: "Flutterwave", logo: "/images/flutterwave.webp" },
    { name: "PayPal", logo: "/images/paypal.webp" },
    { name: "Cowrywise", logo: "/images/cowrywise.webp" },
    { name: "Bamboo", logo: "/images/bamboo.webp" },
  ];

  return (
    <HStack
      spaceX={{ base: 4, md: 8, lg: 16 }}
      align="center"
      justify="center"
      maxW={{ md: "95%", lg: "90%" }}
      mx="auto"
      px={5}
      py={{ base: "30px", md: "50px", lg: "90px" }}
    >
      {providers.map((provider) => (
        <Box key={provider.name} flex={1}>
          <Image
            src={provider.logo}
            alt={provider.name}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </Box>
      ))}
    </HStack>
  );
};

export default Partners;
