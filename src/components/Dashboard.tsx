"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, FileText, User, LogOut, CreditCard } from 'lucide-react';
import { User as UserType, Child, Evaluation } from '@/lib/types';
import { db } from '@/lib/database';

interface DashboardProps {
  user: UserType;
  onStartEvaluation: () => void;
  onViewReport: (evaluation: Evaluation) => void;
  onLogout: () => void;
}

export function Dashboard({ user, onStartEvaluation, onViewReport, onLogout }: DashboardProps) {
  const [children, setChildren] = useState<Child[]>([]);
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);

  useEffect(() => {
    setChildren(db.getChildren(user.id));
    setEvaluations(db.getEvaluations(user.id));
  }, [user.id]);

  const canCreateNewEvaluation = user.hasPaidAccess || evaluations.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                A Bússola Kids
              </h1>
              <p className="text-gray-600">Olá, {user.name}!</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={user.hasPaidAccess ? "default" : "secondary"}>
                {user.hasPaidAccess ? 'Acesso Completo' : 'Avaliação Gratuita'}
              </Badge>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Crianças</p>
                  <p className="text-2xl font-bold">{children.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <FileText className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Relatórios</p>
                  <p className="text-2xl font-bold">{evaluations.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="text-sm font-semibold text-purple-600">
                    {user.hasPaidAccess ? 'Premium' : 'Gratuito'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* New Evaluation Card */}
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white mb-8 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Nova Avaliação
            </CardTitle>
            <CardDescription className="text-blue-100">
              {canCreateNewEvaluation 
                ? 'Crie uma nova análise comportamental para uma criança'
                : 'Adquira acesso completo para criar mais avaliações'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="text-sm text-blue-100">
                {!user.hasPaidAccess && evaluations.length === 0 && (
                  <p>✨ Primeira avaliação gratuita!</p>
                )}
                {!user.hasPaidAccess && evaluations.length > 0 && (
                  <p>💎 Avaliações adicionais: €9,79 cada</p>
                )}
                {user.hasPaidAccess && (
                  <p>🎉 Avaliações ilimitadas incluídas!</p>
                )}
              </div>
              <Button 
                onClick={onStartEvaluation}
                disabled={!canCreateNewEvaluation}
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                {!user.hasPaidAccess && evaluations.length > 0 
                  ? 'Comprar Avaliação (€9,79)' 
                  : 'Iniciar Avaliação'
                }
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Evaluations List */}
        {evaluations.length > 0 && (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Seus Relatórios</CardTitle>
              <CardDescription>
                Acesse os relatórios já criados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {evaluations.map((evaluation) => {
                  const child = children.find(c => c.id === evaluation.childId);
                  return (
                    <div 
                      key={evaluation.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div>
                        <h3 className="font-semibold">{child?.name || 'Criança'}</h3>
                        <p className="text-sm text-gray-600">
                          {child?.age} anos • {evaluation.discProfile.combinationName}
                        </p>
                        <p className="text-xs text-gray-500">
                          Criado em {new Date(evaluation.createdAt).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <Button 
                        onClick={() => onViewReport(evaluation)}
                        variant="outline"
                        size="sm"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Ver Relatório
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {evaluations.length === 0 && (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg text-center py-12">
            <CardContent>
              <div className="max-w-md mx-auto">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Nenhum relatório ainda</h3>
                <p className="text-gray-600 mb-6">
                  Crie sua primeira avaliação para descobrir o perfil único do seu pequeno!
                </p>
                <Button 
                  onClick={onStartEvaluation}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Primeira Avaliação
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-xs text-gray-500">
        <p>Desenvolvido por Otnitech - Desenvolvimento Humano</p>
        <p>@otninascimento</p>
      </div>
    </div>
  );
}