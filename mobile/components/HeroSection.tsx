import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Colors } from '../constants/theme';

const { width } = Dimensions.get('window');

interface HeroSectionProps {
  title: string;
  subtitle?: string;
}

export default function HeroSection({ title, subtitle }: HeroSectionProps) {
  return (
    <View
      style={{
        backgroundColor: Colors.primary,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        width,
        overflow: 'hidden',
      }}
    >
      <Animated.View entering={FadeInDown.duration(600)} style={{ alignItems: 'center', padding: 20 }}>
        <Text
          style={{
            color: Colors.gold,
            fontSize: 14,
            fontWeight: '600',
            letterSpacing: 2,
            textTransform: 'uppercase',
            marginBottom: 8,
          }}
        >
          FORSYTH COUNTY SCHOOLS
        </Text>
        <Text
          style={{
            color: Colors.white,
            fontSize: 26,
            fontWeight: '800',
            textAlign: 'center',
            lineHeight: 34,
          }}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: 14,
              textAlign: 'center',
              marginTop: 8,
              lineHeight: 20,
            }}
          >
            {subtitle}
          </Text>
        )}
      </Animated.View>
    </View>
  );
}
