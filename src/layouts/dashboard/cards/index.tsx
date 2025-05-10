import { ReuseableCard, StyledButton, StyledText } from "@/src/components";
import { Box, EmptyStateTitle, Flex, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { FiClipboard } from "react-icons/fi";
import { MdContentCopy, MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

interface SavingsCardProps {
  bg?: string;
  bgImage?: string;
  title: string;
  interest: string;
  amount: string;
  amountColor?: string;
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
  amountColor = "white",
  buttonAction,
  buttonBg = "#EDE8D0",
  buttonText,
  notes,
  notesAction,
  interest,
}: SavingsCardProps) => {
  const [visible, setVisible] = useState<boolean>();

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
            <Box
              boxSize={{ base: "20px", md: "24px" }}
              cursor="pointer"
              onClick={() => setVisible((prev) => !prev)}
            >
              {visible ? (
                <MdOutlineVisibilityOff size="100%" />
              ) : (
                <MdOutlineVisibility size="100%" />
              )}
            </Box>
          </HStack>

          <StyledText fontSize={{ base: "2xl", md: "4xl" }} fontWeight="bolder" color={amountColor}>
            {visible ? (
              <Box as={"span"}>
                <Text as="span" fontSize={{ base: "sm", md: "md" }} fontWeight="medium">
                  ₦
                </Text>{" "}
                {amount}
              </Box>
            ) : (
              "*****"
            )}
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

export const AccountCard = ({
  bg = "#F8FBEB",
  color = "primary",
  accountNumber,
  accountName,
  bank,
}: {
  bg?: string;
  color?: string;
  accountNumber: string;
  accountName: string;
  bank: string;
}) => {
  return (
    <ReuseableCard
      boxShadow="none"
      borderRadius="15px"
      px={6}
      py={6}
      bg={bg}
      minWidth={{ base: "360px", md: "400px", lg: "49%" }}
    >
      <HStack justify="space-between" color={color}>
        <VStack align="start" spaceY={4} flex={1.3}>
          <HStack>
            <VStack align="start" spaceY={2}>
              <StyledText fontSize={{ base: "md", md: "lg" }} fontWeight="semibold" color="inherit">
                {accountNumber}
              </StyledText>
              <StyledText
                fontSize={{ base: "xs", md: "sm" }}
                fontWeight="normal"
                color="inherit"
                textTransform="uppercase"
              >
                Account names
              </StyledText>
            </VStack>

            <MdContentCopy />
          </HStack>

          <StyledText fontSize={{ base: "sm", md: "md" }} fontWeight="normal" color="inherit">
            {accountName}
          </StyledText>
        </VStack>

        <Flex flex={1} justifyContent="end">
          <StyledText fontSize={{ base: "sm", md: "md" }} fontWeight="normal" color="inherit">
            {bank}
          </StyledText>
        </Flex>
      </HStack>
    </ReuseableCard>
  );
};
