import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewProps } from 'react-native';
import { colors, radius, spacing } from '../theme';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  onPress?: () => void;
}

export const Card = ({ children, style, onPress, ...props }: CardProps) => {
  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={[styles.card, style]}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.card, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
});
