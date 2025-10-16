"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Download, 
  ArrowLeft, 
  Heart, 
  Brain, 
  Target, 
  Lightbulb,
  MessageCircle,
  Calendar,
  PlayCircle,
  Star
} from 'lucide-react';
import { Evaluation, Child } from '@/lib/types';
import { generatePDFReport, downloadPDF } from '@/lib/pdf-generator';

interface ReportViewProps {
  evaluation: Evaluation;
  child: Child;
  onBack: () => void;
}

export function ReportView({ evaluation, child, onBack }: ReportViewProps) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const pdfBlob = await generatePDFReport(
        child.name,
        child.age,
        evaluation.discProfile,
        evaluation.multipleIntelligences,
        evaluation.report
      );
      downloadPDF(pdfBlob, `bussola-kids-${child.name.toLowerCase().replace(/\s+/g, '-')}.pdf`);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const { discProfile, multipleIntelligences, report } = evaluation;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Relatório de {child.name}
                </h1>
                <p className="text-gray-600">{child.age} anos • {discProfile.combinationName}</p>
              </div>
            </div>
            <Button 
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <Download className="w-4 h-4 mr-2" />
              {isGeneratingPDF ? 'Gerando...' : 'Baixar PDF'}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Summary */}
        <Card className="mb-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">
                  {discProfile.combinationName}
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Perfil {discProfile.primary}/{discProfile.secondary}
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold mb-1">✨</div>
                <p className="text-sm text-blue-100">Superpoder</p>
                <p className="font-semibold">{report.superpower}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {Object.entries(discProfile.scores).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-2xl font-bold">{value}%</div>
                  <div className="text-sm text-blue-100">{key}</div>
                </div>
              ))}
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-blue-100 text-sm mb-2">Visão de Mundo:</p>
              <p className="font-medium">{report.worldView}</p>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="intelligence" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="intelligence" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              <span className="hidden sm:inline">Inteligências</span>
            </TabsTrigger>
            <TabsTrigger value="emotional" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Emocional</span>
            </TabsTrigger>
            <TabsTrigger value="communication" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Comunicação</span>
            </TabsTrigger>
            <TabsTrigger value="activities" className="flex items-center gap-2">
              <PlayCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Atividades</span>
            </TabsTrigger>
          </TabsList>

          {/* Múltiplas Inteligências */}
          <TabsContent value="intelligence">
            <div className="grid gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-blue-600" />
                    Múltiplas Inteligências
                  </CardTitle>
                  <CardDescription>
                    As principais formas como {child.name} aprende e processa informações
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {multipleIntelligences.ranking.slice(0, 5).map((intelligence, index) => (
                      <div key={intelligence.type} className="flex items-center gap-4">
                        <Badge variant={index < 3 ? "default" : "secondary"}>
                          #{index + 1}
                        </Badge>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">{intelligence.name}</span>
                            <span className="text-sm text-gray-600">{intelligence.score} pontos</span>
                          </div>
                          <Progress value={(intelligence.score / 15) * 100} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-green-600" />
                    Como Ensinar Este Perfil
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Estilo de Aprendizagem Ideal:</h4>
                      <p className="text-gray-700">{report.teachingStyle.learningStyle}</p>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-semibold mb-2">Estratégias de Feedback:</h4>
                      <ul className="space-y-1">
                        {report.teachingStyle.feedbackStrategies.map((strategy, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">•</span>
                            <span className="text-gray-700">{strategy}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Mapa Emocional */}
          <TabsContent value="emotional">
            <div className="grid gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-600" />
                    Mapa Emocional
                  </CardTitle>
                  <CardDescription>
                    Como {child.name} lida com emoções e como você pode ajudar
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2 text-red-600">Emoções Intensas:</h4>
                      <p className="text-gray-700 bg-red-50 p-3 rounded-lg">
                        {report.emotionalMap.intensiveEmotions}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 text-orange-600">Sinais de Sobrecarga:</h4>
                      <div className="grid gap-2">
                        {report.emotionalMap.overloadSigns.map((sign, index) => (
                          <div key={index} className="flex items-center gap-2 bg-orange-50 p-2 rounded">
                            <span className="text-orange-600">⚠️</span>
                            <span className="text-gray-700">{sign}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 text-green-600">Estratégias para Acalmar:</h4>
                      <div className="grid gap-2">
                        {report.emotionalMap.calmingStrategies.map((strategy, index) => (
                          <div key={index} className="flex items-center gap-2 bg-green-50 p-2 rounded">
                            <span className="text-green-600">✅</span>
                            <span className="text-gray-700">{strategy}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-pink-600" />
                    Como Fortalecer o Vínculo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Linguagem do Amor:</h4>
                      <p className="text-gray-700 bg-pink-50 p-3 rounded-lg font-medium">
                        {report.bondStrengthening.loveLanguage}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Rituais de Conexão:</h4>
                      <ul className="space-y-2">
                        {report.bondStrengthening.connectionRituals.map((ritual, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-pink-600 mt-1">💝</span>
                            <span className="text-gray-700">{ritual}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Comunicação */}
          <TabsContent value="communication">
            <div className="grid gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-blue-600" />
                    Micro-Scripts para Desafios
                  </CardTitle>
                  <CardDescription>
                    Diálogos práticos para situações desafiadoras
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-3">{report.microScripts.scenario1.title}</h4>
                      <div className="space-y-3">
                        <div className="bg-red-50 p-3 rounded border-l-4 border-red-400">
                          <p className="text-sm font-medium text-red-800 mb-1">❌ Evitar dizer:</p>
                          <p className="text-red-700">{report.microScripts.scenario1.trap}</p>
                        </div>
                        <div className="bg-green-50 p-3 rounded border-l-4 border-green-400">
                          <p className="text-sm font-medium text-green-800 mb-1">✅ Script do acolhimento:</p>
                          <p className="text-green-700">{report.microScripts.scenario1.script}</p>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-3">{report.microScripts.scenario2.title}</h4>
                      <div className="space-y-3">
                        <div className="bg-red-50 p-3 rounded border-l-4 border-red-400">
                          <p className="text-sm font-medium text-red-800 mb-1">❌ Evitar dizer:</p>
                          <p className="text-red-700">{report.microScripts.scenario2.trap}</p>
                        </div>
                        <div className="bg-green-50 p-3 rounded border-l-4 border-green-400">
                          <p className="text-sm font-medium text-green-800 mb-1">✅ Script do acolhimento:</p>
                          <p className="text-green-700">{report.microScripts.scenario2.script}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-600" />
                    Frases de Ouro
                  </CardTitle>
                  <CardDescription>
                    Palavras que funcionam especialmente bem com {child.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {report.communicationKeys.goldenPhrases.map((phrase, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                        <span className="text-yellow-600 font-bold">{index + 1}.</span>
                        <span className="text-gray-700 font-medium">"{phrase}"</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Atividades */}
          <TabsContent value="activities">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PlayCircle className="w-5 h-5 text-purple-600" />
                  Plano de Atividades Personalizadas
                </CardTitle>
                <CardDescription>
                  8 brincadeiras desenvolvidas especialmente para o perfil de {child.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {report.activities.map((activity, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold text-lg">{activity.title}</h4>
                        <Badge variant="outline">#{index + 1}</Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-purple-600 mb-1">DISC Desenvolvido:</p>
                          <p className="text-sm text-gray-700">{activity.discTarget}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-blue-600 mb-1">Inteligência Estimulada:</p>
                          <p className="text-sm text-gray-700">{activity.intelligenceStimulated}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium text-green-600 mb-1">Competência Desenvolvida:</p>
                        <p className="text-sm text-gray-700">{activity.competency}</p>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium text-orange-600 mb-2">Passo a Passo:</p>
                        <ol className="space-y-1">
                          {activity.steps.map((step, stepIndex) => (
                            <li key={stepIndex} className="text-sm text-gray-700 flex gap-2">
                              <span className="font-medium text-orange-600">{stepIndex + 1}.</span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">Contexto Sugerido:</p>
                        <p className="text-sm text-gray-700">{activity.context}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Development Plan */}
        <Card className="mt-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-600" />
              Plano de Desenvolvimento - 30 Dias
            </CardTitle>
            <CardDescription>
              Cronograma semanal para desenvolvimento socioemocional
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(report.developmentPlan).map(([week, activities], index) => (
                <div key={week} className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-3 text-indigo-600">
                    Semana {index + 1}
                  </h4>
                  <ul className="space-y-2">
                    {activities.map((activity, actIndex) => (
                      <li key={actIndex} className="flex items-start gap-2 text-sm">
                        <span className="text-indigo-600 mt-1">•</span>
                        <span className="text-gray-700">{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-xs text-gray-500">
        <p>Desenvolvido por Otnitech - Desenvolvimento Humano</p>
        <p>@otninascimento</p>
      </div>
    </div>
  );
}