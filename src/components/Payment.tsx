"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, CreditCard, CheckCircle, XCircle } from 'lucide-react';
import { simulatePayment } from '@/lib/database';

interface PaymentProps {
  amount: number;
  description: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function Payment({ amount, description, onSuccess, onCancel }: PaymentProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');

  const handlePayment = async () => {
    setIsProcessing(true);
    setPaymentStatus('processing');

    try {
      const success = await simulatePayment(amount);
      
      if (success) {
        setPaymentStatus('success');
        setTimeout(() => {
          onSuccess();
        }, 2000);
      } else {
        setPaymentStatus('error');
        setTimeout(() => {
          setPaymentStatus('idle');
          setIsProcessing(false);
        }, 3000);
      }
    } catch (error) {
      setPaymentStatus('error');
      setTimeout(() => {
        setPaymentStatus('idle');
        setIsProcessing(false);
      }, 3000);
    }
  };

  if (paymentStatus === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm text-center">
          <CardContent className="p-8">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">Pagamento Aprovado!</h2>
            <p className="text-gray-600 mb-4">
              Sua avaliação será processada em instantes...
            </p>
            <div className="flex justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (paymentStatus === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm text-center">
          <CardContent className="p-8">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-red-600 mb-2">Pagamento Recusado</h2>
            <p className="text-gray-600 mb-6">
              Houve um problema com o processamento. Tente novamente.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onCancel} className="flex-1">
                Cancelar
              </Button>
              <Button 
                onClick={() => {
                  setPaymentStatus('idle');
                  setIsProcessing(false);
                }}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600"
              >
                Tentar Novamente
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Finalizar Compra
          </h1>
          <p className="text-gray-600">
            Complete o pagamento para acessar sua avaliação
          </p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Detalhes da Compra
            </CardTitle>
            <CardDescription>
              {description}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {/* Pricing */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">Avaliação DISC + MI</span>
                <span className="font-semibold">€{amount.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                <span>Taxa de processamento</span>
                <span>€0,00</span>
              </div>
              <div className="border-t pt-2 flex items-center justify-between">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-2xl text-blue-600">€{amount.toFixed(2)}</span>
              </div>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">O que está incluído:</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Análise completa DISC + Múltiplas Inteligências</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Relatório detalhado com estratégias práticas</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Mapa emocional personalizado</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>8 atividades personalizadas</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Plano de desenvolvimento de 30 dias</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Download em PDF</span>
                </li>
              </ul>
            </div>

            {/* Payment Simulation Notice */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
              <p className="text-sm text-yellow-800">
                <strong>Demonstração:</strong> Este é um pagamento simulado para fins de demonstração. 
                Nenhuma cobrança real será feita.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <Button 
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Pagar €{amount.toFixed(2)}
                  </>
                )}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={onCancel}
                disabled={isProcessing}
                className="w-full"
              >
                Cancelar
              </Button>
            </div>

            {/* Security */}
            <div className="mt-6 text-center">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <Badge variant="outline" className="text-xs">
                  🔒 Pagamento Seguro
                </Badge>
                <Badge variant="outline" className="text-xs">
                  SSL Criptografado
                </Badge>
              </div>
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