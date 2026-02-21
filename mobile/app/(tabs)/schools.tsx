import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import SchoolCard from '../../components/SchoolCard';
import { Colors } from '../../constants/theme';
import { schools } from '../../lib/data';
import { School, SchoolLevel } from '../../types';

type FilterLevel = 'all' | SchoolLevel;

const filterTabs: { label: string; value: FilterLevel }[] = [
  { label: 'All', value: 'all' },
  { label: 'Elementary', value: 'elementary' },
  { label: 'Middle', value: 'middle' },
  { label: 'High', value: 'high' },
];

export default function SchoolsScreen() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterLevel>('all');

  const filteredSchools = useMemo(() => {
    return schools.filter((school) => {
      const matchesFilter = activeFilter === 'all' || school.level === activeFilter;
      const matchesSearch =
        search === '' ||
        school.name.toLowerCase().includes(search.toLowerCase()) ||
        school.city.toLowerCase().includes(search.toLowerCase()) ||
        school.address.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [search, activeFilter]);

  const counts = useMemo(
    () => ({
      all: schools.length,
      elementary: schools.filter((s) => s.level === 'elementary').length,
      middle: schools.filter((s) => s.level === 'middle').length,
      high: schools.filter((s) => s.level === 'high').length,
    }),
    [],
  );

  const handleSchoolPress = (school: School) => {
    Alert.alert(
      school.name,
      `${school.address}, ${school.city}, ${school.state} ${school.zip}\n\nPhone: ${school.phone}\nPrincipal: ${school.principal.name}\nEnrollment: ${school.enrollment.toLocaleString()} students\nRating: ${school.rating}/5`,
      [{ text: 'Close' }],
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Our Schools</Text>
        <Text style={styles.headerSubtitle}>{counts.all} schools across Forsyth County</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color={Colors.gray[400]} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search schools..."
            placeholderTextColor={Colors.gray[400]}
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
            accessibilityLabel="Search schools"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')} accessibilityLabel="Clear search">
              <Ionicons name="close-circle" size={18} color={Colors.gray[400]} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        {filterTabs.map((tab) => (
          <TouchableOpacity
            key={tab.value}
            style={[styles.filterTab, activeFilter === tab.value && styles.filterTabActive]}
            onPress={() => setActiveFilter(tab.value)}
            accessibilityLabel={`Filter ${tab.label} schools`}
          >
            <Text
              style={[
                styles.filterTabText,
                activeFilter === tab.value && styles.filterTabTextActive,
              ]}
            >
              {tab.label}
            </Text>
            <View
              style={[
                styles.filterCount,
                activeFilter === tab.value && styles.filterCountActive,
              ]}
            >
              <Text
                style={[
                  styles.filterCountText,
                  activeFilter === tab.value && styles.filterCountTextActive,
                ]}
              >
                {counts[tab.value]}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Schools List */}
      <FlatList
        data={filteredSchools}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <SchoolCard school={item} onPress={handleSchoolPress} index={index} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="school-outline" size={48} color={Colors.gray[300]} />
            <Text style={styles.emptyTitle}>No schools found</Text>
            <Text style={styles.emptyText}>Try adjusting your search or filter</Text>
          </View>
        }
      />
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
  searchContainer: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  searchBar: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: Colors.gray[900],
    padding: 0,
  },
  filterRow: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[100],
  },
  filterTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    paddingHorizontal: 6,
    borderRadius: 8,
    gap: 4,
    borderWidth: 1,
    borderColor: Colors.gray[200],
  },
  filterTabActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.gray[600],
  },
  filterTabTextActive: {
    color: Colors.white,
  },
  filterCount: {
    backgroundColor: Colors.gray[100],
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  filterCountActive: {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  filterCountText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.gray[500],
  },
  filterCountTextActive: {
    color: Colors.white,
  },
  listContent: {
    paddingTop: 8,
    paddingBottom: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.gray[600],
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.gray[400],
    textAlign: 'center',
  },
});
