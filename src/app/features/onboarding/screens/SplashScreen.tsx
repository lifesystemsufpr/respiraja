import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Screen } from '../../../shared/components/Screen';
import { Typography } from '../../../shared/components/Typography';
import { colors } from '../../../shared/theme';
import { RootStackParamList } from '../../../shared/types/navigation';

export const SplashScreen = () => {
  const fadeAnim = new Animated.Value(0);
  const translateY = new Animated.Value(20); // Animates slightly upwards

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start(() => {
      // In a real app we might navigate to Onboarding or Main depending on logic,
      // but the RootNavigator already handles the initial route. This screen is just a manual splash 
      // if we want an animated entry before the logic finishes, or if we force it as initial.
    });
  }, []);

  return (
    <Screen safeArea={false} padding={false} style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY }] }]}>
        <Image 
          source={require('../../../../../assets/images/logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Typography variant="h1" style={styles.title}>
          Respira Já
        </Typography>
      </Animated.View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF', // Fundo branco conforme imagem
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: -20,
  },
  title: {
    color: '#0853E8', // Azul forte conforme a imagem
    fontSize: 42,
    fontWeight: 'bold',
  },
});
