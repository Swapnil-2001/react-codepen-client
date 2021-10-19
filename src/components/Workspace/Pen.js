import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";

import Editor from "./Editor";
import { createPen, updatePen } from "../../actions/pen";
import "./styles.css";

const Pen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { name, pen } = useSelector((state) => state.pen);
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    if (!name) history.push("/");
  }, [name, history]);

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
    if (!pen) {
      dispatch(createPen({ name, html, css, js }));
    } else {
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
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-item">
          <div>React-Codepen</div>
          <Button onClick={handleSave} style={{ marginLeft: "auto" }}>
            Save
          </Button>
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
