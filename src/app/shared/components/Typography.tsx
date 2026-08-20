import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';
import { colors } from '../theme';

interface TypographyProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
  color?: string;
  weight?: 'normal' | 'bold' | '600';
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

export const Typography = ({
  variant = 'body',
  color = colors.text,
  weight,
  align = 'auto',
  style,
  children,
  ...props
}: TypographyProps) => {
  return (
    <Text
      style={[
        styles[variant],
        { color, textAlign: align },
        weight && { fontWeight: weight },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  h3: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.muted,
  },
});
