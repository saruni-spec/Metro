import PropTypes from "prop-types";

import background_dot from "../assets/background_dot.png";

function Background({ children }) {
  return (
    <div
      style={{
        backgroundImage: `url(${background_dot})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "repeat",
        padding: 0,
        margin: 0,
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
}

Background.propTypes = {
  children: PropTypes.node,
};

export default Background;
