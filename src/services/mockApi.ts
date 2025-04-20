import { Transcript, VideoMetadata } from "../types";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Generate a random ID
const generateId = () => Math.random().toString(36).substring(2, 9);

/**
 * Mock API to simulate AI processing of a video
 * In a real application, this would be an actual API call
 */
export const processVideo = async (
  file: File
): Promise<{ transcript: Transcript; videoMetadata: VideoMetadata }> => {
  // Simulate processing delay (2-4 seconds)
  const processingTime = 2000 + Math.random() * 2000;
  await delay(processingTime);

  // Create a URL for the video
  const videoUrl = URL.createObjectURL(file);

  // Create mock video metadata
  const videoMetadata: VideoMetadata = {
    name: file.name,
    src: videoUrl,
    duration: 120, // Mock 2-minute video
  };

  // Generate mock transcript data
  const transcript: Transcript = {
    sections: [
      {
        id: generateId(),
        title: "Introduction",
        sentences: [
          {
            id: generateId(),
            text: "Welcome to our product demonstration.",
            startTime: 0,
            endTime: 3,
            selected: false,
          },
          {
            id: generateId(),
            text: "Today, we'll be showcasing our latest innovation.",
            startTime: 4,
            endTime: 8,
            selected: true,
          },
        ],
      },
      {
        id: generateId(),
        title: "Key Features",
        sentences: [
          {
            id: generateId(),
            text: "Our product has three main features.",
            startTime: 15,
            endTime: 19,
            selected: false,
          },
          {
            id: generateId(),
            text: "First, it's incredibly easy to use.",
            startTime: 20,
            endTime: 23,
            selected: true,
          },
          {
            id: generateId(),
            text: "Second, it's highly efficient.",
            startTime: 24,
            endTime: 27,
            selected: true,
          },
          {
            id: generateId(),
            text: "And third, it's cost-effective.",
            startTime: 28,
            endTime: 31,
            selected: true,
          },
        ],
      },
      {
        id: generateId(),
        title: "Demonstration",
        sentences: [
          {
            id: generateId(),
            text: "Let me show you how it works.",
            startTime: 40,
            endTime: 43,
            selected: true,
          },
          {
            id: generateId(),
            text: "Simply press this button to start.",
            startTime: 44,
            endTime: 47,
            selected: true,
          },
          {
            id: generateId(),
            text: "The interface is intuitive and user-friendly.",
            startTime: 50,
            endTime: 54,
            selected: true,
          },
        ],
      },
      {
        id: generateId(),
        title: "Conclusion",
        sentences: [
          {
            id: generateId(),
            text: "In conclusion, our product is a game-changer.",
            startTime: 60,
            endTime: 64,
            selected: false,
          },
          {
            id: generateId(),
            text: "We're excited to bring this to market.",
            startTime: 65,
            endTime: 69,
            selected: true,
          },
          {
            id: generateId(),
            text: "Thank you for your attention.",
            startTime: 70,
            endTime: 73,
            selected: false,
          },
        ],
      },
    ],
  };

  return { transcript, videoMetadata };
};
