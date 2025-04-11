"use client";

import { Box, VStack } from "@chakra-ui/react";
import { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { slides } from "./items";
import { StyledButton } from "@/src/components";
import { useRouter } from "next/navigation";

const OnboardingCarousel = () => {
  const sliderRef = useRef<Slider>(null);
  const [current, setCurrent] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index: number) => setCurrent(index),
    appendDots: (dots: React.ReactNode) => (
      <Box mt={2}>
        <ul style={{ display: "flex", justifyContent: "center", gap: "6px" }}>{dots}</ul>
      </Box>
    ),
    customPaging: (i: number) => (
      <Box
        as="span"
        w={i === current ? "16px" : "8px"}
        h="8px"
        borderRadius="full"
        bg={i === current ? "primary" : "green.100"}
        transition="all 0.3s"
        display="inline-block"
      />
    ),
  };

  return (
    <Box p={{ base: 0, md: 5 }} w={{ base: "100%", lg: "45%" }}>
      <Slider ref={sliderRef} {...settings}>
        {slides.map((SlideComponent, index) => (
          <Box key={index}>
            <SlideComponent />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default OnboardingCarousel;

export const OnboardingLayout = () => {
  const router = useRouter();

  return (
    <VStack mt={{ base: 14, lg: "unset" }} spaceY={4} align="stretch" px={8}>
      <StyledButton type="button" py={8} onClick={() => router.push("/get-started")}>
        Get Started
      </StyledButton>
      <StyledButton
        type="button"
        color="primary"
        bgColor="#E1E5D4"
        py={8}
        onClick={() => router.push("/login")}
      >
        Login
      </StyledButton>
    </VStack>
  );
};
