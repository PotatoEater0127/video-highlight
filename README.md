# 🎬 Video Highlight Tool

This is a web application that allows users to create highlight clips from uploaded videos and add transcripts to these clips.

## 📑 Table of Contents

- [🎬 Video Highlight Tool](#-video-highlight-tool)
  - [📑 Table of Contents](#-table-of-contents)
  - [🔍 Overview](#-overview)
  - [✨ Features](#-features)
  - [🛠️ Technology Stack](#️-technology-stack)
  - [💻 Prerequisites](#-prerequisites)
  - [🚀 Installation](#-installation)
  - [📋 Usage](#-usage)
  - [📂 Project Structure](#-project-structure)

## 🔍 Overview

The Video Highlight Tool is a web application built using React, TypeScript, and Tailwind CSS. It allows users to upload videos and use AI-powered transcription(mocked) to create engaging highlight reels. The application features a split-screen interface with a transcript editor on one side and a video preview on the other.

## ✨ Features

- 📤 Video upload and processing (mocked for this demo)
- 🤖 AI-powered transcript generation (mocked for this demo)
- 🖥️ Split-screen interface with transcript editor and video preview
- ✅ Select/unselect sentences for creating custom highlights
- ▶️ Video playback with timeline visualization
- 💬 Transcript overlay on the video
- 📱 Responsive design for desktop and mobile

## 🛠️ Technology Stack - All for Simplicity

- **Frontend**: React 19, TypeScript
- **State Management**: Zustand with immer
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Utilities**: UUID for ID generation
- **APIs**: Utils functions to mock API behavior for demo purposes
- **Deployment**: Vercel

## 💻 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v20.0.0 or higher)
- npm (v10.0.0 or higher)
- A modern web browser (Chrome, Safari)

## 🚀 Installation

1. Clone the repository: `git clone https://github.com/your-username/video-highlight.git](https://github.com/PotatoEater0127/video-highlight.git`
2. Navigate to the project directory: `cd video-highlight`
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`
5. Visit the application in your browser at `http://localhost:5173`

## 📋 Usage

1. Launch the application in your browser
2. Upload a video file (must be longer than 15 seonds)
3. Wait for the AI to process the video and generate a transcript (mock processing)
4. Use the left panel to select/unselect sentences for your highlight clips
5. Preview your highlight compilation in the right panel
6. Click on timestamps to navigate to specific parts of the video

## 📂 Project Structure

- `src/components/` - React components including TranscriptEditor and VideoPlayer
- `src/pages/` - Application pages (Main, Upload, Loading)
- `src/services/` - Mock API services for video processing
- `src/store/` - Zustand store for state management
- `src/types.ts` - TypeScript type definitions
- `src/utils/` - Utility functions

