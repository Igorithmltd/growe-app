import { createSystem, defaultConfig } from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        primary: { value: "#9BAB69" }, // Main green
        secondary: { value: "#454839" }, // Dark olive
        grey: { value: "#A9AD9B" }, // Light grayish green
        darkgrey: { value: "#333333" },
        bfgrey: { value: "#8F8F8F" }, // Light gray
        bluelight: { value: "#FDFDFD" }, // White background
        text: { value: "#1A202C" }, // Dark gray
        muted: { value: "#FAF8FF" }, // Soft purple
        border: { value: "#F4F4F4" }, // Soft purple
      },
      fonts: {
        heading: { value: "'Inter', sans-serif" },
        body: { value: "'Inter', sans-serif" },
      },
      fontSizes: {
        headingDesktop: { value: "64px" },
        subheadingDesktop: { value: "45px" },
        titleDesktop: { value: "25px" },
        descriptionDesktop: { value: "18px" },

        headingMobile: { value: "28px" },
        subheadingMobile: { value: "25px" },
        titleMobile: { value: "14px" },
        descriptionMobile: { value: "12px" },

        "7xl": { value: "65px" },
        "6xl": { value: "50px" },
        "5xl": { value: "37px" },
        "4xl": { value: "24px" },
        "3xl": { value: "23px" },
        "2xl": { value: "21px" },
        xl: { value: "18px" },
        lg: { value: "16px" },
        md: { value: "14px" },
        sm: { value: "12px" },
        xs: { value: "10px" },
      },
      fontWeights: {
        regular: { value: "400" },
        medium: { value: "500" },
        semibold: { value: "600" },
      },
    },
  },
});
