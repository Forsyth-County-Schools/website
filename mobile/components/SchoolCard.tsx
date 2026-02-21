import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { School } from '../types';
import { Colors } from '../constants/theme';

interface SchoolCardProps {
  school: School;
  onPress?: (school: School) => void;
  index?: number;
}

const levelColors: Record<string, string> = {
  high: '#C8102E',
  middle: '#FF8C00',
  elementary: '#10B981',
};

const levelLabels: Record<string, string> = {
  high: 'High School',
  middle: 'Middle School',
  elementary: 'Elementary School',
};

export default function SchoolCard({ school, onPress, index = 0 }: SchoolCardProps) {
  return (
    <Animated.View entering={FadeInRight.delay(index * 60).duration(400)}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => onPress?.(school)}
        accessibilityLabel={`${school.name}, ${levelLabels[school.level]}`}
        accessibilityRole="button"
      >
        <View style={styles.levelBadge}>
          <View style={[styles.levelDot, { backgroundColor: levelColors[school.level] }]} />
          <Text style={styles.levelText}>{levelLabels[school.level]}</Text>
        </View>
        <Text style={styles.name}>{school.name}</Text>
        <View style={styles.row}>
          <Ionicons name="location-outline" size={14} color={Colors.gray[500]} />
          <Text style={styles.address}>{school.address}, {school.city}</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="call-outline" size={14} color={Colors.gray[500]} />
          <Text style={styles.phone}>{school.phone}</Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.row}>
            <Ionicons name="people-outline" size={14} color={Colors.gray[500]} />
            <Text style={styles.meta}>{school.enrollment.toLocaleString()} students</Text>
          </View>
          <View style={styles.row}>
            <Ionicons name="star" size={14} color={Colors.gold} />
            <Text style={styles.meta}>{school.rating}</Text>
          </View>
        </View>
        <View style={styles.principalRow}>
          <Text style={styles.principalLabel}>Principal: </Text>
          <Text style={styles.principalName}>{school.principal.name}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  levelDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  levelText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.gray[500],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  address: {
    fontSize: 13,
    color: Colors.gray[600],
    flex: 1,
  },
  phone: {
    fontSize: 13,
    color: Colors.gray[600],
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[100],
  },
  meta: {
    fontSize: 13,
    color: Colors.gray[500],
    marginLeft: 4,
  },
  principalRow: {
    flexDirection: 'row',
    marginTop: 6,
  },
  principalLabel: {
    fontSize: 13,
    color: Colors.gray[500],
  },
  principalName: {
    fontSize: 13,
    color: Colors.gray[700],
    fontWeight: '600',
  },
});
