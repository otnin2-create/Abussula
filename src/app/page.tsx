"use client";

import { useState, useEffect } from 'react';
import { AuthComponent } from '@/components/AuthComponent';
import { Dashboard } from '@/components/Dashboard';
import { ChildInfo } from '@/components/ChildInfo';
import { Questionnaire } from '@/components/Questionnaire';
import { Processing } from '@/components/Processing';
import { ReportView } from '@/components/ReportView';
import { Payment } from '@/components/Payment';
import { 
  User, 
  Child, 
  Evaluation, 
  QuestionResponse, 
  AppStep 
} from '@/lib/types';
import { 
  calculateDISCProfile, 
  calculateMultipleIntelligences, 
  generateFullReport 
} from '@/lib/analysis';
import { db, createChild, generateId } from '@/lib/database';

export default function BussolaKidsApp() {
  const [currentStep, setCurrentStep] = useState<AppStep>('welcome');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentChild, setCurrentChild] = useState<Child | null>(null);
  const [currentEvaluation, setCurrentEvaluation] = useState<Evaluation | null>(null);
  const [respondentRole, setRespondentRole] = useState('');
  const [needsPayment, setNeedsPayment] = useState(false);

  // Check for existing session on load
  useEffect(() => {
    const user = db.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setCurrentStep('dashboard');
    }
  }, []);

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    setCurrentStep('dashboard');
  };

  const handleLogout = () => {
    db.setCurrentUser(null);
    setCurrentUser(null);
    setCurrentChild(null);
    setCurrentEvaluation(null);
    setCurrentStep('welcome');
  };

  const handleStartEvaluation = () => {
    if (!currentUser) return;

    const evaluations = db.getEvaluations(currentUser.id);
    const canCreateFree = evaluations.length === 0;
    const hasAccess = currentUser.hasPaidAccess;

    if (!canCreateFree && !hasAccess) {
      setNeedsPayment(true);
      setCurrentStep('payment');
    } else {
      setCurrentStep('child-info');
    }
  };

  const handleChildInfoNext = (child: Child, role: string) => {
    setCurrentChild(child);
    setRespondentRole(role);
    db.saveChild(child);
    setCurrentStep('questionnaire');
  };

  const handleQuestionnaireComplete = (responses: QuestionResponse[]) => {
    if (!currentChild || !currentUser) return;

    setCurrentStep('processing');

    // Calculate profiles
    const discProfile = calculateDISCProfile(responses);
    const multipleIntelligences = calculateMultipleIntelligences(responses);
    const report = generateFullReport(discProfile, multipleIntelligences, currentChild.name);

    // Create evaluation
    const evaluation: Evaluation = {
      id: generateId(),
      childId: currentChild.id,
      userId: currentUser.id,
      respondentRole: respondentRole as any,
      responses,
      discProfile,
      multipleIntelligences,
      report,
      createdAt: new Date()
    };

    // Save evaluation
    db.saveEvaluation(evaluation);
    
    // Update user evaluation count
    const updatedUser = { 
      ...currentUser, 
      evaluationsCount: currentUser.evaluationsCount + 1 
    };
    db.saveUser(updatedUser);
    setCurrentUser(updatedUser);

    setCurrentEvaluation(evaluation);
  };

  const handleProcessingComplete = () => {
    setCurrentStep('report');
  };

  const handleViewReport = (evaluation: Evaluation) => {
    setCurrentEvaluation(evaluation);
    const child = db.getChildren(currentUser!.id).find(c => c.id === evaluation.childId);
    setCurrentChild(child || null);
    setCurrentStep('report');
  };

  const handlePaymentSuccess = () => {
    if (!currentUser) return;

    // Update user to have paid access for additional evaluations
    const updatedUser = { ...currentUser, hasPaidAccess: true };
    db.saveUser(updatedUser);
    setCurrentUser(updatedUser);
    setNeedsPayment(false);
    setCurrentStep('child-info');
  };

  const handlePaymentCancel = () => {
    setNeedsPayment(false);
    setCurrentStep('dashboard');
  };

  const handleBackToDashboard = () => {
    setCurrentChild(null);
    setCurrentEvaluation(null);
    setCurrentStep('dashboard');
  };

  // Render current step
  switch (currentStep) {
    case 'welcome':
      return <AuthComponent onAuthSuccess={handleAuthSuccess} />;

    case 'dashboard':
      return currentUser ? (
        <Dashboard
          user={currentUser}
          onStartEvaluation={handleStartEvaluation}
          onViewReport={handleViewReport}
          onLogout={handleLogout}
        />
      ) : null;

    case 'child-info':
      return currentUser ? (
        <ChildInfo
          onNext={handleChildInfoNext}
          onBack={handleBackToDashboard}
          userId={currentUser.id}
        />
      ) : null;

    case 'questionnaire':
      return currentChild ? (
        <Questionnaire
          child={currentChild}
          respondentRole={respondentRole}
          onComplete={handleQuestionnaireComplete}
          onBack={() => setCurrentStep('child-info')}
        />
      ) : null;

    case 'processing':
      return currentChild ? (
        <Processing
          childName={currentChild.name}
          onComplete={handleProcessingComplete}
        />
      ) : null;

    case 'report':
      return currentEvaluation && currentChild ? (
        <ReportView
          evaluation={currentEvaluation}
          child={currentChild}
          onBack={handleBackToDashboard}
        />
      ) : null;

    case 'payment':
      const evaluations = currentUser ? db.getEvaluations(currentUser.id) : [];
      const isFirstEvaluation = evaluations.length === 0;
      const amount = isFirstEvaluation ? 14.79 : 9.79;
      const description = isFirstEvaluation 
        ? 'Primeira avaliação completa DISC + Múltiplas Inteligências'
        : 'Avaliação adicional DISC + Múltiplas Inteligências';

      return (
        <Payment
          amount={amount}
          description={description}
          onSuccess={handlePaymentSuccess}
          onCancel={handlePaymentCancel}
        />
      );

    default:
      return <AuthComponent onAuthSuccess={handleAuthSuccess} />;
  }
}