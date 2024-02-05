import { theme } from "../core/theme";
import PropTypes from "prop-types";

function Button({ children }) {
  const buttonStyle = {
    margin: "10px 0",
    padding: "2px",
    backgroundColor: theme.colors.primary, // replace with your theme color
  };

  const textStyle = {
    fontWeight: "bold",
    fontSize: "15px",
    lineHeight: "26px",
  };

  return (
    <button style={buttonStyle}>
      <span style={textStyle}>{children}</span>
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  // define other props here...
};

export default Button;
