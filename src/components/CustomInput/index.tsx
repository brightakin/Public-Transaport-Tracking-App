import React from "react";
import { View, TextInput as CustomTextInput } from "react-native";

// Styles && Constants && SVGs
import Styles from "./styles";
import { CustomTextInputProps } from "@/@types/interface";
import { COLORS, SIZES } from "@/src/constants/theme";
import { fontPixel, heightPixel } from "@/utils/normalize";

const CustomInput = ({
  children,
  touched,
  error,
  direction,
  icon,
  onPress,
  rtlIcon,
  hideDivider = false,
  ...props
}: CustomTextInputProps): JSX.Element => {
  const viewWrapStyle = props?.viewWrapStyle;

  return (
    <View
      style={[
        Styles.container,
        {
          backgroundColor: COLORS.grey500,
          ...viewWrapStyle,
        },
      ]}
    >
      <View style={[Styles.innerField]}>
        <View style={[Styles.input, { width: "99%" }]}>
          <CustomTextInput
            underlineColorAndroid="transparent"
            textAlign="left"
            placeholderTextColor={COLORS.textSecondary}
            style={[
              {
                fontSize: fontPixel(16),
                paddingVertical: 2,
                padding: heightPixel(10),
                color: COLORS.black500,
              },
            ]}
            {...props}
          />
        </View>
        {touched && !error && (
          <View
            style={[
              Styles.confirmInput,
              { borderColor: COLORS.success, backgroundColor: COLORS.success },
            ]}
          />
        )}
      </View>
    </View>
  );
};

export default CustomInput;
