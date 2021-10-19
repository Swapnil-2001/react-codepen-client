import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useHistory } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";

import Editor from "./Editor";
import { getPenById, createPen, updatePen } from "../../actions/pen";
import "./styles.css";

const Pen = ({
  match: {
    params: { id },
  },
}) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading, name, pen } = useSelector((state) => state.pen);
  const [html, setHtml] = useState("Hey There!");
  const [css, setCss] = useState("body {\n  background: white;\n}");
  const [js, setJs] = useState("");
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    if (id !== "new") {
      dispatch(getPenById(id));
    } else if (!name) history.push("/");
  }, [dispatch, id, history, name]);

  useEffect(() => {
    if (pen && id !== "new") {
      setHtml(pen.html);
      setCss(pen.css);
      setJs(pen.js);
    }
  }, [pen, id]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <style>${css}</style>
          <body>${html}</html>
          <script>${js}</script>
        </html>
      `);
    }, 500);
    return () => clearTimeout(timeout);
  }, [html, css, js]);

  const handleSave = () => {
    if (id === "new") {
      dispatch(createPen({ name, html, css, js }, history));
    } else {
      if (user?.result?._id === pen.creator) {
        dispatch(
          updatePen(pen._id, {
            name,
            html,
            css,
            js,
            likes: pen.likes,
            creator: pen.creator,
          })
        );
      } else {
        dispatch(createPen({ name, html, css, js }, history));
      }
    }
  };

  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "75px",
        }}
      >
        <CircularProgress style={{ color: "white" }} />
      </div>
    );

  return (
    <>
      <nav className="navbar">
        <div className="navbar-item">
          <Link
            to="/"
            style={{
              textDecoration: "none",
              fontWeight: "700",
              margin: "auto 0",
              marginLeft: "15px",
              color: "white",
            }}
          >
            React-Codepen
          </Link>
          <SaveIcon
            onClick={handleSave}
            style={{ cursor: "pointer", marginLeft: "auto", color: "white" }}
          />
        </div>
        <div className="navbar-item project-name">{name}</div>
        <div className="navbar-item">
          <div>Like</div>
          <div style={{ marginLeft: "auto" }}>profile</div>
        </div>
      </nav>
      <div className="pane top-pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  );
};
export default Pen;
