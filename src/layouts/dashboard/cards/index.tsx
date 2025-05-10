import { ReuseableCard, StyledButton, StyledText } from "@/src/components";
import { EmptyStateTitle, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

interface Props {
  bg?: string;
  bgImage?: string;
  title: string;
  interest: string;
  amount: string;
  buttonBg?: string;
  buttonText: string;
  notes?: string;
  notesAction?: VoidFunction;
  buttonAction: VoidFunction;
}

export const SavingsCard = ({
  bg = "primary",
  bgImage = "",
  title,
  amount,
  buttonAction,
  buttonBg = "#EDE8D0",
  buttonText,
  notes,
  notesAction,
  interest,
}: Props) => {
  return (
    <ReuseableCard
      boxShadow="none"
      borderRadius="15px"
      px={6}
      py={6}
      bg={bg}
      color="#EDE8D0"
      backgroundImage={bgImage}
    >
      <HStack justify="space-between" alignItems="stretch">
        <VStack align="start" spaceY={2}>
          <HStack>
            <StyledText fontSize={{ base: "sm", md: "md" }} fontWeight="normal" color="inherit">
              {title}
            </StyledText>
            <MdOutlineVisibility size={20} />
          </HStack>

          <StyledText fontSize={{ base: "2xl", md: "4xl" }} fontWeight="bolder" color="inherit">
            <Text as="span" fontSize={{ base: "sm", md: "md" }} fontWeight="medium">
              ₦
            </Text>{" "}
            {amount}
          </StyledText>
          <StyledText fontSize={{ base: "sm", md: "md" }} fontWeight="normal" color="inherit">
            {interest} interest
          </StyledText>
        </VStack>

        <VStack spaceY={4} justify="space-between">
          {notes && (
            <StyledText
              fontSize={{ base: "sm", md: "md" }}
              fontWeight="normal"
              color="inherit"
              cursor="pointer"
              onClick={notesAction}
            >
              {notes}
            </StyledText>
          )}
          <StyledButton
            type="button"
            bg={buttonBg}
            py={{ base: 2, md: 4 }}
            px={{ base: 3, md: 5 }}
            fontSize={{ base: "sm", md: "md" }}
            fontWeight="normal"
            color="primary"
            borderRadius="full"
            onClick={buttonAction}
          >
            {buttonText}
          </StyledButton>
        </VStack>
      </HStack>
    </ReuseableCard>
  );
};
