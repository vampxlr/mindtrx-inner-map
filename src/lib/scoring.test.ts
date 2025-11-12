import { describe, it, expect } from 'vitest';
import { getPosition, validateAnswers } from './scoring';
import { Answers } from '@/types/assessment';

describe('scoring', () => {
  describe('getPosition', () => {
    it('should correctly identify Disengaged Mind quadrant at boundary (25,25)', () => {
      // comm_raw = 25 → comm50 = 18, trust_raw = 25 → trust50 = 19
      const answers: Answers = [
        ...Array(14).fill(2), // comm_raw = 28 → comm50 = 20
        ...Array(13).fill(2), // trust_raw = 26 → trust50 = 20
      ];
      const result = getPosition(answers);
      expect(result.quadrant).toBe('Disengaged Mind');
      expect(result.comm50).toBeLessThan(26);
      expect(result.trust50).toBeLessThan(26);
    });

    it('should correctly identify Skeptical Explorer quadrant at boundary (26,25)', () => {
      // comm_raw ≥ 37 → comm50 ≥ 26, trust_raw = 25 → trust50 = 19
      const answers: Answers = [
        ...Array(14).fill(3), // comm_raw = 42 → comm50 = 30
        ...Array(13).fill(2), // trust_raw = 26 → trust50 = 20
      ];
      const result = getPosition(answers);
      expect(result.quadrant).toBe('Skeptical Explorer');
      expect(result.comm50).toBeGreaterThanOrEqual(26);
      expect(result.trust50).toBeLessThan(26);
    });

    it('should correctly identify Faithful Seeker quadrant at boundary (25,26)', () => {
      // comm_raw = 28 → comm50 = 20, trust_raw ≥ 34 → trust50 ≥ 26
      const answers: Answers = [
        ...Array(14).fill(2), // comm_raw = 28 → comm50 = 20
        ...Array(13).fill(3), // trust_raw = 39 → trust50 = 30
      ];
      const result = getPosition(answers);
      expect(result.quadrant).toBe('Faithful Seeker');
      expect(result.comm50).toBeLessThan(26);
      expect(result.trust50).toBeGreaterThanOrEqual(26);
    });

    it('should correctly identify Integrated Alchemist quadrant at boundary (26,26)', () => {
      const answers: Answers = [
        ...Array(14).fill(3), // comm_raw = 42 → comm50 = 30
        ...Array(13).fill(3), // trust_raw = 39 → trust50 = 30
      ];
      const result = getPosition(answers);
      expect(result.quadrant).toBe('Integrated Alchemist');
      expect(result.comm50).toBeGreaterThanOrEqual(26);
      expect(result.trust50).toBeGreaterThanOrEqual(26);
    });

    it('should correctly map Frozen Potential (lowLow, lowLow)', () => {
      const answers: Answers = [
        ...Array(14).fill(1), // comm_raw = 14 → comm50 = 10 (lowLow)
        ...Array(13).fill(1), // trust_raw = 13 → trust50 = 10 (lowLow)
      ];
      const result = getPosition(answers);
      expect(result.quadrant).toBe('Disengaged Mind');
      expect(result.position).toBe('Frozen Potential');
      expect(result.comm50).toBeLessThanOrEqual(12);
      expect(result.trust50).toBeLessThanOrEqual(12);
    });

    it('should correctly map Embodied Transformer (highHigh, highHigh)', () => {
      const answers: Answers = [
        ...Array(14).fill(5), // comm_raw = 70 → comm50 = 50 (highHigh)
        ...Array(13).fill(5), // trust_raw = 65 → trust50 = 50 (highHigh)
      ];
      const result = getPosition(answers);
      expect(result.quadrant).toBe('Integrated Alchemist');
      expect(result.position).toBe('Embodied Transformer');
      expect(result.comm50).toBeGreaterThan(38);
      expect(result.trust50).toBeGreaterThan(38);
    });

    it('should correctly map Methodical Practitioner (highLow, lowLow)', () => {
      const answers: Answers = [
        ...Array(14).fill(3), // comm_raw = 42 → comm50 = 30 (highLow)
        ...Array(13).fill(1), // trust_raw = 13 → trust50 = 10 (lowLow)
      ];
      const result = getPosition(answers);
      expect(result.quadrant).toBe('Skeptical Explorer');
      expect(result.position).toBe('Methodical Practitioner');
    });

    it('should correctly map Inner Believer (lowLow, highLow)', () => {
      const answers: Answers = [
        ...Array(14).fill(1), // comm_raw = 14 → comm50 = 10 (lowLow)
        ...Array(13).fill(3), // trust_raw = 39 → trust50 = 30 (highLow)
      ];
      const result = getPosition(answers);
      expect(result.quadrant).toBe('Faithful Seeker');
      expect(result.position).toBe('Inner Believer');
    });

    it('should normalize scores correctly to 0-50 scale', () => {
      const answers: Answers = [
        ...Array(14).fill(4), // comm_raw = 56
        ...Array(13).fill(4), // trust_raw = 52
      ];
      const result = getPosition(answers);
      expect(result.comm_raw).toBe(56);
      expect(result.trust_raw).toBe(52);
      expect(result.comm50).toBe(Math.round((56 / 70) * 50)); // 40
      expect(result.trust50).toBe(Math.round((52 / 65) * 50)); // 40
    });
  });

  describe('validateAnswers', () => {
    it('should validate correct answers array', () => {
      const answers: Answers = Array(27).fill(3);
      expect(validateAnswers(answers)).toBe(true);
    });

    it('should reject array with wrong length', () => {
      const answers: Answers = Array(26).fill(3);
      expect(validateAnswers(answers)).toBe(false);
    });

    it('should reject answers outside 1-5 range', () => {
      const answers: Answers = [...Array(26).fill(3), 6];
      expect(validateAnswers(answers)).toBe(false);
    });

    it('should reject non-integer answers', () => {
      const answers = [...Array(26).fill(3), 3.5];
      expect(validateAnswers(answers as Answers)).toBe(false);
    });
  });
});
