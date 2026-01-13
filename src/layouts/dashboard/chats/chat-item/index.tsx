import { StyledText } from "@/src/components";
import { Badge, Box, Flex, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const ChatItem = ({  chat }: {  chat: ChatRoom }) => {
  const router = useRouter();

  return (
    <Box
      bg="white"
      borderRadius="lg"
      p={3}
      _hover={{ shadow: "md", cursor: "pointer" }}
      onClick={() => router.push(`/chat/${chat._id}`)}
    >
      <Flex align="center">
        <img
          src={chat.groupId.groupImage.imageUrl || "/images/group/3.jpg"}
          alt={chat.groupId.title}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "25%",
            objectFit: "cover",
            marginRight: "12px",
          }}
        />

        <VStack align="start" spaceX={0} spaceY={0} flex="1">
          <StyledText fontWeight="normal" color="secondary" fontSize={{ base: "md", md: "lg" }}>
            {chat.groupId.title}
          </StyledText>
          <StyledText fontSize={{ base: "xs", md: "sm" }} color="bfgrey">
            {chat.groupId.groupMembers.length} group members
          </StyledText>
        </VStack>

        <VStack align="end" spaceX={0} spaceY={0}>
          <StyledText fontSize="xs" color="bfgrey">
            11:31 AM
          </StyledText>
          <Badge bg="#F06767" color="white" fontSize="xs" borderRadius="full" px={"5px"}>
            1
          </Badge>
        </VStack>
      </Flex>
    </Box>
  );
};

export default ChatItem;
