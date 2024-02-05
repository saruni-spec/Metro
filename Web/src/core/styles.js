import { theme } from "./theme";

const styles = {
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    textAlign: "center",
    color: theme.colors.text,
  },
  box: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    textAlign: "center",
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
    borderRadius: "10px",
    margin: "20px",
  },
  input: {
    backgroundColor: theme.colors.surface,
  },
  description: {
    fontSize: "13px",
    color: theme.colors.secondary,
    paddingTop: "8px",
  },
  error: {
    fontSize: "13px",
    color: theme.colors.error,
    paddingTop: "8px",
  },
};

export default styles;
