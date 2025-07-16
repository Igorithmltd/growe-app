"use client";

import { Avatar, Box, Float, Icon, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useUserDetailsStore } from "@/src/stores/user-details";
import { StyledButton, StyledField, StyledText } from "@/src/components";
import { BackIcon, SuccessMark } from "@/public/svgs";
import { updateProfileSchema, UpdateProfileValues } from "@/src/schema/profile.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { HiOutlineCamera } from "react-icons/hi";
import { useEffect } from "react";
import InfoModal from "@/src/components/modals/InfoModal";
import { useModal } from "@/src/contexts/ModalContext";

const EditProfile = () => {
    const { setIsInfoOpen } = useModal();
  const user = useUserDetailsStore((state) => state.user);
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileValues>({
    resolver: yupResolver(updateProfileSchema),
  });

  const onSubmit = (data: UpdateProfileValues) => {
    console.log(data);
  };

  const fullName = `${user?.firstName} ${user?.lastName}`;

  useEffect(() => {
    if (user) {
      reset({
        email: user.email ?? "",
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        phoneNumber: user.phoneNumber ?? "",
      });
    }
  }, [user, reset]);

  const commonProps = {
    py: "20px",
    bg: "#F8F8F8",
    border: "2px solid #9BAB69",
    _focus: {
      outlineWidth: "2px",
      border: "none",
    },
  };

  return (
    <Box px={6} py={{ base: 5, lg: 10 }} w={{ lg: "65%" }} mx="auto">
      <Box display="flex" gap={4} alignItems="center" mt={{ base: 6, lg: "unset" }}>
        <Box cursor="pointer" onClick={handleBack}>
          <BackIcon />
        </Box>

        <StyledText fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium" color="secondary">
          Edit Profile
        </StyledText>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spaceY={4} align="stretch">
          <Box alignSelf="center">
            <Avatar.Root boxSize="100px">
              <Avatar.Fallback name={fullName} />
              <Avatar.Image src="/images/profile-Image.jpeg" />
              <Float placement="bottom-end" offsetX="1" offsetY="1">
                <Icon
                  as={HiOutlineCamera}
                  aria-label="Upload"
                  size="xl"
                  bg={"white"}
                  position="absolute"
                  p={1}
                  bottom={0}
                  right={0}
                  color="primary"
                  borderRadius="full"
                />
              </Float>
            </Avatar.Root>

            <StyledText
              bg="#ECFAEAE5"
              color="#89C184"
              fontSize="sm"
              borderRadius="20px"
              py="4px"
              px="8px"
              textAlign="center"
              mt={3}
            >
              Verified
            </StyledText>
          </Box>

          <StyledField
            label="Email"
            placeholder="Enter your verified email"
            labelColor="secondary"
            type="text"
            fieldProps={register("email")}
            error={errors?.email?.message}
            {...commonProps}
          />

          <StyledField
            label="First Name"
            placeholder="e.g John"
            labelColor="secondary"
            type="text"
            fieldProps={register("firstName")}
            error={errors?.firstName?.message}
            {...commonProps}
          />
          <StyledField
            label="Last Name"
            placeholder="e.g Doe"
            labelColor="secondary"
            type="text"
            fieldProps={register("lastName")}
            error={errors?.lastName?.message}
            {...commonProps}
          />

          <StyledField
            label="Phone Number"
            placeholder="Enter Phone Number"
            labelColor="secondary"
            type="tel"
            fieldProps={register("phoneNumber")}
            error={errors?.phoneNumber?.message}
            {...commonProps}
          />

          <StyledButton type="submit" w="full" mt={2} loading={isSubmitting}>
            Save Changes
          </StyledButton>
        </VStack>
      </form>

      <InfoModal
        icon={<SuccessMark />}
        hasButton={true}
        buttonText="Back"
        onButtonClick={() => {
          router.push("/me/profile"), setIsInfoOpen(false);
        }}
        message="Hooray! Your profile has been updated successfully! 🎉    "
      />
    </Box>
  );
};

export default EditProfile;
