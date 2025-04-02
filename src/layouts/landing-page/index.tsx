import Footer from "@/src/components/layouts/footer";
import Header from "@/src/components/layouts/header";
import { Box } from "@chakra-ui/react";
import UniteSection from "./unite-section";
import FeaturesSection from "./features-section";

const LandingLayout = () => {
  return (
    <Box>
      <Header />
      <FeaturesSection />
      <UniteSection />
      <Footer />
    </Box>
  );
};

export default LandingLayout;
