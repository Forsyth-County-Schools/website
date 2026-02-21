import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/theme';

interface GameItem {
  id: string;
  sport: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  location: string;
  status: 'upcoming' | 'live' | 'completed';
  homeScore?: number;
  awayScore?: number;
}

interface SportCategory {
  name: string;
  icon: string;
  season: 'fall' | 'winter' | 'spring';
  color: string;
  teams: string[];
}

const sports: SportCategory[] = [
  // Fall Sports
  { name: 'Football', icon: 'american-football', season: 'fall', color: '#8B5CF6', teams: ['Lambert', 'South Forsyth', 'North Forsyth', 'West Forsyth', 'Forsyth Central', 'East Forsyth', 'Denmark', 'Pinecrest Academy'] },
  { name: 'Cross Country', icon: 'walk', season: 'fall', color: '#10B981', teams: ['Boys', 'Girls'] },
  { name: 'Volleyball', icon: 'fitness', season: 'fall', color: '#F59E0B', teams: ['Lambert', 'South Forsyth', 'North Forsyth', 'West Forsyth'] },
  { name: 'Golf', icon: 'golf', season: 'fall', color: '#059669', teams: ['Boys', 'Girls'] },
  { name: 'Tennis', icon: 'tennisball', season: 'fall', color: '#3B82F6', teams: ['Boys', 'Girls'] },
  // Winter Sports
  { name: 'Basketball', icon: 'basketball', season: 'winter', color: '#EF4444', teams: ['Lambert', 'South Forsyth', 'North Forsyth', 'West Forsyth', 'Forsyth Central'] },
  { name: 'Wrestling', icon: 'body', season: 'winter', color: '#6B7280', teams: ['Lambert', 'South Forsyth'] },
  { name: 'Swimming', icon: 'water', season: 'winter', color: '#06B6D4', teams: ['Boys', 'Girls'] },
  { name: 'Cheerleading', icon: 'megaphone', season: 'winter', color: '#EC4899', teams: ['Competition', 'Spirit'] },
  // Spring Sports
  { name: 'Baseball', icon: 'baseball', season: 'spring', color: '#1D4ED8', teams: ['Lambert', 'South Forsyth', 'North Forsyth', 'West Forsyth'] },
  { name: 'Softball', icon: 'baseball', season: 'spring', color: '#7C3AED', teams: ['Lambert', 'South Forsyth', 'North Forsyth'] },
  { name: 'Soccer', icon: 'football', season: 'spring', color: '#16A34A', teams: ['Boys', 'Girls'] },
  { name: 'Track & Field', icon: 'timer', season: 'spring', color: '#DC2626', teams: ['Boys', 'Girls'] },
  { name: 'Lacrosse', icon: 'trophy', season: 'spring', color: '#0891B2', teams: ['Boys', 'Girls'] },
];

const upcomingGames: GameItem[] = [
  {
    id: '1',
    sport: 'Basketball',
    homeTeam: 'Lambert Longhorns',
    awayTeam: 'South Forsyth War Eagles',
    date: '2025-01-24',
    time: '7:00 PM',
    location: 'Lambert High School Gym',
    status: 'upcoming',
  },
  {
    id: '2',
    sport: 'Basketball',
    homeTeam: 'North Forsyth Raiders',
    awayTeam: 'West Forsyth Wolverines',
    date: '2025-01-24',
    time: '7:30 PM',
    location: 'North Forsyth High School',
    status: 'upcoming',
  },
  {
    id: '3',
    sport: 'Wrestling',
    homeTeam: 'South Forsyth War Eagles',
    awayTeam: 'Multiple Teams',
    date: '2025-01-25',
    time: '10:00 AM',
    location: 'South Forsyth High School',
    status: 'upcoming',
  },
  {
    id: '4',
    sport: 'Swimming',
    homeTeam: 'FCS Composite',
    awayTeam: 'Region 6-7A Meet',
    date: '2025-02-01',
    time: '9:00 AM',
    location: 'Forsyth County Aquatic Center',
    status: 'upcoming',
  },
  {
    id: '5',
    sport: 'Basketball',
    homeTeam: 'West Forsyth Wolverines',
    awayTeam: 'Forsyth Central Bulldogs',
    date: '2025-02-07',
    time: '7:00 PM',
    location: 'West Forsyth High School',
    status: 'upcoming',
  },
  {
    id: '6',
    sport: 'Basketball',
    homeTeam: 'Lambert Longhorns',
    awayTeam: 'Gainesville Red Elephants',
    date: '2025-01-17',
    time: '7:00 PM',
    location: 'Lambert High School',
    status: 'completed',
    homeScore: 68,
    awayScore: 54,
  },
  {
    id: '7',
    sport: 'Wrestling',
    homeTeam: 'South Forsyth War Eagles',
    awayTeam: 'Forsyth Central Bulldogs',
    date: '2025-01-14',
    time: '6:00 PM',
    location: 'South Forsyth High School',
    status: 'completed',
    homeScore: 42,
    awayScore: 27,
  },
];

type SeasonFilter = 'all' | 'fall' | 'winter' | 'spring';

const seasonLabels: Record<SeasonFilter, string> = {
  all: 'All Seasons',
  fall: '🍂 Fall',
  winter: '❄️ Winter',
  spring: '🌸 Spring',
};

export default function AthleticsScreen() {
  const [activeSeason, setActiveSeason] = useState<SeasonFilter>('winter');
  const [activeTab, setActiveTab] = useState<'sports' | 'schedule'>('sports');

  const filteredSports = activeSeason === 'all'
    ? sports
    : sports.filter((s) => s.season === activeSeason);

  const upcomingOnly = upcomingGames.filter((g) => g.status === 'upcoming');
  const completedGames = upcomingGames.filter((g) => g.status === 'completed');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>FCS Athletics</Text>
        <Text style={styles.headerSubtitle}>Championship-winning programs</Text>
      </View>

      {/* Tab Toggle */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'sports' && styles.tabActive]}
          onPress={() => setActiveTab('sports')}
        >
          <Text style={[styles.tabText, activeTab === 'sports' && styles.tabTextActive]}>
            Sports
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'schedule' && styles.tabActive]}
          onPress={() => setActiveTab('schedule')}
        >
          <Text style={[styles.tabText, activeTab === 'schedule' && styles.tabTextActive]}>
            Schedule
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {activeTab === 'sports' ? (
          <>
            {/* Season Filter */}
            <View style={styles.seasonFilter}>
              {(['all', 'fall', 'winter', 'spring'] as SeasonFilter[]).map((season) => (
                <TouchableOpacity
                  key={season}
                  style={[styles.seasonChip, activeSeason === season && styles.seasonChipActive]}
                  onPress={() => setActiveSeason(season)}
                >
                  <Text
                    style={[
                      styles.seasonChipText,
                      activeSeason === season && styles.seasonChipTextActive,
                    ]}
                  >
                    {seasonLabels[season]}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Sports Grid */}
            <View style={styles.sportsGrid}>
              {filteredSports.map((sport, index) => (
                <Animated.View
                  key={sport.name}
                  entering={FadeInDown.delay(index * 50).duration(350)}
                  style={styles.sportCard}
                >
                  <TouchableOpacity
                    style={styles.sportCardInner}
                    onPress={() =>
                      Alert.alert(
                        sport.name,
                        `Season: ${sport.season.charAt(0).toUpperCase() + sport.season.slice(1)}\n\nTeams:\n${sport.teams.join('\n')}`,
                        [{ text: 'Close' }],
                      )
                    }
                    accessibilityLabel={`${sport.name}, ${sport.season} sport`}
                  >
                    <View style={[styles.sportIconBg, { backgroundColor: sport.color + '20' }]}>
                      <Ionicons name={sport.icon as any} size={28} color={sport.color} />
                    </View>
                    <Text style={styles.sportName}>{sport.name}</Text>
                    <Text style={styles.sportSeason}>
                      {sport.season.charAt(0).toUpperCase() + sport.season.slice(1)}
                    </Text>
                    <Text style={styles.sportTeams}>
                      {sport.teams.length} {sport.teams.length === 1 ? 'team' : 'teams'}
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          </>
        ) : (
          <>
            {/* Upcoming Games */}
            <View style={styles.scheduleSection}>
              <Text style={styles.scheduleSectionTitle}>Upcoming Games</Text>
              {upcomingOnly.map((game, index) => (
                <Animated.View
                  key={game.id}
                  entering={FadeInDown.delay(index * 80).duration(400)}
                >
                  <View style={styles.gameCard}>
                    <View style={styles.gameHeader}>
                      <View style={styles.gameSportBadge}>
                        <Text style={styles.gameSportText}>{game.sport}</Text>
                      </View>
                      <Text style={styles.gameDate}>
                        {new Date(game.date + 'T00:00:00').toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </Text>
                    </View>
                    <View style={styles.teamsRow}>
                      <Text style={styles.teamName} numberOfLines={1}>{game.homeTeam}</Text>
                      <View style={styles.vsContainer}>
                        <Text style={styles.vsText}>VS</Text>
                      </View>
                      <Text style={[styles.teamName, styles.awayTeam]} numberOfLines={1}>
                        {game.awayTeam}
                      </Text>
                    </View>
                    <View style={styles.gameFooter}>
                      <View style={styles.gameMetaRow}>
                        <Ionicons name="location-outline" size={13} color={Colors.gray[400]} />
                        <Text style={styles.gameMeta} numberOfLines={1}>{game.location}</Text>
                      </View>
                      <View style={styles.gameMetaRow}>
                        <Ionicons name="time-outline" size={13} color={Colors.gray[400]} />
                        <Text style={styles.gameMeta}>{game.time}</Text>
                      </View>
                    </View>
                  </View>
                </Animated.View>
              ))}
            </View>

            {/* Recent Results */}
            <View style={styles.scheduleSection}>
              <Text style={styles.scheduleSectionTitle}>Recent Results</Text>
              {completedGames.map((game, index) => (
                <Animated.View
                  key={game.id}
                  entering={FadeInDown.delay(index * 80).duration(400)}
                >
                  <View style={styles.gameCard}>
                    <View style={styles.gameHeader}>
                      <View style={[styles.gameSportBadge, styles.completedBadge]}>
                        <Text style={styles.gameSportText}>{game.sport}</Text>
                      </View>
                      <Text style={styles.gameDate}>
                        {new Date(game.date + 'T00:00:00').toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </Text>
                    </View>
                    <View style={styles.teamsRow}>
                      <Text style={styles.teamName} numberOfLines={1}>{game.homeTeam}</Text>
                      <View style={styles.scoreContainer}>
                        <Text style={styles.scoreText}>
                          {game.homeScore} – {game.awayScore}
                        </Text>
                      </View>
                      <Text style={[styles.teamName, styles.awayTeam]} numberOfLines={1}>
                        {game.awayTeam}
                      </Text>
                    </View>
                    <View style={styles.gameFooter}>
                      <View style={styles.gameMetaRow}>
                        <Ionicons name="location-outline" size={13} color={Colors.gray[400]} />
                        <Text style={styles.gameMeta} numberOfLines={1}>{game.location}</Text>
                      </View>
                    </View>
                  </View>
                </Animated.View>
              ))}
            </View>
          </>
        )}

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
  tabRow: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.gray[500],
  },
  tabTextActive: {
    color: Colors.primary,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  seasonFilter: {
    flexDirection: 'row',
    padding: 12,
    paddingHorizontal: 16,
    gap: 8,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[100],
  },
  seasonChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.gray[200],
  },
  seasonChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  seasonChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.gray[600],
  },
  seasonChipTextActive: {
    color: Colors.white,
  },
  sportsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    gap: 10,
  },
  sportCard: {
    width: '30%',
    flexGrow: 1,
  },
  sportCardInner: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sportIconBg: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  sportName: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.gray[800],
    textAlign: 'center',
    marginBottom: 2,
  },
  sportSeason: {
    fontSize: 11,
    color: Colors.gray[500],
    marginBottom: 2,
  },
  sportTeams: {
    fontSize: 11,
    color: Colors.gray[400],
  },
  scheduleSection: {
    padding: 16,
    paddingBottom: 8,
  },
  scheduleSectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.gray[900],
    marginBottom: 12,
  },
  gameCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  gameHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  gameSportBadge: {
    backgroundColor: Colors.primary + '15',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  completedBadge: {
    backgroundColor: Colors.gray[100],
  },
  gameSportText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  gameDate: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.gray[500],
  },
  teamsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 6,
  },
  teamName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: Colors.gray[800],
  },
  awayTeam: {
    textAlign: 'right',
  },
  vsContainer: {
    backgroundColor: Colors.gray[100],
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  vsText: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.gray[500],
  },
  scoreContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  scoreText: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.white,
  },
  gameFooter: {
    flexDirection: 'row',
    gap: 14,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[100],
    paddingTop: 8,
  },
  gameMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  gameMeta: {
    fontSize: 12,
    color: Colors.gray[500],
    flex: 1,
  },
});
