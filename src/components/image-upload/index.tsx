import { Box, Input, VStack, Icon, Text, Image } from "@chakra-ui/react";
import { Field } from "@chakra-ui/react";
import { StyledText } from "@/src/components";
import { UseFormRegisterReturn } from "react-hook-form";
import { ChangeEvent, useState } from "react";
import { FiImage } from "react-icons/fi";

interface ImageUploadFieldProps {
  label?: string;
  fieldProps?: UseFormRegisterReturn;
  error?: string;
}

const ImageUploadField = ({ label, fieldProps, error }: ImageUploadFieldProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
    fieldProps?.onChange?.(e);
  };

  return (
    <Field.Root invalid={!!error} spaceY={1}>
      {label && (
        <Field.Label>
          <StyledText
            smVariant="p14-medium"
            mdVariant="p16-medium"
            variant="p16-medium"
            color="grey"
          >
            {label}
          </StyledText>
        </Field.Label>
      )}

      <Box
        border="2px dashed #E2E8F0"
        borderRadius="lg"
        cursor="pointer"
        p={6}
        textAlign="center"
        bg="white"
        _hover={{ bg: "gray.50" }}
        onClick={() => document.getElementById("image-upload")?.click()}
      >
        <VStack spaceY={2}>
          {preview ? (
            <Image
              src={preview}
              alt="Uploaded preview"
              boxSize="100px"
              objectFit="cover"
              borderRadius="md"
            />
          ) : (
            <>
              <Icon as={FiImage} boxSize={6} color="green.500" />
              <Text color="gray.500" fontSize="sm">
                Upload photo
              </Text>
            </>
          )}
        </VStack>
        <Input
          type="file"
          id="image-upload"
          accept="image/*"
          display="none"
          onChange={handleImageChange}
          {...fieldProps}
        />
      </Box>

      <Field.ErrorText fontSize="12px" fontWeight="normal" color="red.500">
        {error}
      </Field.ErrorText>
    </Field.Root>
  );
};

export default ImageUploadField;
