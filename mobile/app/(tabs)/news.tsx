import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import NewsCard from '../../components/NewsCard';
import { Colors } from '../../constants/theme';
import { NewsArticle } from '../../types';

const mockArticles: NewsArticle[] = [
  {
    id: '1',
    slug: 'fcs-top-district-2025',
    title: 'FCS Named Top School District in Georgia for 2025',
    excerpt: 'Forsyth County Schools has been recognized as a top-performing district statewide for outstanding academic achievement and student growth.',
    content: 'Full content here.',
    category: 'Achievement',
    author: 'FCS Communications',
    publishedAt: '2025-01-15',
    image: '',
    featured: true,
    tags: ['award', 'achievement', 'academics'],
  },
  {
    id: '2',
    slug: 'stem-center-south-forsyth',
    title: 'New STEM Center Opens at South Forsyth High School',
    excerpt: 'State-of-the-art facility features robotics labs, 3D printing stations, and maker spaces designed to inspire the next generation of innovators.',
    content: 'Full content here.',
    category: 'Academics',
    author: 'Dr. Sarah Mitchell',
    publishedAt: '2025-01-10',
    image: '',
    featured: false,
    tags: ['STEM', 'technology', 'innovation'],
  },
  {
    id: '3',
    slug: 'registration-2025-2026',
    title: 'Registration Open for 2025-2026 School Year',
    excerpt: 'Families can now complete registration for the upcoming school year entirely online through the FCS parent portal.',
    content: 'Full content here.',
    category: 'Enrollment',
    author: 'FCS Administration',
    publishedAt: '2025-01-08',
    image: '',
    featured: false,
    tags: ['enrollment', 'registration', 'families'],
  },
  {
    id: '4',
    slug: 'championship-football-2024',
    title: 'Lambert High School Wins State Football Championship',
    excerpt: 'The Lambert Longhorns claimed the GHSA 7A state championship title in a thrilling overtime victory against Mill Creek.',
    content: 'Full content here.',
    category: 'Athletics',
    author: 'FCS Athletics Dept.',
    publishedAt: '2025-01-05',
    image: '',
    featured: true,
    tags: ['athletics', 'football', 'championship'],
  },
  {
    id: '5',
    slug: 'teacher-of-year-2025',
    title: 'FCS Teacher of the Year Announced',
    excerpt: 'Ms. Jennifer Harmon of Midway Elementary has been named the Forsyth County Schools Teacher of the Year for 2025.',
    content: 'Full content here.',
    category: 'Staff',
    author: 'FCS Communications',
    publishedAt: '2024-12-20',
    image: '',
    featured: false,
    tags: ['staff', 'recognition', 'teaching'],
  },
  {
    id: '6',
    slug: 'budget-approved-2025',
    title: 'Board Approves $1.2B Budget for 2025-2026',
    excerpt: 'The FCS Board of Education approved a record budget focused on teacher compensation, technology upgrades, and new school construction.',
    content: 'Full content here.',
    category: 'Board',
    author: 'FCS Board Office',
    publishedAt: '2024-12-18',
    image: '',
    featured: false,
    tags: ['budget', 'board', 'finance'],
  },
  {
    id: '7',
    slug: 'mental-health-initiative',
    title: 'FCS Launches Comprehensive Student Mental Health Initiative',
    excerpt: 'A new district-wide program brings additional counselors, mindfulness resources, and peer support networks to all 42 schools.',
    content: 'Full content here.',
    category: 'Student Services',
    author: 'Dr. Lisa Park',
    publishedAt: '2024-12-15',
    image: '',
    featured: false,
    tags: ['mental health', 'students', 'wellness'],
  },
  {
    id: '8',
    slug: 'ap-scores-record-high',
    title: 'FCS Students Achieve Record AP Exam Scores',
    excerpt: 'Over 78% of AP exam takers earned a passing score of 3 or higher, surpassing both state and national averages.',
    content: 'Full content here.',
    category: 'Academics',
    author: 'FCS Academics Office',
    publishedAt: '2024-12-10',
    image: '',
    featured: false,
    tags: ['AP', 'academics', 'college-prep'],
  },
  {
    id: '9',
    slug: 'new-elementary-school-2026',
    title: 'New Elementary School to Open in 2026',
    excerpt: 'Construction begins on a new 1,000-student elementary school in the northwest Forsyth area to address rapid population growth.',
    content: 'Full content here.',
    category: 'Facilities',
    author: 'FCS Facilities Dept.',
    publishedAt: '2024-12-05',
    image: '',
    featured: false,
    tags: ['construction', 'growth', 'facilities'],
  },
  {
    id: '10',
    slug: 'arts-program-expansion',
    title: 'Fine Arts Programs Expanding Across All High Schools',
    excerpt: 'FCS announces expansion of visual arts, theatre, and music programs with new dedicated performance spaces at four high schools.',
    content: 'Full content here.',
    category: 'Arts',
    author: 'FCS Fine Arts Dept.',
    publishedAt: '2024-12-01',
    image: '',
    featured: false,
    tags: ['arts', 'music', 'theatre'],
  },
  {
    id: '11',
    slug: 'career-pathways-expansion',
    title: 'Career & Technical Education Pathways Expand to 40+ Programs',
    excerpt: 'FCS now offers more than 40 career pathways including healthcare, cybersecurity, culinary arts, and aviation technology.',
    content: 'Full content here.',
    category: 'Academics',
    author: 'FCS CTE Department',
    publishedAt: '2024-11-25',
    image: '',
    featured: false,
    tags: ['CTE', 'careers', 'workforce'],
  },
  {
    id: '12',
    slug: 'school-safety-upgrades',
    title: 'District-Wide Safety Technology Upgrades Complete',
    excerpt: 'All 42 FCS schools now feature updated security cameras, visitor management systems, and enhanced communication tools.',
    content: 'Full content here.',
    category: 'Safety',
    author: 'FCS Safety Office',
    publishedAt: '2024-11-20',
    image: '',
    featured: false,
    tags: ['safety', 'security', 'technology'],
  },
];

const categories = ['All', 'Achievement', 'Academics', 'Athletics', 'Enrollment', 'Board', 'Arts', 'Safety', 'Staff'];

export default function NewsScreen() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [refreshing, setRefreshing] = useState(false);
  const [articles, setArticles] = useState(mockArticles);

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      search === '' ||
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1200);
  }, []);

  const handleArticlePress = (article: NewsArticle) => {
    Alert.alert(article.title, article.excerpt, [{ text: 'Close' }]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>News & Updates</Text>
        <Text style={styles.headerSubtitle}>Stay informed about FCS</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color={Colors.gray[400]} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search news..."
            placeholderTextColor={Colors.gray[400]}
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
            accessibilityLabel="Search news articles"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')} accessibilityLabel="Clear search">
              <Ionicons name="close-circle" size={18} color={Colors.gray[400]} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category Filter */}
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryChip,
              selectedCategory === item && styles.categoryChipActive,
            ]}
            onPress={() => setSelectedCategory(item)}
            accessibilityLabel={`Filter by ${item}`}
          >
            <Text
              style={[
                styles.categoryChipText,
                selectedCategory === item && styles.categoryChipTextActive,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Articles List */}
      <FlatList
        data={filteredArticles}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <NewsCard article={item} onPress={handleArticlePress} index={index} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.primary]}
            tintColor={Colors.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="newspaper-outline" size={48} color={Colors.gray[300]} />
            <Text style={styles.emptyTitle}>No articles found</Text>
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
  categoryList: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  categoryChip: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.gray[600],
  },
  categoryChipTextActive: {
    color: Colors.white,
  },
  listContent: {
    paddingTop: 4,
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
