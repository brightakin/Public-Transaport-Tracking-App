import { heightPixel, widthPixel } from "@/utils/normalize";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    paddingVertical: heightPixel(4),
    borderWidth: 1,
    marginVertical: 5,
  },
  innerField: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flexGrow: 1,
    padding: 6,
  },
  inputRTL: {
    flexGrow: 1,
  },
  innerFieldRTL: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: widthPixel(10),
  },
  divider: {
    height: "60%",
    width: 1,
  },
  confirmInput: {
    height: "100%",
    borderWidth: 1,
    width: 5,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
});

export default styles;
