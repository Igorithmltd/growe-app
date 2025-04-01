import Footer from "@/src/components/layouts/footer";
import Header from "@/src/components/layouts/header";
import { Box } from "@chakra-ui/react";
import UniteSection from "./unite-section";

const LandingLayout = () => {
  return (
    <Box>
      <Header />
      <UniteSection />
      <Footer />
    </Box>
  );
};

export default LandingLayout;
