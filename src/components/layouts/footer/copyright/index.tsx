import { StyledText } from "@/src/components/text";
import { Grid } from "@chakra-ui/react";

const FooterCopyright = () => {
  return (
    <Grid borderTopWidth="1px" borderTopColor="" py={12} bg="primary" placeItems="center">
      <StyledText
        smVariant="p12-regular"
        mdVariant="p14-regular"
        variant="p18-regular"
        color="white"
      >
        © 2025 Growe. All rights reserved
      </StyledText>
    </Grid>
  );
};

export default FooterCopyright;
