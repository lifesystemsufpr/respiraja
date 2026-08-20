import React from 'react';
import { TouchableOpacity, StyleSheet, TouchableOpacityProps, ActivityIndicator, View } from 'react-native';
import { Typography } from './Typography';
import { colors, radius, spacing } from '../theme';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button = ({
  title,
  variant = 'primary',
  isLoading = false,
  icon,
  style,
  disabled,
  ...props
}: ButtonProps) => {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isOutline = variant === 'outline';

  const getBackgroundColor = () => {
    if (disabled) return colors.muted;
    if (isPrimary) return colors.primary;
    if (isSecondary) return colors.secondary;
    return 'transparent';
  };

  const getTextColor = () => {
    if (isPrimary || isSecondary) return '#FFFFFF';
    if (disabled) return colors.muted;
    return colors.primary;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled || isLoading}
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor() },
        isOutline && styles.outline,
        style,
      ]}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <View style={styles.content}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Typography
            weight="600"
            color={getTextColor()}
            style={styles.text}
          >
            {title}
          </Typography>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  outline: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: spacing.sm,
  },
  text: {
    fontSize: 16,
  },
});
