# RespiraJá 🫁

RespiraJá é um aplicativo móvel *offline-first* voltado para exercícios respiratórios guiados e acompanhamento de bem-estar.

## 🎯 Objetivo

Permitir que o usuário realize exercícios respiratórios de maneira guiada, registre as sessões realizadas e acompanhe sua evolução localmente. O aplicativo foi desenhado com foco em simplicidade, acessibilidade e respeito à privacidade (todos os dados permanecem no dispositivo).

**Aviso:** O RespiraJá é uma ferramenta de bem-estar e não substitui acompanhamento médico ou terapia profissional.

## 🛠️ Stack Tecnológico

- **React Native** (0.86+) & **Expo** (~57.0)
- **TypeScript** (Strict mode)
- **Navegação:** `@react-navigation/native` (Bottom Tabs & Native Stack)
- **Estado e Persistência:** `zustand` + `@react-native-async-storage/async-storage`
- **Ícones:** `lucide-react-native`

## 🏗️ Arquitetura (Feature-Sliced Design)

O projeto adota os princípios do Feature-Sliced Design (FSD), focado em manter o código altamente modular e as responsabilidades isoladas.

```
src/app/
├── features/               # Funcionalidades modulares
│   ├── onboarding/         # Tela de splash e introdução
│   ├── dashboard/          # Resumo do progresso diário
│   ├── breathing/          # Core: Padrões, timer, state machine
│   ├── history/            # Histórico de sessões passadas
│   ├── evolution/          # Estatísticas e evolução no tempo
│   └── profile/            # Configurações do usuário e limpeza de dados
│
├── navigation/             # Configuração de rotas (@react-navigation)
│   ├── RootNavigator.tsx
│   └── MainTabNavigator.tsx
│
└── shared/                 # Código reutilizável entre as features
    ├── components/         # Button, Card, Screen, Typography
    ├── theme/              # Cores, espaçamento e tipografia base
    └── types/              # Tipos transversais (ex: navigation param list)
```

### Regras de Ouro
1. **Screens:** Apenas apresentam a UI e interagem com Hooks. Nunca acessam `AsyncStorage` diretamente.
2. **Hooks/Services:** Lidam com regras de negócio (ex: `useBreathingSession.ts` controla a máquina de estado do timer de respiração independente da UI).
3. **Store:** Gerencia o estado reativo global e hidratação local (`zustand`).

## 📶 Funcionamento Offline-First

O aplicativo foi projetado para funcionar 100% sem internet. 
Não há requisições externas, APIs ou Firebase. Todas as configurações do perfil e sessões respiratórias são persistidas no próprio dispositivo do usuário através do `AsyncStorage` via middlewares do Zustand.

## 🚀 Como Executar

1. **Instalar dependências:**
   ```bash
   npm install
   ```
2. **Iniciar o servidor do Expo:**
   ```bash
   npm start
   # ou
   npx expo start
   ```
3. **Visualizar:**
   - Para Android: Pressione `a` no terminal ou use o aplicativo Expo Go via QR Code.
   - Para iOS: Pressione `i` no terminal para abrir no Simulador iOS.

## ✅ Como Executar Validações

O projeto utiliza TypeScript estrito. Para validar a tipagem em toda a base de código:
```bash
npx tsc --noEmit
```

## ➕ Como Adicionar um Novo Exercício Respiratório

A adição de novos padrões não exige criação de telas novas. Basta editar o arquivo central de serviços do domínio de respiração:

**Arquivo:** `src/app/features/breathing/services/breathingPatterns.ts`

**Exemplo de adição:**
```typescript
{
  id: 'novo-exercicio',
  name: 'Respiração Rápida',
  description: 'Um exercício para ganhar energia rapidamente.',
  duration: 180, // 3 minutos
  steps: [
    { phase: 'inhale', duration: 2 },
    { phase: 'exhale', duration: 2 },
  ],
}
```
A máquina de estado (`useBreathingSession`) e a UI (`SessaoRespiracaoScreen`) se adaptarão automaticamente aos novos passos e durações.
