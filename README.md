# Video Highlight Tool

A web application for creating highlight clips from videos using AI-powered transcript generation.

## Features

- Upload video files
- AI-powered transcript generation (mocked for this demo)
- Split-screen interface with editing area and preview
- Select/unselect sentences for highlights
- Video playback with timeline visualization
- Transcript overlay on the video

## Technology Stack

- React 19
- TypeScript
- Tailwind CSS
- Zustand (State management)
- Vite (Build tool)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

## Usage

1. Upload a video file using the drag-and-drop interface or file selector
2. Wait for the AI to process the video and generate a transcript
3. Use the left panel to select/unselect sentences for your highlight clip
4. Preview your highlight clip in the right panel
5. Click on timestamps to navigate to specific parts of the video

## Project Structure

- `src/components/` - React components
- `src/services/` - Mock API services
- `src/store.ts` - Zustand store for state management
- `src/types.ts` - TypeScript type definitions
