"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { Child } from '@/lib/types';

interface ChildInfoProps {
  onNext: (child: Child, respondentRole: string) => void;
  onBack: () => void;
  userId: string;
}

export function ChildInfo({ onNext, onBack, userId }: ChildInfoProps) {
  const [childData, setChildData] = useState({
    name: '',
    age: ''
  });
  const [respondentRole, setRespondentRole] = useState('');
  const [hasConfirmed, setHasConfirmed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!childData.name.trim() || !childData.age || !respondentRole || !hasConfirmed) {
      return;
    }

    const child: Child = {
      id: Math.random().toString(36).substr(2, 9),
      name: childData.name.trim(),
      age: parseInt(childData.age),
      userId,
      createdAt: new Date()
    };

    onNext(child, respondentRole);
  };

  const isFormValid = childData.name.trim() && 
                     childData.age && 
                     parseInt(childData.age) >= 2 && 
                     parseInt(childData.age) <= 10 && 
                     respondentRole && 
                     hasConfirmed;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Informações da Criança
          </h1>
          <p className="text-gray-600">
            Vamos conhecer um pouco sobre o seu pequeno
          </p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Dados da Criança</CardTitle>
            <CardDescription>
              Essas informações nos ajudam a personalizar a análise
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nome da criança */}
              <div className="space-y-2">
                <Label htmlFor="child-name">Nome da criança *</Label>
                <Input
                  id="child-name"
                  type="text"
                  placeholder="Digite o nome da criança"
                  value={childData.name}
                  onChange={(e) => setChildData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="border-gray-200 focus:border-blue-500"
                />
              </div>

              {/* Idade */}
              <div className="space-y-2">
                <Label htmlFor="child-age">Idade *</Label>
                <Select 
                  value={childData.age} 
                  onValueChange={(value) => setChildData(prev => ({ ...prev, age: value }))}
                >
                  <SelectTrigger className="border-gray-200 focus:border-blue-500">
                    <SelectValue placeholder="Selecione a idade" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 9 }, (_, i) => i + 2).map(age => (
                      <SelectItem key={age} value={age.toString()}>
                        {age} anos
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Papel do respondente */}
              <div className="space-y-2">
                <Label htmlFor="respondent-role">Seu papel na vida da criança *</Label>
                <Select value={respondentRole} onValueChange={setRespondentRole}>
                  <SelectTrigger className="border-gray-200 focus:border-blue-500">
                    <SelectValue placeholder="Selecione seu papel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pai">Pai</SelectItem>
                    <SelectItem value="mae">Mãe</SelectItem>
                    <SelectItem value="educador">Educador(a)</SelectItem>
                    <SelectItem value="cuidador">Cuidador(a)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Nota importante */}
              <Alert className="border-orange-200 bg-orange-50">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-800">
                  <strong>Importante:</strong> Esta análise é de Comportamento Observável. 
                  Por se tratar de uma análise infantil (2 a 10 anos), o questionário deve ser 
                  respondido por um adulto (pai, mãe, educador ou cuidador) que observe o 
                  comportamento da criança com clareza e honestidade. A criança não deve 
                  responder a este questionário.
                </AlertDescription>
              </Alert>

              {/* Confirmação */}
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="confirmation"
                  checked={hasConfirmed}
                  onChange={(e) => setHasConfirmed(e.target.checked)}
                  className="mt-1"
                />
                <Label htmlFor="confirmation" className="text-sm leading-relaxed cursor-pointer">
                  Confirmo que sou um adulto responsável que convive com a criança diariamente 
                  e que responderei ao questionário baseado na observação do comportamento real 
                  da criança, não no que gostaria que ela fosse.
                </Label>
              </div>

              {/* Botões */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onBack}
                  className="flex-1"
                >
                  Voltar
                </Button>
                <Button 
                  type="submit"
                  disabled={!isFormValid}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  Continuar
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
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