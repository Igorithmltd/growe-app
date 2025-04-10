"use client";

import {
  Box,
  VStack,
  Text,
  HStack,
  Link,
  IconButton,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { StyledField, StyledButton, StyledText } from "@/src/components";

interface LoginFormValues {
  email: string;
  password: string;
}

const validationSchema = yup.object().shape({
  email: yup.string().required("Email or phone number is required"),
  password: yup.string().required("Password is required"),
});

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(validationSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: LoginFormValues) => {
    console.log("Login data:", data);
    reset();
  };

  return (
    <Box px={6} py={10} mx="auto" mt={{ base: 6 }}>
      <VStack align="stretch" spacing={6}>
        <Box>
          <StyledText
            fontSize={{ base: "18px", md: "21px", lg: "24px" }}
            fontWeight="semibold"
            color="secondary"
          >
            Welcome Back to Growe!
          </StyledText>
          <StyledText fontSize={{ base: "12px", md: "14px", lg: "16px" }} mt={2}>
            Let’s get you back to saving, investing, and achieving your goals!
          </StyledText>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4} align="stretch">
            <StyledField
              label="Email / Phone Number"
              placeholder="Enter your email"
              type="text"
              fieldProps={register("email")}
              error={errors.email?.message}
              bg="#F8F8F8"
              py="20px"
              border="2px solid #9BAB69"
            />

            <InputGroup>
              <StyledField
                label="Password"
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                fieldProps={register("password")}
                error={errors.password?.message}
                bg="#F8F8F8"
                py="20px"
                border="2px solid #9BAB69"
              />
              <InputRightElement top="50%" transform="translateY(-50%)">
                <IconButton
                  variant="ghost"
                  aria-label="Toggle Password Visibility"
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={() => setShowPassword(!showPassword)}
                  size="sm"
                />
              </InputRightElement>
            </InputGroup>

            <HStack justify="flex-end">
              <Link fontSize="sm" color="secondary">
                Forgotten Password
              </Link>
            </HStack>

            <StyledButton type="submit" w="full" mt={2}>
              Log In
            </StyledButton>
          </VStack>
        </form>

        <Text textAlign="center" fontSize="sm" mt={4}>
          New to Growe?{" "}
          <Link fontWeight="medium" color="secondary">
            Create an Account
          </Link>
        </Text>
      </VStack>
    </Box>
  );
};
