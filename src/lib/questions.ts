import { QuizItem } from "@/types/assessment";

export const quizItems: QuizItem[] = [
  // Section 1: Communication with the Inner Mind (14 items)
  { id: 1, text: "I journal about dreams, thoughts, or emotions.", section: "communication" },
  { id: 2, text: "I meditate or sit in silence regularly.", section: "communication" },
  { id: 3, text: "I use self-hypnosis, self-suggestion, or mental rehearsal.", section: "communication" },
  { id: 4, text: "I visualize goals or healing imagery intentionally.", section: "communication" },
  { id: 5, text: "I listen to Paraliminals or other guided audio experiences.", section: "communication" },
  { id: 6, text: "I engage in prayer or spiritual dialogue.", section: "communication" },
  { id: 7, text: "I use affirmations (spoken, written, or displayed).", section: "communication" },
  { id: 8, text: "I maintain a vision board or symbolic imagery collection.", section: "communication" },
  { id: 9, text: "I participate in spiritual ceremonies or energy rituals.", section: "communication" },
  { id: 10, text: "I track or interpret my dreams.", section: "communication" },
  { id: 11, text: "I engage in automatic writing or freewriting.", section: "communication" },
  { id: 12, text: "I practice somatic techniques (breathwork, yoga, ecstatic dance).", section: "communication" },
  { id: 13, text: "I use biofeedback or neurofeedback tools.", section: "communication" },
  { id: 14, text: "I explore altered states (float tanks, trance, similar).", section: "communication" },
  
  // Section 2: Trust in the Inner Mind (13 items)
  { id: 15, text: "I believe the inner mind holds valuable insights.", section: "trust" },
  { id: 16, text: "I trust my intuitive nudges and gut feelings.", section: "trust" },
  { id: 17, text: "I act on synchronicities or inner signs.", section: "trust" },
  { id: 18, text: "I apply dream insights or symbolic messages in my life.", section: "trust" },
  { id: 19, text: "I study intuition/transformation/inner development.", section: "trust" },
  { id: 20, text: "I participate in workshops, retreats, or coaching.", section: "trust" },
  { id: 21, text: "I have used psychedelics/entheogens for awakening purposes.", section: "trust" },
  { id: 22, text: "I trust non-linear inspiration and creative flow.", section: "trust" },
  { id: 23, text: "I feel guided by a deeper or higher self.", section: "trust" },
  { id: 24, text: "I integrate intuitive insights into decisions.", section: "trust" },
  { id: 25, text: "I surrender control to inner knowing when appropriate.", section: "trust" },
  { id: 26, text: "I feel confident in spontaneous insights and inspiration.", section: "trust" },
  { id: 27, text: "I'm comfortable with paradox, ambiguity, and symbolic meaning.", section: "trust" }
];

export const sectionInfo = {
  communication: {
    title: "Communication with the Inner Mind",
    description: "Practices that open channels to inner awareness and wisdom."
  },
  trust: {
    title: "Trust in the Inner Mind",
    description: "Beliefs and behaviors that honor and act on inner guidance."
  }
};
