import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Wind, Clock, TrendingUp, User } from 'lucide-react-native';
import { colors } from '../shared/theme';
import { MainTabParamList } from '../shared/types/navigation';
import { ExerciciosScreen } from '../features/breathing/screens/ExerciciosScreen';
import { HomeScreen } from '../features/dashboard/screens/HomeScreen';
import { HistoricoScreen } from '../features/history/screens/HistoricoScreen';
import { EvolucaoScreen } from '../features/evolution/screens/EvolucaoScreen';
import { PerfilScreen } from '../features/profile/screens/PerfilScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.surface,
          elevation: 0,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={HomeScreen}
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Exercicios"
        component={ExerciciosScreen}
        options={{
          title: 'Exercícios',
          tabBarIcon: ({ color, size }) => <Wind color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Historico"
        component={HistoricoScreen}
        options={{
          title: 'Histórico',
          tabBarIcon: ({ color, size }) => <Clock color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Evolucao"
        component={EvolucaoScreen}
        options={{
          title: 'Evolução',
          tabBarIcon: ({ color, size }) => <TrendingUp color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};
