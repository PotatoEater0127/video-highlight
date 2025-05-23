import { Timestamp, Transcript, VideoMetadata } from "../types";

import { SENTENCES } from "./data";

import { v4 as uuid } from "uuid";

const DURATION_MIN_LENGTH = 15;

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Get the duration of a video from its URL
 */
const getVideoDuration = (videoUrl: string): Promise<number> => {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.preload = "metadata";

    video.onloadedmetadata = () => {
      resolve(video.duration);
    };

    video.src = videoUrl;
  });
};

type GenerateRandomTimestampsProps = {
  timestampCount: number;
  duration: number;
  minLength: number;
  maxLength: number;
};
/**
 * Generate `timestampCount` amount of random timestamps for a video.
 * The length of a timestamp is between `minLength` and `maxLength`
 */
function generateRandomTimestamps({
  timestampCount,
  duration,
  minLength,
  maxLength,
}: GenerateRandomTimestampsProps): Timestamp[] {
  if (
    timestampCount <= 0 ||
    duration <= 0 ||
    minLength <= 0 ||
    maxLength < minLength
  ) {
    return [];
  }

  const timestamps: Timestamp[] = [];
  const attemptsLimit = 1000;
  let attempts = 0;

  while (timestamps.length < timestampCount && attempts < attemptsLimit) {
    attempts++;

    const length = Math.random() * (maxLength - minLength) + minLength;
    const maxStart = duration - length;
    if (maxStart <= 0) break;

    const start = Math.round(Math.random() * maxStart);
    const end = Math.round(start + length);

    const overlaps = timestamps.some(
      (seg) => !(end <= seg.start || start >= seg.end)
    );
    if (!overlaps) {
      timestamps.push({ start, end });
    }
  }

  if (timestamps.length < timestampCount) {
    console.warn(
      `Only ${timestamps.length} timestamps generated (requested ${timestampCount})`
    );
  }

  return timestamps.sort((a, b) => a.start - b.start);
}

const PROCESSING_DELAY = 1000;
/**
 * Mock API to simulate AI processing of a video
 * In a real application, this would be an actual API call
 */
export const processVideo = async (
  file: File
): Promise<{ transcript: Transcript; videoMetadata: VideoMetadata }> => {
  // Simulate processing delay
  await delay(PROCESSING_DELAY);

  // Create a URL for the video
  const videoUrl = URL.createObjectURL(file);

  // Get actual video duration
  const duration = await getVideoDuration(videoUrl);
  if (duration < DURATION_MIN_LENGTH) {
    throw new Error(
      "Video must be at least 15 seconds long. Please upload another video."
    );
  }

  // Create mock video metadata
  const videoMetadata: VideoMetadata = {
    name: file.name,
    src: videoUrl,
    duration, // Actual video duration in seconds
  };

  // Generate timestamps for our sentences
  const timestamps = generateRandomTimestamps({
    duration,
    timestampCount: SENTENCES.length,
    minLength: 1,
    maxLength: Math.floor(duration / SENTENCES.length),
  });

  // Generate mock transcript with exactly 15 sentences,
  // so that the page can be high enough to test the auto scrolling feature
  const transcript: Transcript = {
    sections: [
      {
        id: uuid(),
        title: "Product Overview",
        clips: SENTENCES.slice(0, 5).map((text, index) => ({
          id: uuid(),
          text,
          startTime: timestamps[index].start,
          endTime: timestamps[index].end,
          selected: Math.random() > 0.5,
        })),
      },
      {
        id: uuid(),
        title: "Features & Benefits",
        clips: SENTENCES.slice(5, 10).map((text, index) => ({
          id: uuid(),
          text,
          startTime: timestamps[index + 5].start,
          endTime: timestamps[index + 5].end,
          selected: Math.random() > 0.5,
        })),
      },
      {
        id: uuid(),
        title: "Conclusion",
        clips: SENTENCES.slice(10).map((text, index) => ({
          id: uuid(),
          text,
          startTime: timestamps[index + 10].start,
          endTime: timestamps[index + 10].end,
          selected: Math.random() > 0.5,
        })),
      },
    ],
  };

  return { transcript, videoMetadata };
};
