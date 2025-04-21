import { VideoUpload } from "../components/VideoUpload";

const Upload: React.FC = () => {
  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">
        Upload a video to get started
      </h2>
      <VideoUpload />
    </div>
  );
};

export default Upload;
