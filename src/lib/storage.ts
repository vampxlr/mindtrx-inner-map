import { StoredReport, Answers, Scores } from "@/types/assessment";

const STORAGE_KEY = "mindtrx_reports";

/**
 * Save a report to localStorage
 */
export function saveReport(code: string, answers: Answers, scores: Scores): void {
  const reports = getAllReports();
  
  const report: StoredReport = {
    code,
    createdAt: new Date().toISOString(),
    answers,
    scores,
    version: 'v2' // IMII v2: Updated Disengaged Mind position mappings
  };
  
  reports[code] = report;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
}

/**
 * Get a specific report by code
 */
export function getReport(code: string): StoredReport | null {
  const reports = getAllReports();
  return reports[code] || null;
}

/**
 * Get all reports
 */
function getAllReports(): Record<string, StoredReport> {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

/**
 * Save current quiz progress
 */
export function saveProgress(answers: Answers): void {
  localStorage.setItem('mindtrx_progress', JSON.stringify(answers));
}

/**
 * Load current quiz progress
 */
export function loadProgress(): Answers | null {
  try {
    const data = localStorage.getItem('mindtrx_progress');
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

/**
 * Clear quiz progress
 */
export function clearProgress(): void {
  localStorage.removeItem('mindtrx_progress');
}
