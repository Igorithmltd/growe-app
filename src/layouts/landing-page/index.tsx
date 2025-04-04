import Footer from "@/src/components/layouts/footer";
import Header from "@/src/components/layouts/header";
import { Box } from "@chakra-ui/react";
import UniteSection from "./unite-section";
import FeaturesSection from "./features-section";
import Testimonials from "./testimonials";
import FAQSection from "./faqs-section";
import DownloadSection from "./download";
import Hero from "./hero";

const LandingLayout = () => {
  return (
    <Box bg="#FDFDFD">
      <Header />
      <Hero />
      <FeaturesSection />
      <UniteSection />
      <Testimonials />
      <FAQSection />
      <DownloadSection />
      <Footer />
    </Box>
  );
};

export default LandingLayout;
