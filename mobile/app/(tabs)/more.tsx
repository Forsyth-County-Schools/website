import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Linking,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/theme';

interface SettingRowProps {
  icon: string;
  iconColor: string;
  label: string;
  value?: boolean;
  onToggle?: (val: boolean) => void;
  onPress?: () => void;
  showChevron?: boolean;
  subtitle?: string;
}

function SettingRow({
  icon,
  iconColor,
  label,
  value,
  onToggle,
  onPress,
  showChevron,
  subtitle,
}: SettingRowProps) {
  return (
    <TouchableOpacity
      style={styles.settingRow}
      onPress={onPress}
      disabled={!onPress && !onToggle}
      accessibilityLabel={label}
    >
      <View style={[styles.settingIconBg, { backgroundColor: iconColor + '20' }]}>
        <Ionicons name={icon as any} size={20} color={iconColor} />
      </View>
      <View style={styles.settingLabelContainer}>
        <Text style={styles.settingLabel}>{label}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {onToggle !== undefined && value !== undefined ? (
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: Colors.gray[200], true: Colors.primary }}
          thumbColor={Colors.white}
          accessibilityLabel={`${label} toggle`}
        />
      ) : showChevron ? (
        <Ionicons name="chevron-forward" size={18} color={Colors.gray[400]} />
      ) : null}
    </TouchableOpacity>
  );
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionCard}>{children}</View>
    </View>
  );
}

export default function MoreScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [newsAlerts, setNewsAlerts] = useState(true);
  const [athleticsAlerts, setAthleticsAlerts] = useState(false);
  const [emergencyAlerts, setEmergencyAlerts] = useState(true);

  const openURL = (url: string, label: string) => {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('Cannot Open', `Unable to open ${label}.`);
        }
      })
      .catch(() => Alert.alert('Error', 'Could not open link.'));
  };

  const handlePhone = () => openURL('tel:+17708872461', 'phone');
  const handleWebsite = () => openURL('https://www.forsyth.k12.ga.us', 'FCS Website');
  const handleFacebook = () => openURL('https://www.facebook.com/ForsythCountySchools', 'Facebook');
  const handleTwitter = () => openURL('https://twitter.com/ForsythSchools', 'Twitter/X');
  const handleInstagram = () => openURL('https://www.instagram.com/forsythcountyschools', 'Instagram');
  const handleYouTube = () => openURL('https://www.youtube.com/@ForsythCountySchools', 'YouTube');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Ionicons name="school" size={40} color={Colors.gold} />
          </View>
          <Text style={styles.headerTitle}>FCS Schools</Text>
          <Text style={styles.headerSubtitle}>Forsyth County Schools</Text>
          <Text style={styles.headerTagline}>Educating, Inspiring, Empowering</Text>
        </View>

        {/* Notifications */}
        <Section title="Notifications">
          <SettingRow
            icon="notifications"
            iconColor={Colors.primary}
            label="Enable Notifications"
            value={notificationsEnabled}
            onToggle={setNotificationsEnabled}
          />
          <View style={styles.divider} />
          <SettingRow
            icon="newspaper"
            iconColor="#3B82F6"
            label="News Alerts"
            subtitle="Get notified about new news articles"
            value={newsAlerts}
            onToggle={setNewsAlerts}
          />
          <View style={styles.divider} />
          <SettingRow
            icon="trophy"
            iconColor="#F59E0B"
            label="Athletics Alerts"
            subtitle="Game scores and schedule updates"
            value={athleticsAlerts}
            onToggle={setAthleticsAlerts}
          />
          <View style={styles.divider} />
          <SettingRow
            icon="warning"
            iconColor="#EF4444"
            label="Emergency Alerts"
            subtitle="Critical district-wide notifications"
            value={emergencyAlerts}
            onToggle={setEmergencyAlerts}
          />
        </Section>

        {/* Contact Info */}
        <Section title="District Contact">
          <SettingRow
            icon="call"
            iconColor={Colors.success}
            label="(770) 887-2461"
            subtitle="District Office"
            onPress={handlePhone}
            showChevron
          />
          <View style={styles.divider} />
          <SettingRow
            icon="location"
            iconColor={Colors.error}
            label="1120 Dahlonega Hwy"
            subtitle="Cumming, GA 30040"
            showChevron={false}
          />
          <View style={styles.divider} />
          <SettingRow
            icon="mail"
            iconColor={Colors.primary}
            label="info@forsyth.k12.ga.us"
            subtitle="General Inquiries"
            onPress={() => openURL('mailto:info@forsyth.k12.ga.us', 'email')}
            showChevron
          />
        </Section>

        {/* Links */}
        <Section title="Links">
          <SettingRow
            icon="globe"
            iconColor={Colors.primary}
            label="FCS Website"
            subtitle="forsyth.k12.ga.us"
            onPress={handleWebsite}
            showChevron
          />
          <View style={styles.divider} />
          <SettingRow
            icon="person-add"
            iconColor="#10B981"
            label="Parent Portal"
            subtitle="Infinite Campus login"
            onPress={() => openURL('https://forsyth.infinitecampus.org/campus/portal/forsyth.jsp', 'Parent Portal')}
            showChevron
          />
          <View style={styles.divider} />
          <SettingRow
            icon="briefcase"
            iconColor="#8B5CF6"
            label="Employment"
            subtitle="Join the FCS team"
            onPress={() => openURL('https://www.forsyth.k12.ga.us/domain/9', 'Employment')}
            showChevron
          />
          <View style={styles.divider} />
          <SettingRow
            icon="document-text"
            iconColor="#F59E0B"
            label="Board Meetings"
            subtitle="Agendas & minutes"
            onPress={() => openURL('https://www.forsyth.k12.ga.us/domain/22', 'Board Meetings')}
            showChevron
          />
        </Section>

        {/* Social Media */}
        <Section title="Social Media">
          <View style={styles.socialRow}>
            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: '#1877F215' }]}
              onPress={handleFacebook}
              accessibilityLabel="Facebook"
            >
              <Ionicons name="logo-facebook" size={28} color="#1877F2" />
              <Text style={[styles.socialLabel, { color: '#1877F2' }]}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: '#00000015' }]}
              onPress={handleTwitter}
              accessibilityLabel="Twitter/X"
            >
              <Ionicons name="logo-twitter" size={28} color="#000000" />
              <Text style={[styles.socialLabel, { color: '#000000' }]}>Twitter / X</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: '#E1306C15' }]}
              onPress={handleInstagram}
              accessibilityLabel="Instagram"
            >
              <Ionicons name="logo-instagram" size={28} color="#E1306C" />
              <Text style={[styles.socialLabel, { color: '#E1306C' }]}>Instagram</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: '#FF000015' }]}
              onPress={handleYouTube}
              accessibilityLabel="YouTube"
            >
              <Ionicons name="logo-youtube" size={28} color="#FF0000" />
              <Text style={[styles.socialLabel, { color: '#FF0000' }]}>YouTube</Text>
            </TouchableOpacity>
          </View>
        </Section>

        {/* About */}
        <Section title="About">
          <View style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>App Version</Text>
            <Text style={styles.aboutValue}>1.0.0</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>District</Text>
            <Text style={styles.aboutValue}>Forsyth County Schools</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>State</Text>
            <Text style={styles.aboutValue}>Georgia</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>Superintendent</Text>
            <Text style={styles.aboutValue}>Dr. Mitch Young</Text>
          </View>
        </Section>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2025 Forsyth County Schools{'\n'}All rights reserved.
          </Text>
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
    padding: 24,
    alignItems: 'center',
    paddingBottom: 28,
  },
  logoContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 2,
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    marginBottom: 4,
  },
  headerTagline: {
    color: Colors.gold,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.gray[500],
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  sectionCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
  },
  settingIconBg: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingLabelContainer: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.gray[800],
  },
  settingSubtitle: {
    fontSize: 12,
    color: Colors.gray[400],
    marginTop: 1,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.gray[100],
    marginLeft: 64,
  },
  socialRow: {
    flexDirection: 'row',
    padding: 16,
    gap: 10,
    justifyContent: 'space-between',
  },
  socialButton: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    gap: 6,
  },
  socialLabel: {
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  aboutLabel: {
    fontSize: 14,
    color: Colors.gray[600],
  },
  aboutValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.gray[800],
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: Colors.gray[400],
    textAlign: 'center',
    lineHeight: 18,
  },
});
