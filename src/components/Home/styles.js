import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  box: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  wrapper: {
    display: "flex",
  },
  thumbnail: {
    width: "30%",
    textAlign: "center",
    background: "hsl(225, 6%, 30%)",
    color: "white",
    margin: "10px",
    padding: "1rem",
    paddingBottom: "0",
    borderRadius: "10px",
    transition: "background 0.3s",
    "&:hover": {
      background: "hsl(225, 6%, 35%)",
      cursor: "pointer",
    },
    "& p": {
      margin: "auto 0",
      padding: "15px 0",
    },
  },
  frame: {
    height: "30vh",
  },
}));
