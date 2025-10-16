"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Brain, Sparkles, FileText } from 'lucide-react';

interface ProcessingProps {
  childName: string;
  onComplete: () => void;
}

export function Processing({ childName, onComplete }: ProcessingProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { icon: Brain, text: 'Analisando respostas DISC...', duration: 2000 },
    { icon: Sparkles, text: 'Calculando Múltiplas Inteligências...', duration: 2000 },
    { icon: FileText, text: 'Gerando relatório personalizado...', duration: 3000 },
  ];

  useState(() => {
    let totalTime = 0;
    const stepDurations = steps.map(step => step.duration);
    const totalDuration = stepDurations.reduce((sum, duration) => sum + duration, 0);

    const runSteps = async () => {
      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(i);
        
        const stepDuration = stepDurations[i];
        const stepStartTime = totalTime;
        
        // Animate progress for this step
        const stepInterval = setInterval(() => {
          const elapsed = Date.now() - stepStartTime;
          const stepProgress = Math.min(elapsed / stepDuration, 1);
          const overallProgress = ((totalTime + elapsed) / totalDuration) * 100;
          setProgress(Math.min(overallProgress, 100));
        }, 50);

        await new Promise(resolve => setTimeout(resolve, stepDuration));
        clearInterval(stepInterval);
        totalTime += stepDuration;
      }

      setProgress(100);
      setTimeout(onComplete, 500);
    };

    runSteps();
  });

  const CurrentIcon = steps[currentStep]?.icon || Brain;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            {/* Animated Icon */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <CurrentIcon className="w-10 h-10 text-white" />
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Analisando {childName}
            </h2>
            
            <p className="text-gray-600 mb-8">
              Criando o perfil único do seu pequeno...
            </p>

            {/* Progress */}
            <div className="mb-6">
              <Progress value={progress} className="h-3 mb-3" />
              <p className="text-sm text-gray-600">
                {Math.round(progress)}% concluído
              </p>
            </div>

            {/* Current Step */}
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm font-medium text-blue-800">
                {steps[currentStep]?.text || 'Finalizando...'}
              </p>
            </div>

            {/* Fun Facts */}
            <div className="mt-8 text-xs text-gray-500 space-y-2">
              <p>💡 Cada criança é única e especial</p>
              <p>🧠 Analisando 44 aspectos comportamentais</p>
              <p>✨ Gerando estratégias personalizadas</p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-xs text-gray-500">
          <p>Desenvolvido por Otnitech - Desenvolvimento Humano</p>
          <p>@otninascimento</p>
        </div>
      </div>
    </div>
  );
}