import { useShallow } from "zustand/shallow";
import "./App.css";
import LoadingPage from "./pages/Loading";
import MainPage from "./pages/Main";
import UploadPage from "./pages/Upload";
import { useHighlightStore } from "./store";

function App() {
  const { video, isProcessing } = useHighlightStore(
    useShallow((state) => ({
      video: state.video,
      isProcessing: state.isProcessing,
    }))
  );

  const renderPage = () => {
    if (isProcessing) {
      return <LoadingPage />;
    }
    if (!video) {
      return <UploadPage />;
    }
    return <MainPage />;
  };

  return (
    <main className="flex items-center justify-center h-screen p-1">
      {renderPage()}
    </main>
  );
}

export default App;
