import { render } from "@testing-library/react-native";
import MapView from "../MapView";

describe("<HomeScreen />", () => {
  test("Text renders correctly on HomeScreen", () => {
    const { getByText } = render(<MapView />);

    getByText("Welcome!");
  });
});
