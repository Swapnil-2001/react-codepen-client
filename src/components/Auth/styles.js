import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  heading__div: {
    textAlign: "center",
    marginTop: "45px",
  },
  input: {
    fontSize: "1.2rem",
    width: "30%",
    margin: "15px 0",
    padding: "20px",
    background: "#334756",
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
    marginTop: "30px",
    "& p": {
      color: "white",
    },
  },
}));
