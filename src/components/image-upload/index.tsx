"use client";

import { useState, ChangeEvent } from "react";
import { Box, Input, VStack, Icon, Image, Spinner, Flex } from "@chakra-ui/react";
import { Field } from "@chakra-ui/react";
import { StyledText } from "@/src/components";
import { UseFormRegisterReturn } from "react-hook-form";
import { FiImage } from "react-icons/fi";

interface ImageUploadFieldProps {
  label?: string;
  labelColor?: string;
  fieldProps?: UseFormRegisterReturn;
  error?: string;
  isUploading?: boolean;
}

const ImageUploadField = ({
  label,
  labelColor = "secondary",
  fieldProps,
  error,
  isUploading,
}: ImageUploadFieldProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLoading(true);

      // generate preview
      const url = URL.createObjectURL(file);
      setPreview(url);

      // simulate async upload delay (remove if not needed)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setLoading(false);

      // notify react-hook-form
      fieldProps?.onChange?.({
        target: {
          name: fieldProps.name,
          value: file,
        },
      });
    }
  };

  return (
    <Field.Root invalid={!!error} spaceY={1}>
      {label && (
        <Field.Label>
          <StyledText
            smVariant="p14-medium"
            mdVariant="p16-medium"
            variant="p16-medium"
            color={labelColor}
          >
            {label}
          </StyledText>
        </Field.Label>
      )}

      <Box
        borderRadius="10px"
        cursor="pointer"
        w="full"
        px={6}
        py={{ base: 12, md: 16 }}
        textAlign="center"
        bg="white"
        _hover={{ bg: "gray.50" }}
        onClick={() => document.getElementById("image-upload")?.click()}
      >
        <VStack spaceY={2}>
          {loading || isUploading ? (
            <Flex direction="column" align="center">
              <Spinner />
              {isUploading && (
                <StyledText
                  color="grey"
                  fontWeight="medium"
                  fontSize={{ base: "sm", md: "md" }}
                  py={2}
                >
                  Uploading file, please wait...
                </StyledText>
              )}
            </Flex>
          ) : preview ? (
            <Image
              src={preview}
              alt="Uploaded preview"
              boxSize="100px"
              objectFit="cover"
              borderRadius="md"
            />
          ) : (
            <Flex direction="column" align="center" color="bfgrey">
              <Icon as={FiImage} boxSize={6} color="primary" />
              <StyledText fontSize={{ base: "md", lg: "lg" }}>Upload photo</StyledText>
            </Flex>
          )}
        </VStack>

        <Input
          type="file"
          id="image-upload"
          accept="image/*"
          display="none"
          ref={fieldProps?.ref}
          name={fieldProps?.name}
          onChange={handleImageChange}
        />
      </Box>

      <Field.ErrorText fontSize="12px" fontWeight="normal" color="red.500">
        {error}
      </Field.ErrorText>
    </Field.Root>
  );
};

export default ImageUploadField;
