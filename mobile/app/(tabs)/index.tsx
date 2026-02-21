import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors } from '../../constants/theme';

const { width } = Dimensions.get('window');

const latestNews = [
  {
    id: '1',
    title: 'FCS Named Top School District in Georgia for 2025',
    excerpt: 'Forsyth County Schools has been recognized as a top-performing district statewide.',
    category: 'Achievement',
    publishedAt: '2025-01-15',
  },
  {
    id: '2',
    title: 'New STEM Center Opens at South Forsyth High School',
    excerpt: 'State-of-the-art facility features robotics labs and maker spaces for students.',
    category: 'Academics',
    publishedAt: '2025-01-10',
  },
  {
    id: '3',
    title: 'Registration Open for 2025-2026 School Year',
    excerpt: 'Families can now register for the upcoming school year online.',
    category: 'Enrollment',
    publishedAt: '2025-01-08',
  },
];

const quickLinks = [
  { title: 'News', icon: 'newspaper', route: '/(tabs)/news', color: '#3B82F6' },
  { title: 'Schools', icon: 'school', route: '/(tabs)/schools', color: '#10B981' },
  { title: 'Calendar', icon: 'calendar', route: '/(tabs)/calendar', color: '#8B5CF6' },
  { title: 'Athletics', icon: 'trophy', route: '/(tabs)/athletics', color: '#F59E0B' },
  { title: 'Contact', icon: 'call', route: '/(tabs)/more', color: '#EF4444' },
  { title: 'More', icon: 'menu', route: '/(tabs)/more', color: Colors.primary },
];

export default function HomeScreen() {
  const stats = [
    { label: 'Students', value: '54,000+', icon: 'people' },
    { label: 'Schools', value: '42', icon: 'school' },
    { label: 'Graduation Rate', value: '95.8%', icon: 'trophy' },
    { label: 'Teachers', value: '3,600', icon: 'person' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.hero}>
          <Animated.View entering={FadeInDown.duration(600)} style={styles.heroContent}>
            <Text style={styles.heroSubtitle}>FORSYTH COUNTY SCHOOLS</Text>
            <Text style={styles.heroTitle}>Excellence in{'\n'}Education</Text>
            <Text style={styles.heroText}>
              Serving 54,000+ students across 42 world-class schools in Forsyth County, Georgia
            </Text>
            <TouchableOpacity
              style={styles.heroButton}
              onPress={() => router.push('/(tabs)/schools')}
              accessibilityLabel="Find a school"
            >
              <Text style={styles.heroButtonText}>Find a School</Text>
              <Ionicons name="arrow-forward" size={16} color={Colors.primary} />
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <Animated.View
              key={stat.label}
              entering={FadeInDown.delay(index * 100).duration(400)}
              style={styles.statCard}
            >
              <Ionicons name={stat.icon as any} size={24} color={Colors.gold} />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </Animated.View>
          ))}
        </View>

        {/* Quick Links */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <View style={styles.quickLinksGrid}>
            {quickLinks.map((link, index) => (
              <Animated.View
                key={link.title}
                entering={FadeInRight.delay(index * 60).duration(400)}
              >
                <TouchableOpacity
                  style={styles.quickLinkCard}
                  onPress={() => router.push(link.route as any)}
                  accessibilityLabel={link.title}
                >
                  <View style={[styles.quickLinkIcon, { backgroundColor: link.color + '15' }]}>
                    <Ionicons name={link.icon as any} size={24} color={link.color} />
                  </View>
                  <Text style={styles.quickLinkText}>{link.title}</Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </View>

        {/* Latest News */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Latest News</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/news')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {latestNews.map((item, index) => (
            <Animated.View
              key={item.id}
              entering={FadeInDown.delay(index * 100).duration(400)}
            >
              <TouchableOpacity
                style={styles.newsItem}
                onPress={() => router.push('/(tabs)/news')}
              >
                <View style={styles.newsCategoryBadge}>
                  <Text style={styles.newsCategoryText}>{item.category}</Text>
                </View>
                <Text style={styles.newsTitle}>{item.title}</Text>
                <Text style={styles.newsExcerpt} numberOfLines={2}>{item.excerpt}</Text>
                <Text style={styles.newsDate}>
                  {new Date(item.publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        {/* District Highlights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why FCS?</Text>
          <View style={styles.highlightCard}>
            <View style={styles.highlightRow}>
              <Ionicons name="globe-outline" size={20} color={Colors.primary} />
              <View style={styles.highlightTextContainer}>
                <Text style={styles.highlightTitle}>Diverse Community</Text>
                <Text style={styles.highlightDesc}>
                  Students from 129 countries speaking 69 languages
                </Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.highlightRow}>
              <Ionicons name="ribbon-outline" size={20} color={Colors.primary} />
              <View style={styles.highlightTextContainer}>
                <Text style={styles.highlightTitle}>Award-Winning Programs</Text>
                <Text style={styles.highlightDesc}>
                  AP pass rate of 78.3% — well above state and national averages
                </Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.highlightRow}>
              <Ionicons name="trending-up-outline" size={20} color={Colors.primary} />
              <View style={styles.highlightTextContainer}>
                <Text style={styles.highlightTitle}>Rapid Growth</Text>
                <Text style={styles.highlightDesc}>
                  40% enrollment increase over the past decade
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Contact Banner */}
        <View style={styles.contactBanner}>
          <Text style={styles.contactTitle}>Need Help?</Text>
          <Text style={styles.contactText}>
            Contact the FCS district office at (770) 887-2461
          </Text>
          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => router.push('/(tabs)/more')}
            accessibilityLabel="Contact us"
          >
            <Text style={styles.contactButtonText}>Contact Us</Text>
          </TouchableOpacity>
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
  hero: {
    backgroundColor: Colors.primary,
    padding: 24,
    paddingBottom: 32,
  },
  heroContent: {
    alignItems: 'flex-start',
  },
  heroSubtitle: {
    color: Colors.gold,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 40,
    marginBottom: 12,
  },
  heroText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
    maxWidth: width * 0.75,
  },
  heroButton: {
    backgroundColor: Colors.gold,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
  },
  heroButtonText: {
    color: Colors.primary,
    fontWeight: '700',
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingBottom: 20,
    gap: 12,
  },
  statCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    width: (width - 56) / 2,
  },
  statValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    marginTop: 6,
    marginBottom: 2,
  },
  statLabel: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 12,
    fontWeight: '500',
  },
  section: {
    padding: 16,
    paddingBottom: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.gray[900],
    marginBottom: 12,
  },
  seeAll: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 12,
  },
  quickLinksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  quickLinkCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    width: (width - 62) / 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quickLinkIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickLinkText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.gray[700],
  },
  newsItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  newsCategoryBadge: {
    backgroundColor: Colors.primary + '15',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  newsCategoryText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  newsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.gray[900],
    marginBottom: 6,
    lineHeight: 21,
  },
  newsExcerpt: {
    fontSize: 13,
    color: Colors.gray[500],
    lineHeight: 19,
    marginBottom: 8,
  },
  newsDate: {
    fontSize: 12,
    color: Colors.gray[400],
  },
  highlightCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  highlightRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 8,
  },
  highlightTextContainer: {
    flex: 1,
  },
  highlightTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.gray[800],
    marginBottom: 2,
  },
  highlightDesc: {
    fontSize: 13,
    color: Colors.gray[500],
    lineHeight: 18,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.gray[100],
    marginVertical: 2,
  },
  contactBanner: {
    backgroundColor: Colors.primary,
    margin: 16,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginTop: 16,
  },
  contactTitle: {
    color: Colors.gold,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 6,
  },
  contactText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 14,
  },
  contactButton: {
    backgroundColor: Colors.white,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  contactButtonText: {
    color: Colors.primary,
    fontWeight: '700',
    fontSize: 14,
  },
});
