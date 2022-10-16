import { PuffLoader } from "react-spinners";

function Spinner({
  loading = false,
  color = "#ffffff",
  position = "relative",
  cssOverride = {},
}) {
  cssOverride = {
    ...cssOverride,
    position: position,
    zIndex: 9999,
    left: "50%",
    transform: "translate(-50%, 0)",
  };

  if (position == "fixed") {
    cssOverride = {
      ...cssOverride,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    };
  }

  return (
    <PuffLoader
      color={color}
      loading={loading}
      cssOverride={cssOverride}
      size={150}
    />
  );
}

export default Spinner;