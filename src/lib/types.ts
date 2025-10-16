// Tipos para o sistema DISC + Múltiplas Inteligências

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  evaluationsCount: number;
  hasPaidAccess: boolean;
}

export interface Child {
  id: string;
  name: string;
  age: number;
  userId: string;
  createdAt: Date;
}

export interface Evaluation {
  id: string;
  childId: string;
  userId: string;
  respondentRole: 'pai' | 'mae' | 'educador' | 'cuidador';
  responses: QuestionResponse[];
  discProfile: DISCProfile;
  multipleIntelligences: MultipleIntelligences;
  report: FullReport;
  createdAt: Date;
}

export interface QuestionResponse {
  questionId: string;
  value: number; // 1-5 escala Likert
}

export interface Question {
  id: string;
  text: string;
  category: 'D' | 'I' | 'S' | 'C' | 'MI';
  miType?: 'linguistic' | 'logical' | 'spatial' | 'musical' | 'bodily' | 'interpersonal' | 'intrapersonal' | 'naturalist';
}

export interface DISCProfile {
  primary: 'D' | 'I' | 'S' | 'C';
  secondary: 'D' | 'I' | 'S' | 'C';
  scores: {
    D: number;
    I: number;
    S: number;
    C: number;
  };
  combinationName: string;
  description: string;
}

export interface MultipleIntelligences {
  ranking: {
    type: string;
    score: number;
    name: string;
  }[];
  topThree: string[];
}

export interface FullReport {
  profileSummary: string;
  worldView: string;
  superpower: string;
  behavioralIndicators: {
    home: string[];
    school: string[];
    friends: string[];
    balance: string[];
    imbalance: string[];
  };
  emotionalMap: {
    intensiveEmotions: string;
    overloadSigns: string[];
    calmingStrategies: string[];
  };
  bondStrengthening: {
    affectionTypes: string[];
    connectionRituals: string[];
    loveLanguage: string;
  };
  growthPoints: {
    positiveTrends: string[];
    negativeTrends: string[];
    limitStrategies: string[];
  };
  teachingStyle: {
    learningStyle: string;
    feedbackStrategies: string[];
  };
  developmentPlan: {
    week1: string[];
    week2: string[];
    week3: string[];
    week4: string[];
  };
  microScripts: {
    scenario1: {
      title: string;
      trap: string;
      script: string;
    };
    scenario2: {
      title: string;
      trap: string;
      script: string;
    };
  };
  communicationKeys: {
    goodPhrases: string[];
    avoidPhrases: string[];
    goldenPhrases: string[];
  };
  activities: Activity[];
}

export interface Activity {
  title: string;
  steps: string[];
  competency: string;
  context: string;
  discTarget: string;
  intelligenceStimulated: string;
}

export type AppStep = 
  | 'welcome'
  | 'auth'
  | 'dashboard'
  | 'child-info'
  | 'questionnaire'
  | 'processing'
  | 'report'
  | 'payment';