import { NavigatorScreenParams } from '@react-navigation/native';

export type MainTabParamList = {
  Dashboard: undefined;
  Exercicios: undefined;
  Historico: undefined;
  Evolucao: undefined;
  Perfil: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Main: NavigatorScreenParams<MainTabParamList>;
  SessaoRespiracao: { exerciseId: string };
  FinalizacaoSessao: { sessionData: any };
};
