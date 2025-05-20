import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import PlaygroundScreen from "./screens/PlaygroundScreen";
import { PlaygroundProvider } from "./providers/PlaygroundProvider";
import { ModalProvider } from "./providers/ModalProvider";

function App() {
  return (
    <div>
      <PlaygroundProvider>
        <ModalProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/playground/:fileId/:folderId" element={<PlaygroundScreen />} />
            </Routes>
          </BrowserRouter>
        </ModalProvider>
      </PlaygroundProvider>
    </div>
  );
}

export default App;
