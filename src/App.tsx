import "./App.css";
import { Spinner } from "./components/Spinner";
import { TranscriptEditor } from "./components/TranscriptEditor";
import { VideoPlayer } from "./components/VideoPlayer";
import { VideoUpload } from "./components/VideoUpload";
import { useHighlightStore } from "./store";

function App() {
  const { video, isProcessing } = useHighlightStore();

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        {!video && !isProcessing && (
          <div className="max-w-lg mx-auto my-8">
            <h2 className="text-xl font-semibold mb-4">
              Upload a video to get started
            </h2>
            <VideoUpload />
          </div>
        )}

        {isProcessing && (
          <div className="flex flex-col items-center justify-center h-64">
            <Spinner />
            <p className="mt-4 text-gray-600">
              Processing video and generating transcript...
            </p>
          </div>
        )}

        {video && !isProcessing && (
          <div className="flex">
            <div className="flex-1 overflow-hidden">
              <TranscriptEditor />
            </div>
            <div className="flex-1 overflow-hidden">
              <VideoPlayer />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
