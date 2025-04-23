import clsx from "clsx";
import { ReactNode } from "react";
import { Clip } from "../../../types";
import { TimeStamp } from "./TimeStamp";

type SentenceProps = {
  clip: Clip;
  onClick: () => void;
  timeStamp: ReactNode;
  isActive: boolean;
};

export const Sentence: React.FC<SentenceProps> = ({
  clip,
  onClick,
  timeStamp = <TimeStamp clipTime={clip.startTime} />,
  isActive,
}) => {
  const wrapperClassName = clsx(
    "flex items-start border-2 rounded transition-colors p-2 my-1 cursor-pointer",
    clip.selected && "bg-blue-100",
    isActive ? "border-yellow-300" : "border-transparent"
  );

  return (
    <div
      key={clip.id}
      id={clip.id}
      onClick={onClick}
      className={wrapperClassName}
    >
      {timeStamp}
      <div className={clsx("flex items-center")}>
        <span className={clsx(clip.selected ? "text-black" : "text-gray-700")}>
          {clip.text}
        </span>
      </div>
    </div>
  );
};
