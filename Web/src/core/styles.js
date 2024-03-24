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
    color: theme.colors.surface,
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
  floating: {
    position: "fixed",
    top: "0%",
    left: "80%",
    padding: "5px",
    backgroundColor: theme.colors.surface,
    borderRadius: "5px",
    display: "flex",
    flexDirection: "row",
  },
  noList: {
    listStyleType: "none",
    padding: "0",
    display: "flex",
    flexDirection: "column",
  },
};

export default styles;
