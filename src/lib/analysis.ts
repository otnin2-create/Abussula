import { Question, DISCProfile, MultipleIntelligences, FullReport, QuestionResponse } from './types';

// Banco de perguntas DISC + MI alternadas estrategicamente
export const QUESTIONS: Question[] = [
  // DISC - Dominância
  { id: 'q1', text: 'A criança toma decisões rapidamente durante as brincadeiras', category: 'D' },
  { id: 'q2', text: 'A criança prefere liderar grupos de amigos', category: 'D' },
  { id: 'q3', text: 'A criança fica impaciente quando as coisas demoram', category: 'D' },
  { id: 'q4', text: 'A criança gosta de desafios e competições', category: 'D' },
  { id: 'q5', text: 'A criança questiona regras que não entende', category: 'D' },

  // DISC - Influência
  { id: 'q6', text: 'A criança inicia conversas com pessoas novas facilmente', category: 'I' },
  { id: 'q7', text: 'A criança gosta de ser o centro das atenções', category: 'I' },
  { id: 'q8', text: 'A criança conta histórias de forma animada', category: 'I' },
  { id: 'q9', text: 'A criança faz amigos rapidamente', category: 'I' },
  { id: 'q10', text: 'A criança expressa emoções de forma intensa', category: 'I' },

  // DISC - Estabilidade
  { id: 'q11', text: 'A criança prefere rotinas previsíveis', category: 'S' },
  { id: 'q12', text: 'A criança demora para se adaptar a mudanças', category: 'S' },
  { id: 'q13', text: 'A criança é paciente com atividades longas', category: 'S' },
  { id: 'q14', text: 'A criança evita conflitos com outros', category: 'S' },
  { id: 'q15', text: 'A criança gosta de ajudar os outros', category: 'S' },

  // DISC - Conformidade
  { id: 'q16', text: 'A criança segue instruções detalhadamente', category: 'C' },
  { id: 'q17', text: 'A criança organiza seus brinquedos sistematicamente', category: 'C' },
  { id: 'q18', text: 'A criança faz muitas perguntas sobre como as coisas funcionam', category: 'C' },
  { id: 'q19', text: 'A criança é perfeccionista em suas atividades', category: 'C' },
  { id: 'q20', text: 'A criança prefere atividades com regras claras', category: 'C' },

  // Múltiplas Inteligências - Linguística
  { id: 'q21', text: 'A criança gosta de ouvir e contar histórias', category: 'MI', miType: 'linguistic' },
  { id: 'q22', text: 'A criança tem facilidade com palavras e vocabulário', category: 'MI', miType: 'linguistic' },
  { id: 'q23', text: 'A criança gosta de jogos com palavras e rimas', category: 'MI', miType: 'linguistic' },

  // Múltiplas Inteligências - Lógico-Matemática
  { id: 'q24', text: 'A criança gosta de quebra-cabeças e problemas lógicos', category: 'MI', miType: 'logical' },
  { id: 'q25', text: 'A criança tem facilidade com números e contagem', category: 'MI', miType: 'logical' },
  { id: 'q26', text: 'A criança gosta de classificar e organizar objetos', category: 'MI', miType: 'logical' },

  // Múltiplas Inteligências - Espacial
  { id: 'q27', text: 'A criança gosta de desenhar e criar arte visual', category: 'MI', miType: 'spatial' },
  { id: 'q28', text: 'A criança tem boa orientação espacial', category: 'MI', miType: 'spatial' },
  { id: 'q29', text: 'A criança gosta de construir com blocos ou lego', category: 'MI', miType: 'spatial' },

  // Múltiplas Inteligências - Musical
  { id: 'q30', text: 'A criança tem facilidade para lembrar melodias', category: 'MI', miType: 'musical' },
  { id: 'q31', text: 'A criança gosta de cantar e dançar', category: 'MI', miType: 'musical' },
  { id: 'q32', text: 'A criança percebe diferentes sons e ritmos', category: 'MI', miType: 'musical' },

  // Múltiplas Inteligências - Corporal-Cinestésica
  { id: 'q33', text: 'A criança aprende melhor através do movimento', category: 'MI', miType: 'bodily' },
  { id: 'q34', text: 'A criança tem boa coordenação motora', category: 'MI', miType: 'bodily' },
  { id: 'q35', text: 'A criança gosta de atividades físicas e esportes', category: 'MI', miType: 'bodily' },

  // Múltiplas Inteligências - Interpessoal
  { id: 'q36', text: 'A criança entende bem os sentimentos dos outros', category: 'MI', miType: 'interpersonal' },
  { id: 'q37', text: 'A criança gosta de trabalhar em grupo', category: 'MI', miType: 'interpersonal' },
  { id: 'q38', text: 'A criança é boa em resolver conflitos entre amigos', category: 'MI', miType: 'interpersonal' },

  // Múltiplas Inteligências - Intrapessoal
  { id: 'q39', text: 'A criança gosta de momentos sozinha para reflexão', category: 'MI', miType: 'intrapersonal' },
  { id: 'q40', text: 'A criança conhece bem suas próprias emoções', category: 'MI', miType: 'intrapersonal' },
  { id: 'q41', text: 'A criança tem objetivos e sonhos bem definidos', category: 'MI', miType: 'intrapersonal' },

  // Múltiplas Inteligências - Naturalista
  { id: 'q42', text: 'A criança gosta de atividades na natureza', category: 'MI', miType: 'naturalist' },
  { id: 'q43', text: 'A criança tem interesse por animais e plantas', category: 'MI', miType: 'naturalist' },
  { id: 'q44', text: 'A criança gosta de colecionar elementos da natureza', category: 'MI', miType: 'naturalist' },
];

// Combinações comportamentais DISC
export const DISC_COMBINATIONS = {
  'D/I': 'Líder Carismático',
  'D/S': 'Líder Protetor',
  'D/C': 'Líder Estratégico',
  'I/D': 'Inspirador Corajoso',
  'I/S': 'Inspirador Acolhedor',
  'I/C': 'Inspirador Detalhista',
  'S/D': 'Cuidador Determinado',
  'S/I': 'Cuidador Sociável',
  'S/C': 'Cuidador Organizado',
  'C/D': 'Analista Decidido',
  'C/I': 'Analista Comunicativo',
  'C/S': 'Analista Paciente'
};

// Nomes das inteligências múltiplas
export const MI_NAMES = {
  linguistic: 'Linguística',
  logical: 'Lógico-Matemática',
  spatial: 'Espacial',
  musical: 'Musical',
  bodily: 'Corporal-Cinestésica',
  interpersonal: 'Interpessoal',
  intrapersonal: 'Intrapessoal',
  naturalist: 'Naturalista'
};

// Função para calcular perfil DISC
export function calculateDISCProfile(responses: QuestionResponse[]): DISCProfile {
  const scores = { D: 0, I: 0, S: 0, C: 0 };
  
  responses.forEach(response => {
    const question = QUESTIONS.find(q => q.id === response.questionId);
    if (question && question.category !== 'MI') {
      scores[question.category as keyof typeof scores] += response.value;
    }
  });

  // Normalizar scores (0-100)
  const total = Object.values(scores).reduce((sum, score) => sum + score, 0);
  const normalizedScores = {
    D: Math.round((scores.D / total) * 100),
    I: Math.round((scores.I / total) * 100),
    S: Math.round((scores.S / total) * 100),
    C: Math.round((scores.C / total) * 100)
  };

  // Encontrar primário e secundário
  const sortedScores = Object.entries(normalizedScores)
    .sort(([,a], [,b]) => b - a);
  
  const primary = sortedScores[0][0] as 'D' | 'I' | 'S' | 'C';
  const secondary = sortedScores[1][0] as 'D' | 'I' | 'S' | 'C';
  
  const combinationKey = `${primary}/${secondary}` as keyof typeof DISC_COMBINATIONS;
  const combinationName = DISC_COMBINATIONS[combinationKey];

  return {
    primary,
    secondary,
    scores: normalizedScores,
    combinationName,
    description: generateDISCDescription(primary, secondary)
  };
}

// Função para calcular múltiplas inteligências
export function calculateMultipleIntelligences(responses: QuestionResponse[]): MultipleIntelligences {
  const scores: Record<string, number> = {};
  
  responses.forEach(response => {
    const question = QUESTIONS.find(q => q.id === response.questionId);
    if (question && question.category === 'MI' && question.miType) {
      if (!scores[question.miType]) scores[question.miType] = 0;
      scores[question.miType] += response.value;
    }
  });

  const ranking = Object.entries(scores)
    .map(([type, score]) => ({
      type,
      score,
      name: MI_NAMES[type as keyof typeof MI_NAMES]
    }))
    .sort((a, b) => b.score - a.score);

  return {
    ranking,
    topThree: ranking.slice(0, 3).map(item => item.type)
  };
}

// Função para gerar descrição DISC
function generateDISCDescription(primary: string, secondary: string): string {
  const descriptions = {
    'D': 'Criança determinada, gosta de liderar e tomar decisões rapidamente.',
    'I': 'Criança sociável, expressiva e que gosta de interagir com outros.',
    'S': 'Criança calma, paciente e que valoriza estabilidade e harmonia.',
    'C': 'Criança detalhista, organizada e que gosta de seguir regras.'
  };
  
  return `${descriptions[primary as keyof typeof descriptions]} ${descriptions[secondary as keyof typeof descriptions]}`;
}

// Função para gerar relatório completo
export function generateFullReport(
  discProfile: DISCProfile,
  multipleIntelligences: MultipleIntelligences,
  childName: string
): FullReport {
  return {
    profileSummary: `${childName} possui o perfil ${discProfile.combinationName} (${discProfile.primary}/${discProfile.secondary}), combinando ${discProfile.description}`,
    
    worldView: generateWorldView(discProfile.primary),
    superpower: generateSuperpowerName(discProfile.primary),
    
    behavioralIndicators: generateBehavioralIndicators(discProfile),
    emotionalMap: generateEmotionalMap(discProfile),
    bondStrengthening: generateBondStrengthening(discProfile),
    growthPoints: generateGrowthPoints(discProfile),
    teachingStyle: generateTeachingStyle(discProfile, multipleIntelligences),
    developmentPlan: generateDevelopmentPlan(discProfile),
    microScripts: generateMicroScripts(discProfile),
    communicationKeys: generateCommunicationKeys(discProfile),
    activities: generateActivities(discProfile, multipleIntelligences)
  };
}

function generateWorldView(primary: string): string {
  const worldViews = {
    'D': 'O mundo é um desafio a ser vencido e liderado',
    'I': 'O mundo é um palco para se expressar e conectar',
    'S': 'O mundo é um lugar para cuidar e harmonizar',
    'C': 'O mundo é um sistema para entender e organizar'
  };
  return worldViews[primary as keyof typeof worldViews];
}

function generateSuperpowerName(primary: string): string {
  const superpowers = {
    'D': 'Liderança Natural',
    'I': 'Inspiração Contagiante',
    'S': 'Coração Acolhedor',
    'C': 'Mente Organizadora'
  };
  return superpowers[primary as keyof typeof superpowers];
}

function generateBehavioralIndicators(discProfile: DISCProfile) {
  const indicators = {
    'D': {
      home: ['Toma iniciativa em atividades familiares', 'Gosta de liderar brincadeiras com irmãos', 'Pode ser impaciente com rotinas lentas'],
      school: ['Levanta a mão primeiro para responder', 'Gosta de ser monitor da turma', 'Pode questionar regras que não entende'],
      friends: ['Naturalmente assume papel de líder', 'Organiza brincadeiras e jogos', 'Pode ser competitivo'],
      balance: ['Confiante e determinado', 'Toma decisões rapidamente', 'Enfrenta desafios com coragem'],
      imbalance: ['Pode ser dominador demais', 'Impaciência excessiva', 'Dificuldade em aceitar "não"']
    },
    'I': {
      home: ['Conta histórias animadas sobre o dia', 'Gosta de receber visitas', 'Expressa emoções intensamente'],
      school: ['Participa ativamente das aulas', 'Faz amigos facilmente', 'Gosta de apresentações'],
      friends: ['Centro das atenções no grupo', 'Anima os outros', 'Gosta de atividades sociais'],
      balance: ['Otimista e entusiasmado', 'Comunica-se bem', 'Inspira outros'],
      imbalance: ['Pode falar demais', 'Busca atenção excessiva', 'Dificuldade em ficar quieto']
    },
    'S': {
      home: ['Prefere rotinas previsíveis', 'Gosta de ajudar nas tarefas', 'É paciente com irmãos menores'],
      school: ['Trabalha bem em grupo', 'É colaborativo', 'Evita conflitos'],
      friends: ['É leal e confiável', 'Medeia conflitos', 'Prefere grupos pequenos'],
      balance: ['Calmo e estável', 'Empático e cuidadoso', 'Bom ouvinte'],
      imbalance: ['Pode ser muito passivo', 'Dificuldade com mudanças', 'Evita confrontos necessários']
    },
    'C': {
      home: ['Organiza seus brinquedos', 'Faz muitas perguntas', 'Gosta de regras claras'],
      school: ['Caprichoso nos trabalhos', 'Segue instruções detalhadamente', 'Gosta de pesquisar'],
      friends: ['Prefere atividades estruturadas', 'É detalhista', 'Gosta de jogos com regras'],
      balance: ['Organizado e sistemático', 'Atento aos detalhes', 'Busca qualidade'],
      imbalance: ['Pode ser perfeccionista demais', 'Ansiedade com mudanças', 'Crítico excessivo']
    }
  };

  return indicators[discProfile.primary as keyof typeof indicators] || indicators['D'];
}

function generateEmotionalMap(discProfile: DISCProfile) {
  const maps = {
    'D': {
      intensiveEmotions: 'Expressa frustração quando não consegue liderar ou quando as coisas não saem como planejado. Pode ter explosões de raiva, mas se recupera rapidamente.',
      overloadSigns: ['Fica mais autoritário que o normal', 'Impaciência extrema', 'Pode gritar ou bater o pé', 'Recusa-se a obedecer'],
      calmingStrategies: ['Ofereça escolhas: "Você quer fazer X ou Y?"', 'Reconheça sua liderança: "Você tem boas ideias"', 'Dê tempo para se acalmar sozinho', 'Proponha um desafio positivo']
    },
    'I': {
      intensiveEmotions: 'Vive emoções de forma intensa e contagiante. Quando triste, pode dramatizar; quando feliz, transborda alegria.',
      overloadSigns: ['Fala excessivamente', 'Busca atenção de forma inadequada', 'Pode fazer birra teatral', 'Fica mais agitado'],
      calmingStrategies: ['Dê atenção positiva: "Conte-me sobre isso"', 'Use humor para desarmar tensões', 'Permita expressão emocional', 'Ofereça abraços e carinho físico']
    },
    'S': {
      intensiveEmotions: 'Tende a internalizar emoções. Pode parecer calmo por fora, mas estar sofrendo por dentro. Demora para explodir, mas quando acontece, é intenso.',
      overloadSigns: ['Fica mais quieto que o normal', 'Evita contato visual', 'Pode chorar silenciosamente', 'Resiste a mudanças'],
      calmingStrategies: ['Ofereça segurança: "Está tudo bem, estou aqui"', 'Mantenha rotinas reconfortantes', 'Dê tempo para processar', 'Use toque suave e reconfortante']
    },
    'C': {
      intensiveEmotions: 'Pode ficar ansioso quando as coisas não estão "certas" ou organizadas. Preocupa-se com detalhes e pode ter medos específicos.',
      overloadSigns: ['Fica mais crítico', 'Preocupação excessiva', 'Pode ter comportamentos repetitivos', 'Ansiedade visível'],
      calmingStrategies: ['Explique o "porquê" das situações', 'Ofereça estrutura e previsibilidade', 'Valide suas preocupações', 'Ensine técnicas de respiração']
    }
  };

  return maps[discProfile.primary as keyof typeof maps] || maps['D'];
}

function generateBondStrengthening(discProfile: DISCProfile) {
  const bonds = {
    'D': {
      affectionTypes: ['Reconhecimento de conquistas', 'Elogios por liderança', 'Tempo de qualidade em atividades desafiadoras'],
      connectionRituals: ['Competições amigáveis pai/mãe vs criança', 'Deixar a criança escolher a atividade familiar', 'Celebrar suas vitórias e conquistas'],
      loveLanguage: 'Palavras de Afirmação - especialmente reconhecendo sua capacidade de liderança e conquistas'
    },
    'I': {
      affectionTypes: ['Atenção total e exclusiva', 'Elogios públicos', 'Atividades sociais juntos'],
      connectionRituals: ['Tempo de conversa sem interrupções', 'Brincadeiras teatrais e criativas', 'Contar histórias juntos'],
      loveLanguage: 'Tempo de Qualidade - com foco total na criança, sem distrações'
    },
    'S': {
      affectionTypes: ['Carinho físico', 'Segurança emocional', 'Tradições familiares'],
      connectionRituals: ['Abraços longos e aconchegantes', 'Leitura antes de dormir', 'Atividades calmas juntos'],
      loveLanguage: 'Toque Físico - abraços, carinhos, colo, demonstrações físicas de afeto'
    },
    'C': {
      affectionTypes: ['Interesse genuíno em seus projetos', 'Ajuda em atividades detalhadas', 'Reconhecimento de seu capricho'],
      connectionRituals: ['Projetos manuais juntos', 'Explorar como as coisas funcionam', 'Organizar espaços juntos'],
      loveLanguage: 'Atos de Serviço - ajudar em projetos, organizar junto, ensinar coisas novas'
    }
  };

  return bonds[discProfile.primary as keyof typeof bonds] || bonds['D'];
}

function generateGrowthPoints(discProfile: DISCProfile) {
  const growth = {
    'D': {
      positiveTrends: ['Desenvolve liderança natural', 'Aprende a tomar decisões', 'Constrói autoconfiança'],
      negativeTrends: ['Pode se tornar dominador', 'Dificuldade em aceitar autoridade', 'Impaciência com outros'],
      limitStrategies: ['Ofereça escolhas dentro de limites', 'Explique o "porquê" das regras', 'Use consequências lógicas', 'Reconheça quando obedece']
    },
    'I': {
      positiveTrends: ['Desenvolve habilidades sociais', 'Aprende a se expressar', 'Constrói otimismo'],
      negativeTrends: ['Pode buscar atenção inadequada', 'Dificuldade em ouvir outros', 'Impulsividade'],
      limitStrategies: ['Dê atenção positiva preventiva', 'Ensine a esperar sua vez', 'Use redirecionamento positivo', 'Celebre comportamentos adequados']
    },
    'S': {
      positiveTrends: ['Desenvolve empatia', 'Aprende cooperação', 'Constrói relacionamentos sólidos'],
      negativeTrends: ['Pode ser muito passivo', 'Dificuldade em se defender', 'Resistência a mudanças'],
      limitStrategies: ['Seja gentil mas firme', 'Prepare para mudanças com antecedência', 'Ensine assertividade', 'Use encorajamento constante']
    },
    'C': {
      positiveTrends: ['Desenvolve atenção aos detalhes', 'Aprende organização', 'Constrói senso de qualidade'],
      negativeTrends: ['Pode ser perfeccionista demais', 'Ansiedade com erros', 'Crítico com outros'],
      limitStrategies: ['Explique regras claramente', 'Seja consistente', 'Ensine que erros são normais', 'Elogie o esforço, não só o resultado']
    }
  };

  return growth[discProfile.primary as keyof typeof growth] || growth['D'];
}

function generateTeachingStyle(discProfile: DISCProfile, mi: MultipleIntelligences) {
  const styles = {
    'D': {
      learningStyle: 'Aprende melhor com desafios, competições e quando pode liderar. Prefere atividades práticas e resultados rápidos.',
      feedbackStrategies: ['Seja direto e específico', 'Foque nos resultados alcançados', 'Ofereça novos desafios', 'Reconheça liderança']
    },
    'I': {
      learningStyle: 'Aprende melhor em grupos, com interação social e atividades criativas. Precisa de variedade e estímulo visual.',
      feedbackStrategies: ['Use elogios públicos', 'Seja entusiasmado', 'Conte histórias', 'Use humor positivo']
    },
    'S': {
      learningStyle: 'Aprende melhor em ambiente calmo, com instruções passo a passo e tempo para processar. Prefere trabalho colaborativo.',
      feedbackStrategies: ['Seja gentil e encorajador', 'Dê tempo para responder', 'Use tom calmo', 'Reconheça esforço']
    },
    'C': {
      learningStyle: 'Aprende melhor com instruções detalhadas, exemplos claros e tempo para fazer com qualidade. Gosta de entender o "porquê".',
      feedbackStrategies: ['Seja específico e detalhado', 'Explique o raciocínio', 'Reconheça qualidade', 'Dê tempo para perguntas']
    }
  };

  return styles[discProfile.primary as keyof typeof styles] || styles['D'];
}

function generateDevelopmentPlan(discProfile: DISCProfile) {
  const plans = {
    'D': {
      week1: ['Praticar esperar sua vez em jogos', 'Exercitar paciência com atividades de 10 minutos', 'Reconhecer quando outros têm boas ideias'],
      week2: ['Aprender a pedir ao invés de ordenar', 'Praticar ouvir antes de falar', 'Exercitar empatia perguntando como outros se sentem'],
      week3: ['Desenvolver colaboração em projetos', 'Praticar aceitar "não" como resposta', 'Exercitar autocontrole em situações frustrantes'],
      week4: ['Consolidar habilidades de liderança positiva', 'Praticar resolução de conflitos', 'Celebrar crescimento em paciência e empatia']
    },
    'I': {
      week1: ['Praticar ouvir outros por 2 minutos sem interromper', 'Exercitar atividades individuais por 15 minutos', 'Aprender a esperar sua vez para falar'],
      week2: ['Desenvolver foco em uma atividade por vez', 'Praticar expressar sentimentos com palavras', 'Exercitar empatia ouvindo outros'],
      week3: ['Aprender a brincar sozinho por períodos maiores', 'Praticar seguir instruções sem questionar', 'Exercitar paciência em filas'],
      week4: ['Consolidar habilidades de comunicação equilibrada', 'Praticar liderança inclusiva', 'Celebrar crescimento em autocontrole']
    },
    'S': {
      week1: ['Praticar expressar opiniões em situações seguras', 'Exercitar tomar pequenas decisões', 'Aprender a dizer "não" quando necessário'],
      week2: ['Desenvolver confiança em atividades novas', 'Praticar iniciar conversas', 'Exercitar liderança em grupos pequenos'],
      week3: ['Aprender a lidar com mudanças pequenas', 'Praticar defender suas ideias gentilmente', 'Exercitar independência em tarefas'],
      week4: ['Consolidar habilidades de assertividade', 'Praticar adaptabilidade', 'Celebrar crescimento em confiança']
    },
    'C': {
      week1: ['Praticar aceitar "bom o suficiente" em atividades', 'Exercitar flexibilidade com mudanças pequenas', 'Aprender que erros são oportunidades'],
      week2: ['Desenvolver tolerância a imperfeições', 'Praticar tomar decisões rápidas', 'Exercitar criatividade sem regras rígidas'],
      week3: ['Aprender a trabalhar com prazos', 'Praticar colaboração sem controlar tudo', 'Exercitar espontaneidade'],
      week4: ['Consolidar habilidades de flexibilidade', 'Praticar autocompaixão', 'Celebrar crescimento em adaptabilidade']
    }
  };

  return plans[discProfile.primary as keyof typeof plans] || plans['D'];
}

function generateMicroScripts(discProfile: DISCProfile) {
  const scripts = {
    'D': {
      scenario1: {
        title: 'Lidando com Frustração/Birra',
        trap: '"Pare de gritar!" ou "Você não pode fazer isso!"',
        script: '"Vejo que você está frustrado. Você quer tentar de novo ou precisa de um tempo para se acalmar? Você escolhe."'
      },
      scenario2: {
        title: 'Mudança de Rotina',
        trap: '"Você tem que aceitar, não tem escolha!"',
        script: '"Sei que você gosta de liderar. Como podemos fazer essa mudança funcionar? Qual sua ideia?"'
      }
    },
    'I': {
      scenario1: {
        title: 'Lidando com Frustração/Birra',
        trap: '"Pare de fazer drama!" ou "Você está exagerando!"',
        script: '"Vejo que você está chateado. Conte-me o que aconteceu. Estou aqui para ouvir você."'
      },
      scenario2: {
        title: 'Mudança de Rotina',
        trap: '"Não tem problema, você vai gostar!"',
        script: '"Essa mudança pode ser uma aventura! Como você acha que vai ser? Vamos descobrir juntos!"'
      }
    },
    'S': {
      scenario1: {
        title: 'Lidando com Frustração/Birra',
        trap: '"Não precisa chorar por isso!"',
        script: '"Está tudo bem ficar chateado. Estou aqui com você. Vamos respirar juntos até você se sentir melhor."'
      },
      scenario2: {
        title: 'Mudança de Rotina',
        trap: '"Vai ser rápido, não se preocupe!"',
        script: '"Sei que mudanças são difíceis para você. Vamos conversar sobre o que vai acontecer, passo a passo."'
      }
    },
    'C': {
      scenario1: {
        title: 'Lidando com Frustração/Birra',
        trap: '"Não é para ser perfeito!"',
        script: '"Vejo que você queria que ficasse do seu jeito. Que tal tentarmos de uma forma diferente? Você tem alguma ideia?"'
      },
      scenario2: {
        title: 'Mudança de Rotina',
        trap: '"Não vai ser tão diferente assim!"',
        script: '"Vou explicar exatamente o que vai mudar e o que vai continuar igual. Você pode fazer perguntas sobre qualquer coisa."'
      }
    }
  };

  return scripts[discProfile.primary as keyof typeof scripts] || scripts['D'];
}

function generateCommunicationKeys(discProfile: DISCProfile) {
  const keys = {
    'D': {
      goodPhrases: ['Você é um líder natural', 'Que decisão inteligente', 'Você consegue fazer isso'],
      avoidPhrases: ['Você não pode', 'Porque eu disse', 'Pare de mandar'],
      goldenPhrases: [
        '"Você tem ideias incríveis para liderar!"',
        '"Que tal você escolher como vamos fazer isso?"',
        '"Vejo um líder corajoso em você!"',
        '"Sua determinação é inspiradora!"',
        '"Você sabe tomar boas decisões!"',
        '"Que tal você me ensinar como fazer?"',
        '"Você é forte e capaz!"',
        '"Admiro sua coragem!"',
        '"Você tem o poder de escolher!"',
        '"Que orgulho da sua liderança!"'
      ]
    },
    'I': {
      goodPhrases: ['Você ilumina nosso dia', 'Que história interessante', 'Você tem um dom especial'],
      avoidPhrases: ['Fale menos', 'Ninguém quer ouvir', 'Você fala demais'],
      goldenPhrases: [
        '"Você traz alegria para todos ao redor!"',
        '"Adoro ouvir suas histórias!"',
        '"Você tem um coração gigante!"',
        '"Sua energia é contagiante!"',
        '"Você sabe fazer os outros sorrirem!"',
        '"Que talento incrível você tem!"',
        '"Você é uma luz na vida das pessoas!"',
        '"Sua criatividade me impressiona!"',
        '"Você sabe se expressar muito bem!"',
        '"Que sorte temos de ter você!"'
      ]
    },
    'S': {
      goodPhrases: ['Você é muito cuidadoso', 'Que coração bondoso', 'Você ajuda tanto'],
      avoidPhrases: ['Seja mais rápido', 'Não seja tímido', 'Fale mais alto'],
      goldenPhrases: [
        '"Você tem um coração de ouro!"',
        '"Sua gentileza toca meu coração!"',
        '"Você é um amigo incrível!"',
        '"Que cuidado especial você tem!"',
        '"Você traz paz para nossa família!"',
        '"Sua paciência é admirável!"',
        '"Você sabe cuidar tão bem dos outros!"',
        '"Que sorte ter alguém tão carinhoso!"',
        '"Você é nosso tesouro!"',
        '"Sua presença nos acalma!"'
      ]
    },
    'C': {
      goodPhrases: ['Que trabalho caprichado', 'Você é muito inteligente', 'Que atenção aos detalhes'],
      avoidPhrases: ['Não precisa ser perfeito', 'Você pensa demais', 'Relaxa'],
      goldenPhrases: [
        '"Sua atenção aos detalhes é impressionante!"',
        '"Você faz tudo com tanto capricho!"',
        '"Que mente brilhante você tem!"',
        '"Admiro sua dedicação!"',
        '"Você sempre faz com qualidade!"',
        '"Suas perguntas são muito inteligentes!"',
        '"Você é nosso pequeno cientista!"',
        '"Que organização perfeita!"',
        '"Você pensa em tudo!"',
        '"Sua curiosidade é maravilhosa!"'
      ]
    }
  };

  return keys[discProfile.primary as keyof typeof keys] || keys['D'];
}

function generateActivities(discProfile: DISCProfile, mi: MultipleIntelligences) {
  const baseActivities = {
    'D': [
      {
        title: 'Caça ao Tesouro Competitiva',
        steps: ['Crie pistas desafiadoras', 'Estabeleça tempo limite', 'Deixe a criança liderar a busca', 'Celebre a conquista'],
        competency: 'Liderança e tomada de decisão',
        context: 'Casa ou parque',
        discTarget: 'Dominância - liderança natural',
        intelligenceStimulated: 'Espacial e Lógico-Matemática'
      },
      {
        title: 'Projeto de Construção Livre',
        steps: ['Ofereça materiais diversos', 'Proponha um desafio', 'Deixe a criança planejar', 'Apoie suas decisões'],
        competency: 'Planejamento e execução',
        context: 'Casa',
        discTarget: 'Dominância - iniciativa',
        intelligenceStimulated: 'Espacial e Corporal-Cinestésica'
      }
    ],
    'I': [
      {
        title: 'Teatro de Fantoches',
        steps: ['Crie personagens juntos', 'Invente uma história', 'Apresente para a família', 'Grave a apresentação'],
        competency: 'Expressão e comunicação',
        context: 'Casa',
        discTarget: 'Influência - expressividade',
        intelligenceStimulated: 'Linguística e Interpessoal'
      },
      {
        title: 'Festa Temática Criativa',
        steps: ['Escolha um tema juntos', 'Planeje decoração', 'Convide amigos/família', 'Seja o anfitrião'],
        competency: 'Habilidades sociais e criatividade',
        context: 'Casa',
        discTarget: 'Influência - sociabilidade',
        intelligenceStimulated: 'Interpessoal e Musical'
      }
    ],
    'S': [
      {
        title: 'Jardim da Paciência',
        steps: ['Plante sementes juntos', 'Crie rotina de cuidados', 'Observe crescimento diário', 'Celebre cada progresso'],
        competency: 'Paciência e cuidado',
        context: 'Casa ou escola',
        discTarget: 'Estabilidade - persistência',
        intelligenceStimulated: 'Naturalista e Intrapessoal'
      },
      {
        title: 'Álbum de Memórias Familiares',
        steps: ['Colete fotos antigas', 'Organize cronologicamente', 'Escreva legendas juntos', 'Compartilhe histórias'],
        competency: 'Organização e vínculos afetivos',
        context: 'Casa',
        discTarget: 'Estabilidade - valorização de tradições',
        intelligenceStimulated: 'Intrapessoal e Linguística'
      }
    ],
    'C': [
      {
        title: 'Laboratório de Experimentos',
        steps: ['Escolha experimento simples', 'Liste materiais necessários', 'Siga instruções passo a passo', 'Documente resultados'],
        competency: 'Método científico e precisão',
        context: 'Casa',
        discTarget: 'Conformidade - atenção aos detalhes',
        intelligenceStimulated: 'Lógico-Matemática e Naturalista'
      },
      {
        title: 'Sistema de Organização Pessoal',
        steps: ['Analise espaço atual', 'Crie categorias lógicas', 'Implemente sistema', 'Mantenha organização'],
        competency: 'Organização e sistematização',
        context: 'Quarto da criança',
        discTarget: 'Conformidade - organização',
        intelligenceStimulated: 'Lógico-Matemática e Espacial'
      }
    ]
  };

  // Pega as atividades base do perfil primário e adiciona mais 6 atividades personalizadas
  const primaryActivities = baseActivities[discProfile.primary as keyof typeof baseActivities] || baseActivities['D'];
  
  // Adiciona atividades complementares baseadas nas inteligências múltiplas
  const additionalActivities = generateMIActivities(mi, discProfile);
  
  return [...primaryActivities, ...additionalActivities].slice(0, 8);
}

function generateMIActivities(mi: MultipleIntelligences, discProfile: DISCProfile) {
  const miActivities: Record<string, any> = {
    linguistic: {
      title: 'Criação de Histórias Ilustradas',
      steps: ['Invente uma história', 'Desenhe ilustrações', 'Escreva ou dite o texto', 'Apresente para outros'],
      competency: 'Narrativa e expressão verbal',
      context: 'Casa ou escola',
      discTarget: `${discProfile.primary} - comunicação`,
      intelligenceStimulated: 'Linguística e Espacial'
    },
    logical: {
      title: 'Desafios de Lógica Divertidos',
      steps: ['Apresente quebra-cabeças', 'Resolva passo a passo', 'Explique o raciocínio', 'Crie novos desafios'],
      competency: 'Raciocínio lógico e resolução de problemas',
      context: 'Casa',
      discTarget: `${discProfile.primary} - análise`,
      intelligenceStimulated: 'Lógico-Matemática'
    },
    spatial: {
      title: 'Arte e Construção 3D',
      steps: ['Visualize o projeto', 'Reúna materiais', 'Construa em etapas', 'Apresente criação'],
      competency: 'Visualização espacial e criatividade',
      context: 'Casa',
      discTarget: `${discProfile.primary} - criatividade`,
      intelligenceStimulated: 'Espacial e Corporal-Cinestésica'
    },
    musical: {
      title: 'Banda Familiar',
      steps: ['Escolha instrumentos', 'Crie ritmos simples', 'Componha melodia', 'Faça apresentação'],
      competency: 'Expressão musical e coordenação',
      context: 'Casa',
      discTarget: `${discProfile.primary} - expressão`,
      intelligenceStimulated: 'Musical e Corporal-Cinestésica'
    },
    bodily: {
      title: 'Circuito de Habilidades Motoras',
      steps: ['Monte obstáculos seguros', 'Demonstre movimentos', 'Pratique coordenação', 'Cronometre progressos'],
      competency: 'Coordenação motora e perseverança',
      context: 'Casa ou parque',
      discTarget: `${discProfile.primary} - persistência`,
      intelligenceStimulated: 'Corporal-Cinestésica'
    },
    interpersonal: {
      title: 'Projeto de Ajuda Comunitária',
      steps: ['Identifique necessidade', 'Planeje ação', 'Execute com outros', 'Reflita sobre impacto'],
      competency: 'Empatia e colaboração',
      context: 'Comunidade',
      discTarget: `${discProfile.primary} - colaboração`,
      intelligenceStimulated: 'Interpessoal'
    },
    intrapersonal: {
      title: 'Diário de Autoconhecimento',
      steps: ['Crie diário personalizado', 'Reflita sobre sentimentos', 'Desenhe emoções', 'Compartilhe descobertas'],
      competency: 'Autoconhecimento e reflexão',
      context: 'Casa',
      discTarget: `${discProfile.primary} - autoconhecimento`,
      intelligenceStimulated: 'Intrapessoal e Linguística'
    },
    naturalist: {
      title: 'Exploração da Natureza',
      steps: ['Explore ambiente natural', 'Colete amostras seguras', 'Classifique descobertas', 'Crie guia da natureza'],
      competency: 'Observação e classificação',
      context: 'Parque ou jardim',
      discTarget: `${discProfile.primary} - observação`,
      intelligenceStimulated: 'Naturalista e Lógico-Matemática'
    }
  };

  return mi.topThree.slice(0, 6).map(type => miActivities[type]).filter(Boolean);
}