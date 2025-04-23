import { Spinner } from "../components/Spinner";

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <Spinner />
      <p className="mt-4 text-gray-600">
        Processing video and generating transcript...
      </p>
    </div>
  );
};

export default Loading;
