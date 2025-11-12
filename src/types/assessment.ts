export type Answers = number[]; // 27 integers from 1-5

export type Quadrant = 
  | "Disengaged Mind"
  | "Skeptical Explorer" 
  | "Faithful Seeker"
  | "Integrated Alchemist";

export type Position =
  // Disengaged Mind positions
  | "Frozen Potential"
  | "Detached Observer"
  | "Conditioned Thinker"
  | "Overstimulated Skeptic"
  // Skeptical Explorer positions
  | "Methodical Practitioner"
  | "Hopeful Doubter"
  | "Spiritual Technician"
  | "Experimental Learner"
  // Faithful Seeker positions
  | "Inner Believer"
  | "Visionary Dreamer"
  | "Sacred Observer"
  | "Intentional Yearner"
  // Integrated Alchemist positions
  | "Grounded Mystic"
  | "Creative Conduit"
  | "Symbolic Strategist"
  | "Embodied Transformer";

export interface Scores {
  comm_raw: number;   // 14-70
  trust_raw: number;  // 13-65
  comm50: number;     // 0-50 normalized
  trust50: number;    // 0-50 normalized
  quadrant: Quadrant;
  position: Position;
}

export interface StoredReport {
  code: string;
  createdAt: string;
  answers: Answers;
  scores: Scores;
  version: 'v1';
}

export interface QuizItem {
  id: number;
  text: string;
  section: 'communication' | 'trust';
}
