import { User, Child, Evaluation } from './types';

// Simulação de banco de dados local (localStorage)
class LocalStorage {
  private getItem<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  private setItem<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Usuários
  getUsers(): User[] {
    return this.getItem<User[]>('bussola_users') || [];
  }

  saveUser(user: User): void {
    const users = this.getUsers();
    const existingIndex = users.findIndex(u => u.id === user.id);
    if (existingIndex >= 0) {
      users[existingIndex] = user;
    } else {
      users.push(user);
    }
    this.setItem('bussola_users', users);
  }

  getUserByEmail(email: string): User | null {
    const users = this.getUsers();
    return users.find(u => u.email === email) || null;
  }

  // Crianças
  getChildren(userId: string): Child[] {
    const children = this.getItem<Child[]>('bussola_children') || [];
    return children.filter(c => c.userId === userId);
  }

  saveChild(child: Child): void {
    const children = this.getItem<Child[]>('bussola_children') || [];
    const existingIndex = children.findIndex(c => c.id === child.id);
    if (existingIndex >= 0) {
      children[existingIndex] = child;
    } else {
      children.push(child);
    }
    this.setItem('bussola_children', children);
  }

  // Avaliações
  getEvaluations(userId: string): Evaluation[] {
    const evaluations = this.getItem<Evaluation[]>('bussola_evaluations') || [];
    return evaluations.filter(e => e.userId === userId);
  }

  saveEvaluation(evaluation: Evaluation): void {
    const evaluations = this.getItem<Evaluation[]>('bussola_evaluations') || [];
    const existingIndex = evaluations.findIndex(e => e.id === evaluation.id);
    if (existingIndex >= 0) {
      evaluations[existingIndex] = evaluation;
    } else {
      evaluations.push(evaluation);
    }
    this.setItem('bussola_evaluations', evaluations);
  }

  // Sessão atual
  getCurrentUser(): User | null {
    return this.getItem<User>('bussola_current_user');
  }

  setCurrentUser(user: User | null): void {
    if (user) {
      this.setItem('bussola_current_user', user);
    } else {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('bussola_current_user');
      }
    }
  }
}

export const db = new LocalStorage();

// Funções de autenticação
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function hashPassword(password: string): string {
  // Em produção, usar bcrypt ou similar
  return btoa(password);
}

export function verifyPassword(password: string, hash: string): boolean {
  return btoa(password) === hash;
}

export function createUser(email: string, password: string, name: string): User {
  return {
    id: generateId(),
    email,
    name,
    createdAt: new Date(),
    evaluationsCount: 0,
    hasPaidAccess: false
  };
}

export function createChild(name: string, age: number, userId: string): Child {
  return {
    id: generateId(),
    name,
    age,
    userId,
    createdAt: new Date()
  };
}

// Simulação de pagamento
export function simulatePayment(amount: number): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simula sucesso em 90% dos casos
      resolve(Math.random() > 0.1);
    }, 2000);
  });
}