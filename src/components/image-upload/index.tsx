import { Box, Input, VStack, Icon, Image } from "@chakra-ui/react";
import { Field } from "@chakra-ui/react";
import { StyledText } from "@/src/components";
import { UseFormRegisterReturn } from "react-hook-form";
import { ChangeEvent, useState } from "react";
import { FiImage } from "react-icons/fi";

interface ImageUploadFieldProps {
  label?: string;
  labelColor?: string;
  fieldProps?: UseFormRegisterReturn;
  error?: string;
}

const ImageUploadField = ({
  label,
  labelColor = "secondary",
  fieldProps,
  error,
}: ImageUploadFieldProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
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
              <Icon as={FiImage} boxSize={6} color="primary" />
              <StyledText color="bfgrey" fontSize={{ base: "md", lg: "lg" }}>
                Upload photo
              </StyledText>
            </>
          )}
        </VStack>
        <Input
          type="file"
          id="image-upload"
          accept="image/*"
          display="none"
          ref={fieldProps?.ref}
          name={fieldProps?.name}
          onChange={(e) => {
            handleImageChange(e);
            fieldProps?.onChange?.(e);
          }}
        />
      </Box>

      <Field.ErrorText fontSize="12px" fontWeight="normal" color="red.500">
        {error}
      </Field.ErrorText>
    </Field.Root>
  );
};

export default ImageUploadField;
