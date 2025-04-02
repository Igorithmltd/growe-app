import Footer from "@/src/components/layouts/footer";
import Header from "@/src/components/layouts/header";
import { Box } from "@chakra-ui/react";
import UniteSection from "./unite-section";
import FeaturesSection from "./features-section";
import Testimonials from "./testimonials";

const LandingLayout = () => {
  return (
    <Box>
      <Header />
      <FeaturesSection />
      <UniteSection />
      <Testimonials />
      <Footer />
    </Box>
  );
};

export default LandingLayout;
