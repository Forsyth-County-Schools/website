import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, DateData } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/theme';

interface EventItem {
  id: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  category: 'district' | 'athletics' | 'arts' | 'school' | 'holiday';
  color: string;
}

const categoryColors: Record<string, string> = {
  district: Colors.primary,
  athletics: '#EF4444',
  arts: '#8B5CF6',
  school: '#10B981',
  holiday: '#F59E0B',
};

const upcomingEvents: EventItem[] = [
  {
    id: '1',
    title: 'First Day of Spring Semester',
    date: '2025-01-06',
    time: '8:00 AM',
    location: 'All Schools',
    category: 'district',
    color: categoryColors.district,
  },
  {
    id: '2',
    title: 'Martin Luther King Jr. Day — No School',
    date: '2025-01-20',
    location: 'All Schools',
    category: 'holiday',
    color: categoryColors.holiday,
  },
  {
    id: '3',
    title: 'Region Basketball Tournament',
    date: '2025-01-22',
    time: '6:00 PM',
    location: 'Lambert High School',
    category: 'athletics',
    color: categoryColors.athletics,
  },
  {
    id: '4',
    title: 'Board of Education Meeting',
    date: '2025-01-28',
    time: '7:00 PM',
    location: 'FCS Administrative Center',
    category: 'district',
    color: categoryColors.district,
  },
  {
    id: '5',
    title: 'Winter Band Concert — North Forsyth HS',
    date: '2025-02-04',
    time: '7:00 PM',
    location: 'North Forsyth High School',
    category: 'arts',
    color: categoryColors.arts,
  },
  {
    id: '6',
    title: 'Presidents Day — No School',
    date: '2025-02-17',
    location: 'All Schools',
    category: 'holiday',
    color: categoryColors.holiday,
  },
  {
    id: '7',
    title: 'Spring Registration Opens',
    date: '2025-02-18',
    time: '8:00 AM',
    location: 'Online — FCS Portal',
    category: 'district',
    color: categoryColors.district,
  },
  {
    id: '8',
    title: 'GHSA State Wrestling Championships',
    date: '2025-02-20',
    time: '10:00 AM',
    location: 'Forsyth Central High School',
    category: 'athletics',
    color: categoryColors.athletics,
  },
  {
    id: '9',
    title: 'Spring Musical — West Forsyth HS',
    date: '2025-03-06',
    time: '7:30 PM',
    location: 'West Forsyth High School',
    category: 'arts',
    color: categoryColors.arts,
  },
  {
    id: '10',
    title: 'Spring Break Begins',
    date: '2025-03-24',
    location: 'All Schools',
    category: 'holiday',
    color: categoryColors.holiday,
  },
  {
    id: '11',
    title: 'Graduation — Lambert High School',
    date: '2025-05-22',
    time: '7:00 PM',
    location: 'Gas South Arena, Duluth',
    category: 'school',
    color: categoryColors.school,
  },
  {
    id: '12',
    title: 'Last Day of School',
    date: '2025-05-29',
    location: 'All Schools',
    category: 'district',
    color: categoryColors.district,
  },
];

function buildMarkedDates(events: EventItem[], selectedDate: string) {
  const marked: Record<string, any> = {};
  events.forEach((event) => {
    if (marked[event.date]) {
      marked[event.date].dots = [
        ...marked[event.date].dots,
        { key: event.id, color: event.color },
      ];
    } else {
      marked[event.date] = {
        dots: [{ key: event.id, color: event.color }],
      };
    }
  });
  if (selectedDate) {
    marked[selectedDate] = {
      ...(marked[selectedDate] || {}),
      selected: true,
      selectedColor: Colors.primary,
    };
  }
  return marked;
}

const categoryLabels: Record<string, string> = {
  district: 'District',
  athletics: 'Athletics',
  arts: 'Arts',
  school: 'School',
  holiday: 'Holiday',
};

export default function CalendarScreen() {
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);

  const markedDates = buildMarkedDates(upcomingEvents, selectedDate);

  const selectedEvents = upcomingEvents.filter((e) => e.date === selectedDate);
  const futureEvents = upcomingEvents
    .filter((e) => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));

  const displayEvents = selectedEvents.length > 0 ? selectedEvents : futureEvents;
  const listTitle = selectedEvents.length > 0
    ? `Events on ${new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`
    : 'Upcoming Events';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>School Calendar</Text>
          <Text style={styles.headerSubtitle}>2024-2025 Academic Year</Text>
        </View>

        {/* Calendar */}
        <Calendar
          onDayPress={(day: DateData) => setSelectedDate(day.dateString)}
          markedDates={markedDates}
          markingType="multi-dot"
          theme={{
            backgroundColor: Colors.white,
            calendarBackground: Colors.white,
            todayTextColor: Colors.primary,
            selectedDayBackgroundColor: Colors.primary,
            selectedDayTextColor: Colors.white,
            arrowColor: Colors.primary,
            monthTextColor: Colors.gray[900],
            textMonthFontWeight: '700',
            textMonthFontSize: 16,
            dayTextColor: Colors.gray[800],
            textDayFontSize: 14,
            dotStyle: { marginTop: 2 },
          }}
          style={styles.calendar}
        />

        {/* Legend */}
        <View style={styles.legendContainer}>
          {Object.entries(categoryColors).map(([key, color]) => (
            <View key={key} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: color }]} />
              <Text style={styles.legendText}>{categoryLabels[key]}</Text>
            </View>
          ))}
        </View>

        {/* Events List */}
        <View style={styles.eventsSection}>
          <Text style={styles.eventsSectionTitle}>{listTitle}</Text>
          {displayEvents.length === 0 ? (
            <View style={styles.noEventsContainer}>
              <Ionicons name="calendar-outline" size={32} color={Colors.gray[300]} />
              <Text style={styles.noEventsText}>No events on this date</Text>
            </View>
          ) : (
            displayEvents.map((event) => (
              <View key={event.id} style={styles.eventCard}>
                <View style={[styles.eventColorBar, { backgroundColor: event.color }]} />
                <View style={styles.eventContent}>
                  <View style={styles.eventHeader}>
                    <View
                      style={[
                        styles.eventCategoryBadge,
                        { backgroundColor: event.color + '20' },
                      ]}
                    >
                      <Text style={[styles.eventCategoryText, { color: event.color }]}>
                        {categoryLabels[event.category]}
                      </Text>
                    </View>
                    <Text style={styles.eventDate}>
                      {new Date(event.date + 'T00:00:00').toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </Text>
                  </View>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <View style={styles.eventMeta}>
                    <Ionicons name="location-outline" size={13} color={Colors.gray[400]} />
                    <Text style={styles.eventLocation}>{event.location}</Text>
                  </View>
                  {event.time && (
                    <View style={styles.eventMeta}>
                      <Ionicons name="time-outline" size={13} color={Colors.gray[400]} />
                      <Text style={styles.eventLocation}>{event.time}</Text>
                    </View>
                  )}
                </View>
              </View>
            ))
          )}
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray[50],
  },
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: '800',
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 13,
    marginTop: 2,
  },
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[100],
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    paddingHorizontal: 16,
    gap: 8,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[100],
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginRight: 4,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 12,
    color: Colors.gray[600],
    fontWeight: '500',
  },
  eventsSection: {
    padding: 16,
    paddingBottom: 0,
  },
  eventsSectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.gray[900],
    marginBottom: 12,
  },
  noEventsContainer: {
    alignItems: 'center',
    paddingVertical: 32,
    gap: 8,
  },
  noEventsText: {
    fontSize: 14,
    color: Colors.gray[400],
  },
  eventCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  eventColorBar: {
    width: 4,
  },
  eventContent: {
    flex: 1,
    padding: 14,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  eventCategoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  eventCategoryText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  eventDate: {
    fontSize: 12,
    color: Colors.gray[400],
    fontWeight: '600',
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.gray[900],
    marginBottom: 6,
    lineHeight: 21,
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  eventLocation: {
    fontSize: 12,
    color: Colors.gray[500],
  },
});
