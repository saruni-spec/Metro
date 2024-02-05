import { useState } from "react";
import { theme } from "../core/theme";

function PasswordInput() {
  const inputStyle = {
    padding: "10px",
    margin: "10px 0",
    borderColor: theme.colors.text, // replace with your theme color
    borderWidth: "1px",
    borderRadius: "4px",
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
    borderStyle: "solid",
  };
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <label htmlFor="pass">Enter password: </label>
      <input
        id="pass"
        type={showPassword ? "text" : "password"}
        style={inputStyle}
      />
      <br />
      <br />
      <label htmlFor="check">Show Password</label>
      <input
        id="check"
        type="checkbox"
        value={showPassword}
        onChange={() => setShowPassword((prev) => !prev)}
      />
    </div>
  );
}

export default PasswordInput;
