import { useParams } from "react-router-dom";
import "./style.scss";
import EditorContainer from "./EditorContainer";
import { useCallback, useState } from "react";
import { makeSubmission } from "./Service";
const PlaygroundScreen = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  const params = useParams();
  const { fileId, folderId } = params;

  const importInput = (e) => {
    const file = e.target.files[0];
    const fileType = file.type.includes("text");
    if (fileType) {
      const fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = (e) => {
        setInput(e.target.result);
      };
    } else {
      alert("please choose a program file");
    }
  };

  const exportOutput = (e) => {
    const outputValue = output.trim();
    if (!outputValue) {
      alert("Output is Empty");
      return;
    }

    const blob = new Blob([outputValue], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `output.text`;
    link.click();
  };

  const callback = ({ apiStatus, data, message }) => {
    console.log("data", data);

    if (apiStatus === "loading") {
      setShowLoader(true);
    } else if (apiStatus === "error") {
      setOutput("Something went wrong");
      setShowLoader(false);
    } else {
      if (data.status.id === 3) {
        console.log("api status id", data.status.id);
        setOutput(atob(data.stdout));
        setShowLoader(false);
      } else {
        setOutput(atob(data.stderr));
        setShowLoader(false);
      }
    }
  };

  const runCode = useCallback(
    ({ code, language }) => {
      makeSubmission({ code, language, stdin: input, callback });
    },
    [input]
  );

  return (
    <div className="playground-container">
      <div className="header-container">
        <p>header</p>
      </div>
      <div className="containt-container">
        <div className="editor-container">
          <EditorContainer
            fileId={fileId}
            folderId={folderId}
            runCode={runCode}
          />
        </div>
        <div className="input-output-container">
          <div className="input-header">
            <b>Input :</b>
            <label htmlFor="input" className="icon-container">
              <span className="material-icons">cloud_upload</span>
              <span className="">Import Input</span>
            </label>
            <input
              id="input"
              type="file"
              onChange={importInput}
              style={{ display: "none" }}
            />
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
        </div>
        <div className="input-output-container">
          <div className="input-header">
            <b>Output:</b>
            <label
              htmlFor="output"
              className="icon-container"
              onClick={exportOutput}
            >
              <span className="material-icons">cloud_download</span>
              <span className="">Import Output</span>
            </label>
          </div>
          <textarea
            n
            value={output}
            onChange={(e) => setOutput(e.target.value)}
          ></textarea>
        </div>
      </div>
      {showLoader && (
        <div className="fullpage-loader">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};
export default PlaygroundScreen;
