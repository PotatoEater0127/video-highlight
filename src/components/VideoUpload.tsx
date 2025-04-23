import { processVideo } from "../services/mockApi";
import { useRootActions } from "../store/root";

export const VideoUpload: React.FC = () => {
  const { setVideo, setTranscript, setProcessing, setCurrentTime } =
    useRootActions();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e?.target?.files?.[0]) {
      await handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    // Only accept video files
    if (!file.type.startsWith("video/")) {
      alert("Please upload a video file");
      return;
    }

    setProcessing(true);
    try {
      const { transcript, videoMetadata } = await processVideo(file);

      const highlightClips = transcript.sections.flatMap((section) =>
        section.clips.filter((clip) => clip.selected)
      );
      const firstHighlightClip = highlightClips[0];

      setVideo(videoMetadata);
      setTranscript(transcript);
      setCurrentTime(firstHighlightClip.startTime);
    } catch (error: unknown) {
      console.error("Error processing video:", error);
      if (error instanceof Error) {
        alert(`Error processing video. ${error.message}`);
      } else {
        alert("Error processing video. An unknown error occurred.");
      }
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg transition-colors">
      <svg
        className="w-12 h-12 text-gray-400 mb-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        />
      </svg>
      <p className="mb-2 text-sm text-gray-700">
        <span className="font-semibold">Click to upload</span>
      </p>
      <p className="text-xs text-gray-500">VIDEO files only</p>
      <label
        htmlFor="video"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors cursor-pointer"
      >
        Select Video
      </label>
      <input
        id="video"
        type="file"
        className="hidden"
        accept="video/*"
        onChange={handleChange}
      />
    </div>
  );
};
