import { Spinner, StyledButton, StyledText } from "@/src/components";
import { Box, Flex, HStack, VStack } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";
import { EmptyCard, GroupCard, SavingsCard } from "../../cards";
import { GroupIcon } from "@/public/svgs";
import { useRouter } from "next/navigation";
import { MdChevronRight } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import useSavings from "@/src/hooks/apis/queries/useSavings";

const GroupSavings = () => {
  const router = useRouter();

  const { getSavingGroups, getPopularSavings } = useSavings();

  const { data, isPending, isFetching, error } = useQuery({
    queryKey: ["all-savings-groups"],
    queryFn: getSavingGroups,
  });

  const {
    data: popularSavingsData,
    isPending: isGetting,
    isFetching: isLoading,
    error: popularError,
  } = useQuery({
    queryKey: ["popular-savings"],
    queryFn: getPopularSavings,
  });

  const savings = data?.data.message || [];
  const loading = isPending || isFetching;

  const popularSavings = popularSavingsData?.data.message || [];
  const popularLoading = isGetting || isLoading;

  return (
    <Box>
      <VStack align="stretch" spaceY={5} mt={6}>
        <SavingsCard
          title="Total Group Savings"
          amount="0.00"
          amountColor="secondary"
          interest="0%"
          bg="white"
          color="bfgrey"
          buttonBg="#F8FBEB"
          boxShadow="sm"
        />

        <HStack alignSelf={{ lg: "start" }}>
          <StyledButton type="button" flex={1} onClick={() => router.push("/savings/create-group")}>
            <FaPlus size="18px" /> Create Group
          </StyledButton>

          <StyledButton
            type="button"
            bg="#EDF5CE"
            color="primary"
            flex={1}
            onClick={() => router.push("/savings/join-group")}
          >
            <GroupIcon /> Join Group
          </StyledButton>
        </HStack>
      </VStack>

      <VStack align="stretch" spaceY={4}>
        <Box mt={12}>
          <HStack justify="space-between">
            <StyledText
              fontSize={{ base: "md", md: "lg", lg: "xl" }}
              fontWeight="medium"
              color="secondary"
            >
              Active Savings Group
            </StyledText>

            <Flex
              align="center"
              color="primary"
              cursor="pointer"
              onClick={() => router.push("/savings/saving-groups")}
            >
              <StyledText fontSize={{ base: "sm", md: "md" }} fontWeight="medium" color="inherit">
                Find more
              </StyledText>
              <MdChevronRight size={30} fontWeight={400} cursor="pointer" color="secondary" />
            </Flex>
          </HStack>

          {loading ? (
            <Flex h="150px" alignItems="center" justifyContent="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex h="150px" alignItems="center" justifyContent="center">
              <StyledText color="red.500" fontSize="md">
                {error instanceof Error ? error.message : "Unknown error"}
              </StyledText>
            </Flex>
          ) : savings.length === 0 ? (
            <Box mt={6}>
              <EmptyCard title="You Don’t Have Any Active Group Savings Yet!" />
            </Box>
          ) : (
            <HStack
              spaceX={{ base: 2, md: 4 }}
              mt={6}
              overflowX="auto"
              css={{
                "@media (max-width: 61.99em)": {
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                  scrollbarWidth: "none", // Firefox
                  msOverflowStyle: "none", // IE 10+
                },
              }}
            >
              {savings.map((group) => (
                <GroupCard
                  key={group._id}
                  title={group.title}
                  maxMemberAllowed={group.memberLimit}
                  membersJoined={group.groupMembers.length}
                  amountEach={`₦${group.frequentAmount.toLocaleString()}`}
                  image={"/images/group/1.jpg"}
                />
              ))}
            </HStack>
          )}
        </Box>
        <Box>
          <HStack justify="space-between">
            <StyledText
              fontSize={{ base: "md", md: "lg", lg: "xl" }}
              fontWeight="medium"
              color="secondary"
            >
              Promoted Groups
            </StyledText>

            <Flex align="center" color="primary" cursor="pointer">
              <StyledText fontSize={{ base: "sm", md: "md" }} fontWeight="medium" color="inherit">
                Find more
              </StyledText>
              <MdChevronRight size={30} fontWeight={400} cursor="pointer" color="secondary" />
            </Flex>
          </HStack>

          {popularLoading ? (
            <Flex h="150px" alignItems="center" justifyContent="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex h="150px" alignItems="center" justifyContent="center">
              <StyledText color="red.500" fontSize="md">
                {error instanceof Error ? error.message : "Unknown error"}
              </StyledText>
            </Flex>
          ) : savings.length === 0 ? (
            <Box mt={6}>
              <EmptyCard title="No popular savings!" />
            </Box>
          ) : (
            <HStack
              spaceX={{ base: 2, md: 4 }}
              mt={6}
              overflowX="auto"
              css={{
                "@media (max-width: 61.99em)": {
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                  scrollbarWidth: "none", // Firefox
                  msOverflowStyle: "none", // IE 10+
                },
              }}
            >
              {popularSavings.map((group) => (
                <GroupCard
                  key={group._id}
                  title={group.title}
                  maxMemberAllowed={group.memberLimit}
                  membersJoined={group.groupMembers.length}
                  amountEach={`₦${group.frequentAmount.toLocaleString()}`}
                  image={"/images/group/1.jpg"}
                />
              ))}
            </HStack>
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default GroupSavings;
