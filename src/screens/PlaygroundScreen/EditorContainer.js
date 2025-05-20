import { useContext, useRef, useState } from "react";
import "../PlaygroundScreen/editorContainer.scss";
import Editor from "@monaco-editor/react";
import { PlaygroundContext } from "../../providers/PlaygroundProvider";
const EditorContainer = ({ fileId, folderId, runCode }) => {
  const { getDefaultCode, getLanguage, updateLanguage, saveCode } =
    useContext(PlaygroundContext);

  const [code, setCode] = useState(() => {
    return getDefaultCode(fileId, folderId);
  });
  const [language, setLanguage] = useState(() => getLanguage(fileId, folderId));
  const [theme, setTheme] = useState("vs-dark");
  // const [isFullScreen, setFullScreem] = useState(false);
  const codeRef = useRef();

  const editorOptions = {
    fontSize: 18,
    wordWrap: "on",
  };

  const fileExtentionMapping = {
    cpp: "cpp",
    java: "java",
    javascript: "js",
    python: "py",
  };

  const onChangeCode = (newCode) => {
    codeRef.current = newCode;
  };

  const onUploadCode = (event) => {
    const file = event.target.files[0];
    const fileType = file.type.includes("text");
    if (fileType) {
      const fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = function (value) {
        const importedCode = value.target.result;
        setCode(importedCode);
        codeRef.current = importedCode;
      };
    } else {
      alert("Please Select Text File");
    }
  };

  const exportCode = () => {
    const codeValue = codeRef.current?.trim();
    if (!codeValue) {
      alert("Not allowed to export empty file");
    }

    // create a blob {an instance file in memory}
    const codeBlob = new Blob([codeValue], { type: "text/plain" });

    //create a downlodable link with blob data
    const downloadUrl = URL.createObjectURL(codeBlob);

    //create a clickable link to download the blob file
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `code.${fileExtentionMapping[language]}`;
    link.click();
  };

  const onLanguageChange = (e) => {
    updateLanguage(fileId, folderId, e.target.value);
    setCode(getDefaultCode(fileId, folderId));
    setLanguage(e.target.value);
  };
  const onThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const onSaveCode = () => {
    saveCode(fileId, folderId, codeRef.current);
    alert("code save successfully");
  };

  const fullScreen = () => {};

  const onRunCode = () => {
    console.log(codeRef.current, language);
    runCode({ code: codeRef.current, language });
  };

  return (
    <div className="root-editor-container">
      <div className="editor-header">
        <div className="editor-left-container">
          <b className="title">{"title of the card"}</b>
          <span className="material-icons">edit</span>
          <button onClick={onSaveCode}>Save Code</button>
        </div>
        <div className="editor-right-container">
          <select value={language} onChange={onLanguageChange}>
            <option value="cpp">cpp</option>
            <option value="javascript">javascript</option>
            <option value="java">java</option>
            <option value="python">python</option>
          </select>
          <select value={theme} onChange={onThemeChange}>
            <option value="vs-dark">vs-dark</option>
            <option value="vs-light">vs-light</option>
          </select>
        </div>
      </div>
      <div className="editor-body">
        <Editor
          options={editorOptions}
          language={language}
          theme={theme}
          onChange={onChangeCode}
          value={code}
        />
      </div>
      <div className="editor-footer">
        <button className="btn" onClick={fullScreen}>
          <span className="material-icons">fullscreen</span>
          <span>Full Screen</span>
        </button>
        <label htmlFor="import-code" className="btn">
          <span className="material-icons">cloud_upload</span>
          <span>Uplaod Code</span>
        </label>
        <input
          type="file"
          id="import-code"
          style={{ display: "none" }}
          onChange={onUploadCode}
        />
        <button className="btn" onClick={exportCode}>
          <span className="material-icons">cloud_download</span>
          <span>Export Code</span>
        </button>
        <button className="btn" onClick={onRunCode}>
          <span className="material-icons">play_arrow</span>
          <span>Run Code</span>
        </button>
      </div>
    </div>
  );
};

export default EditorContainer;
