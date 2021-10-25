import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  left__div: {
    background: "hsl(225, 6%, 30%)",
    height: "auto",
    minHeight: "100vh",
    width: "20vw",
  },
  heading: {
    textAlign: "center",
    color: "#A2D2FF",
  },
  item: {
    cursor: "pointer",
    padding: "2px 20px",
    textAlign: "center",
    transition: "background 0.3s",
    "&:hover": {
      background: "hsl(225, 6%, 40%)",
    },
  },
  right__div: {
    padding: "25px 50px",
    width: "100%",
  },
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
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  thumbnail: {
    width: "400px",
    background: "hsl(225, 6%, 30%)",
    color: "white",
    margin: "10px",
    marginBottom: "30px",
    padding: "1rem",
    paddingBottom: "0",
    borderRadius: "10px",
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "center",
    transition: "background 0.3s",
    "&:hover": {
      background: "hsl(225, 6%, 35%)",
      cursor: "pointer",
      "& .dropdown__content": {
        display: "block",
      },
    },
  },
  new__pen__input: {
    width: "80%",
    background: "#5C7AEA",
    color: "white",
    marginTop: "30px",
    padding: "15px",
    fontSize: "16px",
    fontFamily: "Arial",
    borderRadius: "5px",
    "&::-webkit-input-placeholder": {
      color: "#fff",
    },
  },
  info__div: {
    display: "flex",
    paddingTop: "20px",
    "& p": {
      margin: "auto 0",
      fontWeight: "700",
    },
    "& span": {
      marginLeft: "auto",
    },
  },
  delete: {
    zIndex: "1000",
    borderRadius: "50%",
    padding: "5px",
    transition: "background 0.3s",
    "&:hover": {
      background: "#F5E9FF",
    },
  },
  frame: {
    cursor: "pointer",
    height: "30vh",
  },
}));
