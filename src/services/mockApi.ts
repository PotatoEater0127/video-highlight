import { Transcript, VideoMetadata } from "../types";

import { v4 as uuid } from "uuid";

type Timestamp = {
  start: number;
  end: number;
};

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
      // Round to nearest second for simplicity
      resolve(Math.round(video.duration));
    };

    video.src = videoUrl;
  });
};

function generateRandomTimestamps(
  duration: number,
  timestampCount: number,
  minLength: number,
  maxLength: number
): Timestamp[] {
  if (
    duration <= 0 ||
    timestampCount <= 0 ||
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

/**
 * Mock API to simulate AI processing of a video
 * In a real application, this would be an actual API call
 */
export const processVideo = async (
  file: File
): Promise<{ transcript: Transcript; videoMetadata: VideoMetadata }> => {
  // Simulate processing delay
  await delay(2000);

  // Create a URL for the video
  const videoUrl = URL.createObjectURL(file);

  // Get actual video duration
  const duration = await getVideoDuration(videoUrl);

  // Create mock video metadata
  const videoMetadata: VideoMetadata = {
    name: file.name,
    src: videoUrl,
    duration, // Actual video duration in seconds
  };

  // Demo sentences for our transcript
  const sentences = [
    "Welcome to our comprehensive product demonstration. We're excited to show you everything our solution has to offer.",
    "Today, we'll be showcasing our latest innovation.",
    "Our product has three main features that have been carefully designed to address the most common challenges our customers face in their daily workflows.",
    "First, it's incredibly easy to use.",
    "Second, it's highly efficient, with performance benchmarks showing up to 40% improvement over competing solutions in the market today.",
    "And third, it's cost-effective.",
    "Let me show you how it works in practice with a real-world example that demonstrates the flexibility and power of our approach.",
    "Simply press this button to start.",
    "The interface is intuitive and user-friendly, designed with accessibility in mind to ensure that everyone on your team can leverage its capabilities without extensive training.",
    "You can customize settings to your preference, with dozens of configuration options that allow you to tailor the experience precisely to your organization's unique requirements and workflows.",
    "The results are immediate and impressive.",
    "Let's look at some real-world examples from our existing customers who have successfully implemented this solution and achieved significant improvements in their operational efficiency.",
    "In conclusion, our product is a game-changer.",
    "We're excited to bring this to market after years of research and development, incorporating feedback from industry experts and potential users throughout our iterative design process.",
    "Thank you for your attention.",
  ];

  // Generate timestamps for our sentences
  const timestamps = generateRandomTimestamps(
    duration,
    sentences.length,
    1,
    Math.floor(duration / sentences.length)
  );

  console.log({ timestamps });

  // Generate mock transcript with exactly 15 sentences
  // so that the page can be high enough to test the auto scrolling feature
  const transcript: Transcript = {
    sections: [
      {
        id: uuid(),
        title: "Product Overview",
        sentences: sentences.slice(0, 5).map((text, index) => ({
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
        sentences: sentences.slice(5, 10).map((text, index) => ({
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
        sentences: sentences.slice(10).map((text, index) => ({
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
