import { formatTime } from "../../../utils/formatTime";

type TimeStampProps = {
  clipTime: number;
  onClick?: () => void;
};

export const TimeStamp: React.FC<TimeStampProps> = ({ clipTime, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="mr-2 transition-colors text-gray-500 hover:text-blue-500 font-bold cursor-pointer"
    >
      {formatTime(clipTime)}
    </button>
  );
};
