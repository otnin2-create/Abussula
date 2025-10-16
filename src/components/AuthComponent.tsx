"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Heart, Shield, Star } from 'lucide-react';
import { User } from '@/lib/types';
import { db, validateEmail, hashPassword, verifyPassword, createUser } from '@/lib/database';

interface AuthComponentProps {
  onAuthSuccess: (user: User) => void;
}

export function AuthComponent({ onAuthSuccess }: AuthComponentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (!validateEmail(loginData.email)) {
        throw new Error('Email inválido');
      }

      const user = db.getUserByEmail(loginData.email);
      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      const isValidPassword = verifyPassword(loginData.password, hashPassword(loginData.password));
      if (!isValidPassword) {
        throw new Error('Senha incorreta');
      }

      db.setCurrentUser(user);
      onAuthSuccess(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro no login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (!registerData.name.trim()) {
        throw new Error('Nome é obrigatório');
      }

      if (!validateEmail(registerData.email)) {
        throw new Error('Email inválido');
      }

      if (registerData.password.length < 6) {
        throw new Error('Senha deve ter pelo menos 6 caracteres');
      }

      if (registerData.password !== registerData.confirmPassword) {
        throw new Error('Senhas não coincidem');
      }

      const existingUser = db.getUserByEmail(registerData.email);
      if (existingUser) {
        throw new Error('Email já cadastrado');
      }

      const newUser = createUser(registerData.email, registerData.password, registerData.name);
      db.saveUser(newUser);
      db.setCurrentUser(newUser);
      onAuthSuccess(newUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro no cadastro');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            A Bússola Kids
          </h1>
          <p className="text-gray-600 mt-2">O manual para o coração do teu pequeno</p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">Bem-vindo!</CardTitle>
            <CardDescription>
              Descubra o perfil único do seu pequeno
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Entrar</TabsTrigger>
                <TabsTrigger value="register">Cadastrar</TabsTrigger>
              </TabsList>

              {error && (
                <Alert className="mb-4 border-red-200 bg-red-50">
                  <AlertDescription className="text-red-700">{error}</AlertDescription>
                </Alert>
              )}

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className="border-gray-200 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Senha</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginData.password}
                      onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                      required
                      className="border-gray-200 focus:border-blue-500"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Entrando...' : 'Entrar'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Nome completo</Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="Seu nome"
                      value={registerData.name}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, name: e.target.value }))}
                      required
                      className="border-gray-200 focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={registerData.email}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className="border-gray-200 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Senha</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      value={registerData.password}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                      required
                      className="border-gray-200 focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-confirm">Confirmar senha</Label>
                    <Input
                      id="register-confirm"
                      type="password"
                      placeholder="••••••••"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      required
                      className="border-gray-200 focus:border-blue-500"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Cadastrando...' : 'Criar conta'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Features */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>Análise DISC + Múltiplas Inteligências</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Relatório completo e acionável</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>Estratégias personalizadas</span>
                </div>
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