"use client";

import { Box } from "@chakra-ui/react";
import { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { slides } from "../../carousel/items";

const AuthCarousel = () => {
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
    <Box
      p={{ base: 0, md: 5 }}
      w={{ base: "100%", lg: "45%" }}
      display={{ base: "none", lg: "block" }}
    >
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

export default AuthCarousel;
