"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { QUESTIONS } from '@/lib/analysis';
import { QuestionResponse, Child } from '@/lib/types';

interface QuestionnaireProps {
  child: Child;
  respondentRole: string;
  onComplete: (responses: QuestionResponse[]) => void;
  onBack: () => void;
}

export function Questionnaire({ child, respondentRole, onComplete, onBack }: QuestionnaireProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<QuestionResponse[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');

  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;
  const question = QUESTIONS[currentQuestion];

  const handleNext = () => {
    if (!currentAnswer) return;

    const newResponse: QuestionResponse = {
      questionId: question.id,
      value: parseInt(currentAnswer)
    };

    const updatedResponses = [...responses];
    const existingIndex = updatedResponses.findIndex(r => r.questionId === question.id);
    
    if (existingIndex >= 0) {
      updatedResponses[existingIndex] = newResponse;
    } else {
      updatedResponses.push(newResponse);
    }

    setResponses(updatedResponses);

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setCurrentAnswer('');
    } else {
      onComplete(updatedResponses);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      const previousResponse = responses.find(r => r.questionId === QUESTIONS[currentQuestion - 1].id);
      setCurrentAnswer(previousResponse?.value.toString() || '');
    }
  };

  const scaleLabels = [
    { value: '1', label: 'Nunca', description: 'Nunca observo esse comportamento' },
    { value: '2', label: 'Raramente', description: 'Observo muito raramente' },
    { value: '3', label: 'Às Vezes', description: 'Observo ocasionalmente' },
    { value: '4', label: 'Frequentemente', description: 'Observo com frequência' },
    { value: '5', label: 'Sempre', description: 'Sempre observo esse comportamento' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Questionário - {child.name}
          </h1>
          <p className="text-gray-600">
            Responda baseado no que você observa no comportamento da criança
          </p>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              Pergunta {currentQuestion + 1} de {QUESTIONS.length}
            </span>
            <span className="text-sm font-medium text-blue-600">
              {Math.round(progress)}% concluído
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">
              {question.text}
            </CardTitle>
            <CardDescription>
              Com que frequência você observa esse comportamento em {child.name}?
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <RadioGroup 
              value={currentAnswer} 
              onValueChange={setCurrentAnswer}
              className="space-y-4"
            >
              {scaleLabels.map((option) => (
                <div key={option.value} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors">
                  <RadioGroupItem 
                    value={option.value} 
                    id={option.value}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label 
                      htmlFor={option.value} 
                      className="font-medium cursor-pointer block"
                    >
                      {option.label}
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">
                      {option.description}
                    </p>
                  </div>
                </div>
              ))}
            </RadioGroup>

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row gap-3 pt-8 mt-8 border-t border-gray-100">
              <Button 
                type="button" 
                variant="outline" 
                onClick={currentQuestion === 0 ? onBack : handlePrevious}
                className="flex-1"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {currentQuestion === 0 ? 'Voltar' : 'Anterior'}
              </Button>
              
              <Button 
                onClick={handleNext}
                disabled={!currentAnswer}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {currentQuestion === QUESTIONS.length - 1 ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Finalizar
                  </>
                ) : (
                  <>
                    Próxima
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-2">💡 Dicas para responder:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Pense no comportamento natural da criança, não no que você gostaria</li>
            <li>• Considere situações do dia a dia: casa, escola, brincadeiras</li>
            <li>• Seja honesto - não existem respostas certas ou erradas</li>
            <li>• Lembre-se de comportamentos dos últimos meses</li>
          </ul>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-xs text-gray-500">
          <p>Desenvolvido por Otnitech - Desenvolvimento Humano</p>
          <p>@otninascimento</p>
        </div>
      </div>
    </div>
  );
}