import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  box: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30vw",
    outline: "none",
    backgroundColor: "#3D56B2",
    border: "2px solid #000",
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
  },
  new__pen__input: {
    width: "80%",
    marginTop: "30px",
    padding: "15px",
    fontSize: "16px",
    fontFamily: "Arial",
    borderRadius: "5px",
  },
  info__div: {
    display: "flex",
    padding: "20px 0",
    "& p": {
      margin: "auto 0",
      fontWeight: "700",
    },
    "& span": {
      marginLeft: "auto",
    },
  },
  frame: {
    cursor: "pointer",
    height: "30vh",
  },
}));
