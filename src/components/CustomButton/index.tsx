import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

// Styles && Constants && Icons
import Styles from "./styles";
import { CustomButtonProps } from "@/@types/interface";
import { COLORS, SIZES } from "@/src/constants/theme";
import { fontPixel } from "@/utils/normalize";

const CustomButton = ({
  variant,
  label,
  loading,
  buttonStyles,
  textStyles,
  fontColor,
  ...props
}: CustomButtonProps): JSX.Element => {
  let backgroundColor;
  let color;
  if (variant === "primary") {
    backgroundColor = COLORS.primary600;
    color = COLORS.default;
  } else if (variant === "no-fill") {
    backgroundColor = COLORS.white;
    color = COLORS.default;
  } else {
    backgroundColor = COLORS.btnDefaultBg;
    color = COLORS.placeholder;
  }

  if (variant === "primary") {
    return (
      <TouchableOpacity
        style={{
          ...Styles.buttonContainer,
          backgroundColor: props?.disabled
            ? COLORS?.placeholder
            : backgroundColor,
          borderRadius: 14,
          ...buttonStyles,
        }}
        {...props}
      >
        {!loading ? (
          <Text
            style={{
              fontSize: fontPixel(18),
              color,
              ...textStyles,
            }}
          >
            {label}
          </Text>
        ) : (
          <ActivityIndicator animating={loading} size="small" color={color} />
        )}
      </TouchableOpacity>
    );
  }

  if (variant === "secondary") {
    return (
      <TouchableOpacity
        style={{
          ...Styles.buttonContainer,
          backgroundColor,
          borderRadius: SIZES.radius,
          ...buttonStyles,
        }}
        {...props}
      >
        <Text style={{ fontSize: fontPixel(18), color, ...textStyles }}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[
        Styles.buttonContainer,
        {
          borderColor: COLORS.placeholder,
          borderWidth: 2,
          borderRadius: SIZES.radius,
          ...buttonStyles,
        },
      ]}
      {...props}
    >
      <Text
        style={[
          ,
          {
            color: COLORS.placeholder,
            fontSize: fontPixel(18),
            ...textStyles,
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
