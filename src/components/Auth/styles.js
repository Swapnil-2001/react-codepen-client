import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  input: {
    fontSize: "1.2rem",
    width: "30%",
    margin: "15px 0",
    outline: "none",
    padding: "20px",
    background: "#334756",
    border: "none",
    borderRadius: "10px",
    color: "white",
    "&::-webkit-input-placeholder": {
      color: "#A6A6A4",
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "100px",
    "& p": {
      color: "white",
    },
  },
  btn: {
    textTransform: "none",
    width: "fit-content",
    marginTop: "15px",
    marginBottom: "20px",
  },
}));
