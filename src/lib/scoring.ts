import { Answers, Quadrant, Position, Scores } from "@/types/assessment";

/**
 * Calculate normalized scores and determine quadrant/position
 * @param answers Array of 27 answers (1-5)
 * @returns Complete scoring breakdown
 */
export function getPosition(answers: Answers): Scores {
  // Section 1: Communication (items 0-13, max 70)
  const comm_raw = answers.slice(0, 14).reduce((sum, val) => sum + val, 0);
  
  // Section 2: Trust (items 14-26, max 65)
  const trust_raw = answers.slice(14, 27).reduce((sum, val) => sum + val, 0);
  
  // Normalize to 0-50 scale
  const comm50 = Math.round((comm_raw / 70) * 50);
  const trust50 = Math.round((trust_raw / 65) * 50);
  
  // Determine quadrant (threshold at 26)
  const quadrant = getQuadrant(comm50, trust50);
  
  // Determine specific position within quadrant
  const position = getSpecificPosition(comm50, trust50, quadrant);
  
  return {
    comm_raw,
    trust_raw,
    comm50,
    trust50,
    quadrant,
    position
  };
}

function getQuadrant(comm50: number, trust50: number): Quadrant {
  if (trust50 < 26 && comm50 < 26) return "Disengaged Mind";
  if (trust50 < 26 && comm50 >= 26) return "Skeptical Explorer";
  if (trust50 >= 26 && comm50 < 26) return "Faithful Seeker";
  return "Integrated Alchemist";
}

function getSpecificPosition(comm50: number, trust50: number, quadrant: Quadrant): Position {
  // Split each dimension into sub-bands
  // Low band (0-25): lowLow (0-12), lowHigh (13-25)
  // High band (26-50): highLow (26-38), highHigh (39-50)
  
  const getCommBand = (val: number) => {
    if (val < 26) return val <= 12 ? 'lowLow' : 'lowHigh';
    return val <= 38 ? 'highLow' : 'highHigh';
  };
  
  const getTrustBand = (val: number) => {
    if (val < 26) return val <= 12 ? 'lowLow' : 'lowHigh';
    return val <= 38 ? 'highLow' : 'highHigh';
  };
  
  const commBand = getCommBand(comm50);
  const trustBand = getTrustBand(trust50);
  
  // Map to specific positions based on quadrant (IMII v2)
  const positionMap: Record<Quadrant, Record<string, Position>> = {
    "Disengaged Mind": {
      "lowLow-lowLow": "Detached Observer",
      "lowHigh-lowLow": "Overstimulated Skeptic",
      "lowLow-lowHigh": "Conditioned Thinker",
      "lowHigh-lowHigh": "Frozen Potential"
    },
    "Skeptical Explorer": {
      "highLow-lowLow": "Methodical Practitioner",
      "highHigh-lowLow": "Hopeful Doubter",
      "highLow-lowHigh": "Spiritual Technician",
      "highHigh-lowHigh": "Experimental Learner"
    },
    "Faithful Seeker": {
      "lowLow-highLow": "Inner Believer",
      "lowHigh-highLow": "Visionary Dreamer",
      "lowLow-highHigh": "Sacred Observer",
      "lowHigh-highHigh": "Intentional Yearner"
    },
    "Integrated Alchemist": {
      "highLow-highLow": "Grounded Mystic",
      "highHigh-highLow": "Creative Conduit",
      "highLow-highHigh": "Symbolic Strategist",
      "highHigh-highHigh": "Embodied Transformer"
    }
  };
  
  const key = `${commBand}-${trustBand}`;
  return positionMap[quadrant][key];
}

/**
 * Generate a unique code for storing/retrieving results
 */
export function generateReportCode(): string {
  const timestamp = Date.now().toString(36).slice(-6);
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${timestamp}-${random}`;
}

/**
 * Validate answers array
 */
export function validateAnswers(answers: Answers): boolean {
  if (!Array.isArray(answers) || answers.length !== 27) return false;
  return answers.every(a => Number.isInteger(a) && a >= 1 && a <= 5);
}
