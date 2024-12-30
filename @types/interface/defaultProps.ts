import { ReactNode } from "react";
import {
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
  TextInputProps as RNCustomTextInput,
} from "react-native";

export interface CustomTextInputProps extends RNCustomTextInput {
  touched?: boolean | any;
  error?: string | any;
  customStyle?: any;
  direction?: "ltr" | "rtl" | "password" | "phone";
  icon?: any;
  onPress?: (...args: any) => void;
  children?: React.ReactNode;
  rtlIcon?: JSX.Element;
  viewWrapStyle?: ViewStyle;
  customInputStyle?: TextStyle | ViewStyle;
  hideDivider?: boolean;
}

export interface CustomButtonProps extends TouchableOpacityProps {
  variant: "default" | "primary" | "secondary" | "no-fill" | "danger";
  label: string;
  loading?: boolean;
  fontColor?: String;
  buttonStyles?: ViewStyle;
  textStyles?: TextStyle;
  onPress?: (e: any) => void;
}
