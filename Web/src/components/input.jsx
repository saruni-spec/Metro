import { theme } from "../core/theme";

function TextInput() {
  const inputStyle = {
    padding: "10px",
    margin: "10px 0",
    borderColor: theme.colors.text,
    borderWidth: "1px",
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
    borderRadius: "4px",
    borderStyle: "solid",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <input style={inputStyle} />
    </div>
  );
}

export default TextInput;
