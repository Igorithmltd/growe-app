import { createSystem, defaultConfig } from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        primary: { value: "#9BAB69" }, // Main green
        secondary: { value: "#454839" }, // Dark olive
        grey: { value: "#A9AD9B" }, // Light grayish green
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
      },
      fontWeights: {
        regular: { value: "400" },
        medium: { value: "500" },
        semibold: { value: "600" },
      },
    },
  },
});
