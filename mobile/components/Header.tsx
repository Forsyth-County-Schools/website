import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/theme';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightComponent?: React.ReactNode;
}

export default function Header({ title, showBack, onBack, rightComponent }: HeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        backgroundColor: Colors.primary,
        paddingTop: insets.top,
        paddingHorizontal: 16,
        paddingBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      {showBack ? (
        <TouchableOpacity onPress={onBack} accessibilityLabel="Go back">
          <Ionicons name="arrow-back" size={24} color={Colors.white} />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 24 }} />
      )}
      <Text
        style={{
          color: Colors.white,
          fontSize: 18,
          fontWeight: '700',
          flex: 1,
          textAlign: 'center',
        }}
        numberOfLines={1}
        accessibilityRole="header"
      >
        {title || 'FCS Schools'}
      </Text>
      <View style={{ width: 24 }}>{rightComponent}</View>
    </View>
  );
}
