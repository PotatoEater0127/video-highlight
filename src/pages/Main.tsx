import { TranscriptEditor } from "../components/TranscriptEditor";
import { VideoPlayer } from "../components/VideoPlayer";

const Main: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row rounded-md  h-screen w-full">
      <div className="flex-1 order-2 sm:order-1">
        <TranscriptEditor />
      </div>
      <div className="flex-1 order-1 sm:order-2">
        <VideoPlayer />
      </div>
    </div>
  );
};

export default Main;
