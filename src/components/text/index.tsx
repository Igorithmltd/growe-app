import { Text, TextProps } from "@chakra-ui/react";

import { fontSizes, fontWeights } from "@/src/theme/config";

export type Variants =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p24-regular"
  | "p24-medium"
  | "p24-semibold"
  | "p24-bold"
  | "p21-regular"
  | "p21-medium"
  | "p21-semibold"
  | "p21-bold"
  | "p18-regular"
  | "p18-medium"
  | "p18-semibold"
  | "p18-bold"
  | "p16-regular"
  | "p16-medium"
  | "p16-semibold"
  | "p16-bold"
  | "p14-regular"
  | "p14-medium"
  | "p14-semibold"
  | "p14-bold"
  | "p12-regular"
  | "p12-medium"
  | "p12-semibold"
  | "p12-bold";

export const TextUtils = (variant?: Variants) => {
  switch (variant) {
    case "h1":
      return {
        fontSize: fontSizes.size1,
        fontWeight: fontWeights.weight1,
      };
    case "h2":
      return {
        fontSize: fontSizes.size2,
        fontWeight: fontWeights.weight1,
      };
    case "h3":
      return {
        fontSize: fontSizes.size3,
        fontWeight: fontWeights.weight1,
      };
    case "h4":
      return {
        fontSize: fontSizes.size5,
        fontWeight: fontWeights.weight1,
      };
    case "h5":
      return {
        fontSize: fontSizes.size7,
        fontWeight: fontWeights.weight1,
      };
    case "h6":
      return {
        fontSize: fontSizes.size9,
        fontWeight: fontWeights.weight1,
      };
    case "p24-regular":
      return {
        fontSize: fontSizes.size4,
        fontWeight: fontWeights.weight1,
      };
    case "p24-medium":
      return {
        fontSize: fontSizes.size4,
        fontWeight: fontWeights.weight2,
      };
    case "p24-semibold":
      return {
        fontSize: fontSizes.size4,
        fontWeight: fontWeights.weight3,
      };
    case "p24-bold":
      return {
        fontSize: fontSizes.size4,
        fontWeight: fontWeights.weight4,
      };
    case "p21-regular":
      return {
        fontSize: fontSizes.size6,
        fontWeight: fontWeights.weight1,
      };
    case "p21-medium":
      return {
        fontSize: fontSizes.size6,
        fontWeight: fontWeights.weight2,
      };
    case "p21-semibold":
      return {
        fontSize: fontSizes.size6,
        fontWeight: fontWeights.weight3,
      };
    case "p21-bold":
      return {
        fontSize: fontSizes.size6,
        fontWeight: fontWeights.weight4,
      };
    case "p18-regular":
      return {
        fontSize: fontSizes.size7,
        fontWeight: fontWeights.weight1,
      };
    case "p18-medium":
      return {
        fontSize: fontSizes.size7,
        fontWeight: fontWeights.weight2,
      };
    case "p18-semibold":
      return {
        fontSize: fontSizes.size7,
        fontWeight: fontWeights.weight3,
      };
    case "p18-bold":
      return {
        fontSize: fontSizes.size7,
        fontWeight: fontWeights.weight4,
      };
    case "p16-regular":
      return {
        fontSize: fontSizes.size8,
        fontWeight: fontWeights.weight1,
      };
    case "p16-medium":
      return {
        fontSize: fontSizes.size8,
        fontWeight: fontWeights.weight2,
      };
    case "p16-semibold":
      return {
        fontSize: fontSizes.size8,
        fontWeight: fontWeights.weight3,
      };
    case "p16-bold":
      return {
        fontSize: fontSizes.size8,
        fontWeight: fontWeights.weight4,
      };
    case "p14-regular":
      return {
        fontSize: fontSizes.size9,
        fontWeight: fontWeights.weight1,
      };
    case "p14-medium":
      return {
        fontSize: fontSizes.size9,
        fontWeight: fontWeights.weight2,
      };
    case "p14-semibold":
      return {
        fontSize: fontSizes.size9,
        fontWeight: fontWeights.weight3,
      };
    case "p14-bold":
      return {
        fontSize: fontSizes.size9,
        fontWeight: fontWeights.weight4,
      };
    case "p12-regular":
      return {
        fontSize: fontSizes.size10,
        fontWeight: fontWeights.weight1,
      };
    case "p12-medium":
      return {
        fontSize: fontSizes.size10,
        fontWeight: fontWeights.weight2,
      };
    case "p12-semibold":
      return {
        fontSize: fontSizes.size10,
        fontWeight: fontWeights.weight3,
      };
    case "p12-bold":
      return {
        fontSize: fontSizes.size10,
        fontWeight: fontWeights.weight4,
      };
    default:
      return {
        fontSize: fontSizes.size10,
        fontWeight: fontWeights.weight1,
      };
  }
};

interface CustomTextProps extends TextProps {
  children: React.ReactNode;
  className?: string;
  variant?: Variants;
  smVariant?: Variants;
  mdVariant?: Variants;
  style?: object;
}

export const StyledText = ({
  children,
  className,
  color = "grey",
  variant = "p12-regular",
  smVariant = "p24-regular",
  mdVariant = "p21-regular",
  style,
  ...props
}: CustomTextProps) => {
  return (
    <Text
      className={className}
      color={color}
      style={style}
      fontSize={{
        base: TextUtils(smVariant).fontSize,
        md: TextUtils(mdVariant).fontSize,
        lg: TextUtils(variant).fontSize,
      }}
      fontWeight={{
        base: TextUtils(smVariant).fontWeight,
        md: TextUtils(mdVariant).fontWeight,
        lg: TextUtils(variant).fontWeight,
      }}
      {...props}
    >
      {children}
    </Text>
  );
};
