import { ChatIcon, EmptyFolder } from "@/public/svgs";
import { ReuseableCard, StyledButton, StyledProgress, StyledText } from "@/src/components";
import useShowToast from "@/src/hooks/useShowToast";
import { copyToClipboard } from "@/src/utils/helpers";
import { Box, Flex, Grid, HStack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { MdContentCopy, MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

interface SavingsCardProps {
  bg?: string;
  bgImage?: string;
  title: string;
  interest: string;
  amount: string;
  amountColor?: string;
  buttonBg?: string;
  buttonText?: ReactNode;
  notes?: ReactNode;
  boxShadow?: string;
  color?: string;
  notesAction?: VoidFunction;
  buttonAction?: VoidFunction;
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
  boxShadow = "none",
  color = "#EDE8D0",
}: SavingsCardProps) => {
  const [visible, setVisible] = useState<boolean>();

  return (
    <ReuseableCard
      boxShadow={boxShadow}
      borderRadius="15px"
      px={{ base: 3, md: 6 }}
      py={6}
      bg={bg}
      color={color}
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
          {buttonText && (
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
          )}
        </VStack>
      </HStack>
    </ReuseableCard>
  );
};

export const MessageCard = ({
  bg = "white",
  title,
  timeAgo,
  message,
  isRead = true,
}: {
  bg?: string;
  title: string;
  message: string;
  timeAgo: string;
  isRead?: boolean;
}) => {
  return (
    <ReuseableCard
      boxShadow="xs"
      border="1px solid"
      borderColor="#F8FBEB"
      borderRadius="15px"
      px={{ base: 3, md: 6 }}
      py={6}
      bg={bg}
    >
      <HStack justify="space-between" color="bfgrey">
        <HStack spaceX={2} flex={1}>
          <Grid
            fontSize={{ base: "md", md: "3xl" }}
            placeItems="center"
            boxSize={{ base: "30px", md: "45px" }}
            borderRadius="full"
            bg="#F8FBEB"
            color="primary"
          >
            <ChatIcon />
          </Grid>

          <VStack align="start" spaceY={{ base: 2, md: 4 }}>
            <StyledText
              fontSize={{ base: "sm", md: "md", lg: "lg" }}
              fontWeight="medium"
              color="secondary"
            >
              {title}
            </StyledText>
            <StyledText
              fontSize={{ base: "xs", md: "sm", lg: "md" }}
              fontWeight="normal"
              color="inherit"
            >
              {message}
            </StyledText>
          </VStack>
        </HStack>

        <VStack spaceY={2} flex={0.5} align="end">
          <StyledText
            fontSize={{ base: "xs", md: "sm", lg: "md" }}
            fontWeight="normal"
            color="inherit"
          >
            {timeAgo}
          </StyledText>

          {isRead && (
            <Grid
              bg="#F06767"
              placeItems="center"
              boxSize="15px"
              color="white"
              borderRadius="full"
              fontSize={{ base: "8px", md: "xs" }}
            >
              1
            </Grid>
          )}
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
  const toast = useShowToast();

  const handleCopy = async () => {
    const success = await copyToClipboard(accountNumber);
    toast({
      title: success ? "Copied!" : "Copy failed",
      status: success ? "success" : "error",
    });
  };

  return (
    <ReuseableCard
      boxShadow="none"
      borderRadius="15px"
      px={{ base: 3, md: 6 }}
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

            <MdContentCopy onClick={handleCopy} cursor="pointer" />
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

export const ActiveSavingsCard = ({
  bg = "white",
  value,
  name,
  plan,
  amount,
}: {
  bg?: string;
  value: number;
  name: string;
  plan: string;
  amount: string;
}) => {
  const router = useRouter();

  return (
    <ReuseableCard
      boxShadow="xs"
      border="1px solid"
      borderColor="#F8FBEB"
      borderRadius="15px"
      px={{ base: 3, md: 6 }}
      py={6}
      bg={bg}
      onClick={() => router.push("/savings/saving-goals/123")}
    >
      <VStack align="stretch" spaceY={3}>
        <HStack justify="space-between" align="stretch">
          <VStack spaceY={1} align="start" justify="space-between">
            <StyledText
              fontSize={{ base: "sm", md: "md", lg: "lg" }}
              fontWeight="medium"
              color="secondary"
            >
              {name}
            </StyledText>
            <StyledText
              fontSize={{ base: "xs", md: "sm", lg: "md" }}
              fontWeight="normal"
              color="bfgrey"
            >
              {plan} plan
            </StyledText>
          </VStack>
          <Box spaceY={1}>
            <StyledText
              fontSize={{ base: "md", md: "lg", lg: "2xl" }}
              fontWeight="medium"
              color="secondary"
            >
              ₦{amount}
            </StyledText>
            <StyledText
              fontSize={{ base: "xs", md: "sm", lg: "md" }}
              fontWeight="normal"
              color="bfgrey"
            >
              Target amount
            </StyledText>
          </Box>
        </HStack>

        <Box>
          <StyledProgress value={value} label={`${value}% completed`} />
        </Box>
      </VStack>
    </ReuseableCard>
  );
};

export const EmptyCard = ({ bg = "white", title }: { bg?: string; title: string }) => {
  return (
    <ReuseableCard
      boxShadow="xs"
      border="1px solid"
      borderColor="#F8FBEB"
      borderRadius="15px"
      px={{ base: 3, md: 6 }}
      py={10}
      bg={bg}
    >
      <VStack align="center" spaceY={5}>
        <EmptyFolder />

        <StyledText
          fontSize={{ base: "xs", md: "sm", lg: "md" }}
          fontWeight="normal"
          color="secondary"
        >
          {title}
        </StyledText>
      </VStack>
    </ReuseableCard>
  );
};

export const GroupCard = ({
  title,
  image,
  maxMemberAllowed,
  membersJoined,
  amountEach,
}: {
  title: string;
  image: string;
  maxMemberAllowed: number;
  membersJoined: number;
  amountEach: string;
}) => {
  return (
    <ReuseableCard
      boxShadow="none"
      borderRadius={"12px"}
      px={0}
      py={0}
      bg={"transparent"}
      flex="0 0 auto"
      width={{ base: "143px", md: "190px", lg: "240px", xl: "280px" }}
    >
      <VStack align="stretch" spaceY={5}>
        <Box
          position="relative"
          w="full"
          height={{ base: "109px", md: "145px", lg: "183px", xl: "214px" }}
        >
          <Image
            src={image}
            alt={title}
            fill
            style={{ borderRadius: "14px", objectFit: "cover" }}
          />

          <StyledText
            fontSize={{ base: "2xs", md: "sm", lg: "lg" }}
            fontWeight="normal"
            color="primary"
            position="absolute"
            bg="#F8FBEBA8"
            p={2}
            borderRadius="full"
            right={2}
            top={2}
          >
            {`₦${amountEach} each`}
          </StyledText>
        </Box>

        <StyledText fontSize={{ base: "sm", md: "md", lg: "lg" }} fontWeight="normal" color="black">
          {title}
        </StyledText>

        <StyledProgress
          max={maxMemberAllowed}
          value={membersJoined}
          label={`${maxMemberAllowed} members`}
        />
      </VStack>
    </ReuseableCard>
  );
};

export const DetailsCard = ({
  bg = "white",
  title,
  value,
}: {
  bg?: string;
  title: string;
  value: string;
}) => {
  return (
    <ReuseableCard boxShadow="xs" borderRadius="15px" p={{ base: 3, md: 6 }} bg={bg}>
      <VStack align="stretch" spaceY={1}>
        <StyledText
          fontSize={{ base: "xs", md: "sm", lg: "md" }}
          fontWeight="normal"
          color="bfgrey"
        >
          {title}
        </StyledText>

        <StyledText
          fontSize={{ base: "sm", md: "md", lg: "lg" }}
          fontWeight="normal"
          color="secondary"
        >
          {value}
        </StyledText>
      </VStack>
    </ReuseableCard>
  );
};

export const ActivityCard = ({
  bg = "white",
  title,
  timeAgo,
  icon,
  status,
}: {
  bg?: string;
  title: string;
  timeAgo: string;
  icon: ReactNode;
  status?: string;
}) => {
  return (
    <ReuseableCard boxShadow="none" borderRadius="15px" p={{ base: 3, md: 6 }} bg="transparent">
      <HStack align="center" justify="space-between">
        <HStack spaceX={4}>
          <Grid boxSize="32px" bg="#F8FBEB" borderRadius="full" color="primary" placeItems="center">
            {icon}
          </Grid>

          <VStack align="stretch">
            <StyledText
              fontSize={{ base: "sm", md: "md", lg: "lg" }}
              fontWeight="normal"
              color="secondary"
            >
              {title}
            </StyledText>
            <StyledText
              fontSize={{ base: "xs", md: "sm", lg: "md" }}
              fontWeight="normal"
              color="bfgrey"
            >
              {timeAgo} ago
            </StyledText>
          </VStack>
        </HStack>

        {status && (
          <StyledText
            fontSize={{ base: "xs", md: "sm", lg: "md" }}
            fontWeight="normal"
            color="primary"
            py={2}
            px={5}
            bg="#F8FBEBA8"
            borderRadius="full"
          >
            {status}
          </StyledText>
        )}
      </HStack>
    </ReuseableCard>
  );
};
