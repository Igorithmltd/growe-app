import { Spinner, StyledButton, StyledText } from "@/src/components";
import { Box, Flex, VStack } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";
import { ActiveSavingsCard, EmptyCard, SavingsCard } from "../../cards";
import { useRouter } from "next/navigation";
import useSavings from "@/src/hooks/apis/queries/useSavings";
import { useQuery } from "@tanstack/react-query";

const PersonalSavings = () => {
  const router = useRouter();

  const { getPersonalSavings } = useSavings();

  const { data, isPending, isFetching, error } = useQuery({
    queryKey: ["all-personal-savings"],
    queryFn: getPersonalSavings,
  });

  const savings = data?.data.message || [];
  const loading = isPending || isFetching;

  return (
    <Box>
      <VStack align="stretch" spaceY={5} mt={6}>
        <SavingsCard
          title="Total Personal Savings"
          amount="0.00"
          amountColor="secondary"
          interest="0%"
          bg="white"
          color="bfgrey"
          buttonBg="#F8FBEB"
          boxShadow="sm"
          buttonText={
            <>
              <FaPlus size="18px" /> Quick Save
            </>
          }
          buttonAction={() => {
            router.push("/savings/quick-saving");
          }}
        />

        <StyledButton
          type="button"
          alignSelf={{ lg: "start" }}
          onClick={() => {
            router.push("/savings/create-goal");
          }}
        >
          <FaPlus size="18px" /> Create New Savings Goal
        </StyledButton>
      </VStack>
      <Box mt={12}>
        <StyledText
          fontSize={{ base: "md", md: "lg", lg: "xl" }}
          fontWeight="medium"
          color="secondary"
        >
          Active Personal Savings
        </StyledText>

        <VStack align="stretch" spaceY={4} mt={6}>
          {loading ? (
            <Flex h="250px" alignItems="center" justifyContent="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex h="250px" alignItems="center" justifyContent="center">
              <StyledText color="red.500" fontSize="md">
                {error instanceof Error ? error.message : "Unknown error"}
              </StyledText>
            </Flex>
          ) : savings.length === 0 ? (
            <Box mt={6}>
              <EmptyCard title="You Don’t Have Any Active Personal Savings Yet!" />
            </Box>
          ) : (
            savings.map((saving, index) => (
              <ActiveSavingsCard
                key={saving._id || index}
                name={saving.title}
                amount={saving.targetAmount.toLocaleString()}
                plan={`${saving.duration} months`}
                value={saving.savingProgress}
              />
            ))
          )}
        </VStack>
      </Box>
    </Box>
  );
};

export default PersonalSavings;
