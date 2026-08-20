import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RootStackParamList } from '../shared/types/navigation';
import { MainTabNavigator } from './MainTabNavigator';
import { SplashScreen, WelcomeScreen } from '../features/onboarding';
import { SessaoRespiracaoScreen } from '../features/breathing/screens/SessaoRespiracaoScreen';
import { FinalizacaoSessaoScreen } from '../features/breathing/screens/FinalizacaoSessaoScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const [isReady, setIsReady] = useState(false);
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList>('Splash');

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const hasCompleted = await AsyncStorage.getItem('@respiraja_onboarding_completed');
        if (hasCompleted === 'true') {
          setInitialRoute('Main');
        } else {
          setInitialRoute('Onboarding');
        }
      } catch (error) {
        setInitialRoute('Onboarding');
      } finally {
        setIsReady(true);
      }
    };
    checkOnboarding();
  }, []);

  if (!isReady) return <SplashScreen />;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={WelcomeScreen} />
        <Stack.Screen name="Main" component={MainTabNavigator} />
        <Stack.Screen name="SessaoRespiracao" component={SessaoRespiracaoScreen} />
        <Stack.Screen name="FinalizacaoSessao" component={FinalizacaoSessaoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
