import { AppStore, PlayStore, SuccessMark, InfoMark } from "@/public/svgs";
import { StyledButton, StyledText } from "@/src/components";
import InfoModal from "@/src/components/modals/InfoModal";
import { useModal } from "@/src/contexts/ModalContext";
import { Box, HStack, Icon, VStack } from "@chakra-ui/react";

const DownloadSection = () => {
  const { setIsInfoOpen } = useModal();
  return (
    <Box
      bgGradient="linear-gradient(135deg, #B7C489 0%, #9BAB69 50%, #B7C489 100%)"
      py="80px"
      px={5}
    >
      <VStack spaceY={6}>
        <StyledText
          fontSize={{ base: "21px", md: "35px" }}
          fontWeight="medium"
          color="white"
          w={{ lg: "550px" }}
        >
          Save Together, Invest Smarter, and Achieve More,Start Now!
        </StyledText>

        <HStack spaceX={3}>
          <StyledButton
            bgGradient="linear-gradient(to bottom, #DDFB7F 0%, #B0D461 100%);"
            type="button"
            display="flex"
            alignItems="center"
            px={{ base: 3, md: "20px" }}
            onClick={() => {
              setIsInfoOpen(true);
            }}
          >
            <Icon>
              <AppStore />
            </Icon>
            Get on Iphone
          </StyledButton>
          <StyledButton
            bg="#F4F4F4"
            color="secondary"
            type="button"
            display="flex"
            alignItems="center"
            px={{ base: 3, md: "20px" }}
          >
            <Icon>
              <PlayStore />
            </Icon>
            Get on Android
          </StyledButton>
        </HStack>
      </VStack>

      <InfoModal
        title="Verification Successful"
        message="Your identity has been verified successfully. You now have access to Growe features."
        hasButton={true}
        buttonText="Proceed to login"
        onButtonClick={() => setIsInfoOpen(false)}
        icon={<InfoMark />}
      />
    </Box>
  );
};

export default DownloadSection;
