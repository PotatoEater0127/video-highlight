import clsx from "clsx";
import { ReactNode } from "react";
import { Clip } from "../../../types";
import { TimeStamp } from "./TimeStamp";

type SentenceProps = {
  clip: Clip;
  isActive: boolean;
  onClick: () => void;
  timeStamp: ReactNode;
};

export const Sentence: React.FC<SentenceProps> = ({
  clip,
  isActive,
  onClick,
  timeStamp = <TimeStamp clipTime={clip.startTime} />,
}) => {
  const wrapperClassName = clsx(
    "p-2 my-1 rounded transition-colors flex items-start",
    isActive && "bg-yellow-100",
    !isActive && clip.selected && "bg-blue-50"
  );

  return (
    <div key={clip.id} id={clip.id} className={wrapperClassName}>
      {timeStamp}
      <div className="flex-grow">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={clip.selected}
            onChange={onClick}
            className="hidden"
          />
          <span
            className={clsx(clip.selected ? "text-black" : "text-gray-700")}
          >
            {clip.text}
          </span>
        </label>
      </div>
    </div>
  );
};
