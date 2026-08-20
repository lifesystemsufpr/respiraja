import React from 'react';
import { View, StyleSheet, ViewProps, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme';

interface ScreenProps extends ViewProps {
  children: React.ReactNode;
  safeArea?: boolean;
  padding?: boolean;
}

export const Screen = ({ children, safeArea = true, padding = true, style, ...props }: ScreenProps) => {
  const insets = useSafeAreaInsets();
  
  const content = (
    <View style={[styles.container, padding && styles.padding, style]} {...props}>
      {children}
    </View>
  );

  if (safeArea) {
    return (
      <View style={[styles.safeArea, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        {content}
      </View>
    );
  }

  return <View style={styles.safeArea}>{content}</View>;
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  padding: {
    paddingHorizontal: 20,
  },
});
