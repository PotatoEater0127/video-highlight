export interface Sentence {
  id: string;
  text: string;
  startTime: number;
  endTime: number;
  selected: boolean;
}

export interface Section {
  id: string;
  title: string;
  sentences: Sentence[];
}

export interface Transcript {
  sections: Section[];
}

export interface VideoMetadata {
  duration: number;
  src: string;
  name: string;
}

export type Timestamp = {
  start: number;
  end: number;
};
