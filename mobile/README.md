# FCS Schools Mobile App

A React Native + Expo mobile application for **Forsyth County Schools (FCS)** — Georgia's premier school district serving 54,000+ students across 42 schools.

---

## Overview

The FCS Schools mobile app provides parents, students, and community members with quick access to:

- 📰 **News & Updates** — Latest district news with search and category filters
- 🏫 **Schools Directory** — All 42 FCS schools with details, filtering, and search
- 📅 **School Calendar** — Monthly calendar with color-coded events
- 🏆 **Athletics** — Sports listings by season and upcoming game schedules
- ⚙️ **More** — Settings, notifications, contact info, and social media links

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **Expo** | ~52.0.0 | Build toolchain & managed workflow |
| **React Native** | 0.76.0 | Cross-platform mobile framework |
| **Expo Router** | ~4.0.0 | File-based navigation (tabs + stack) |
| **React Native Reanimated** | ~3.16.0 | Smooth animations & transitions |
| **Moti** | ^0.30.0 | Animation utilities |
| **NativeWind** | ^4.0.1 | Tailwind CSS styling for React Native |
| **react-native-calendars** | ^1.1310.0 | Calendar component |
| **Zustand** | ^5.0.0 | State management |
| **@expo/vector-icons** | ^14.0.0 | Ionicons & other icon sets |
| **react-native-safe-area-context** | 4.12.0 | Safe area insets |
| **react-native-gesture-handler** | ~2.20.0 | Gesture handling |
| **TypeScript** | ^5.3.0 | Type safety |

---

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** v18+ — [nodejs.org](https://nodejs.org)
- **npm** or **yarn**
- **Expo CLI** — Install globally:
  ```bash
  npm install -g expo-cli
  ```
- **EAS CLI** (for production builds) — Install globally:
  ```bash
  npm install -g eas-cli
  ```

### For iOS Development
- **macOS** is required
- **Xcode** 15+ — [Mac App Store](https://apps.apple.com/us/app/xcode/id497799835)
- **Xcode Command Line Tools**:
  ```bash
  xcode-select --install
  ```
- **iOS Simulator** (included with Xcode)

### For Android Development
- **Android Studio** — [developer.android.com/studio](https://developer.android.com/studio)
- **Android SDK** (API Level 33+)
- **Android Virtual Device (AVD)** set up via Android Studio
- Ensure `ANDROID_HOME` environment variable is set

---

## Setup Instructions

### 1. Navigate to the mobile directory

```bash
cd /path/to/website/mobile
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npx expo start
```

This opens the **Expo Developer Tools** in your browser and shows a QR code.

---

## Running the App

### On a Physical Device (Easiest)

1. Install **Expo Go** on your phone:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
2. Run `npx expo start`
3. Scan the QR code with:
   - **iOS**: Camera app
   - **Android**: Expo Go app

### On iOS Simulator

```bash
npx expo start --ios
```

Or after starting:

```bash
npx expo run:ios
```

> **Note**: Requires macOS with Xcode installed.

### On Android Emulator

```bash
npx expo start --android
```

Or after starting:

```bash
npx expo run:android
```

> **Note**: Requires Android Studio with an AVD configured and running.

### Using Expo Go (QR Code)

```bash
npx expo start
```

Scan the QR code with your device's camera (iOS) or the Expo Go app (Android).

---

## Project Structure

```
mobile/
├── app/                          # Expo Router app directory
│   ├── _layout.tsx               # Root layout (SafeAreaProvider, GestureHandler)
│   ├── +not-found.tsx            # 404 screen
│   └── (tabs)/                   # Tab navigator group
│       ├── _layout.tsx           # Tab bar configuration
│       ├── index.tsx             # Home screen
│       ├── news.tsx              # News & Updates screen
│       ├── schools.tsx           # Schools directory screen
│       ├── calendar.tsx          # School calendar screen
│       ├── athletics.tsx         # Athletics screen
│       └── more.tsx              # Settings & More screen
├── components/                   # Reusable UI components
│   ├── Header.tsx                # Top navigation header
│   ├── HeroSection.tsx           # Hero banner component
│   ├── NewsCard.tsx              # News article card
│   └── SchoolCard.tsx            # School listing card
├── constants/
│   └── theme.ts                  # Colors, fonts, spacing constants
├── lib/
│   ├── data.ts                   # All FCS data (schools, news, events, etc.)
│   └── utils.ts                  # Utility functions
├── types/
│   └── index.ts                  # TypeScript type definitions
├── assets/
│   └── images/                   # App icons and splash screen images
├── app.json                      # Expo app configuration
├── babel.config.js               # Babel configuration
├── eas.json                      # EAS Build configuration
├── package.json                  # Dependencies
├── tailwind.config.js            # Tailwind/NativeWind configuration
└── tsconfig.json                 # TypeScript configuration
```

---

## Building for Production

### Prerequisites for Production Builds

1. Create an Expo account at [expo.dev](https://expo.dev)
2. Log in via CLI:
   ```bash
   eas login
   ```
3. Configure your project:
   ```bash
   eas build:configure
   ```

### Build for iOS

```bash
eas build --platform ios
```

For a local iOS simulator build:
```bash
eas build --platform ios --profile development
```

### Build for Android

```bash
eas build --platform android
```

### Build for Both Platforms

```bash
eas build --platform all
```

### Submit to App Stores

After a successful production build:

```bash
# Submit to Apple App Store
eas submit --platform ios

# Submit to Google Play Store
eas submit --platform android
```

---

## Environment & Configuration

### App Configuration (`app.json`)

Key settings:
- **Bundle ID (iOS)**: `com.forsythcountyschools.app`
- **Package (Android)**: `com.forsythcountyschools.app`
- **Scheme**: `fcsschools` (for deep links)
- **Primary color**: `#003087` (FCS Navy Blue)

### Theme Colors

| Name | Hex | Usage |
|---|---|---|
| Primary (Navy) | `#003087` | Headers, buttons, links |
| Gold | `#FCD34D` | Accents, highlights |
| Gold Dark | `#C99600` | Gold text on light backgrounds |

---

## Adding App Icons & Splash Screen

Place your icon files in `assets/images/`:
- `icon.png` — 1024×1024 px (iOS)
- `splash.png` — 1284×2778 px (recommended)
- `adaptive-icon.png` — 1024×1024 px (Android adaptive icon foreground)

Then run:
```bash
npx expo prebuild
```

---

## Development Tips

- **Hot Reload**: Shake your device or press `r` in the terminal to reload
- **Dev Menu**: Shake the device or press `Cmd+D` (iOS sim) / `Ctrl+M` (Android)
- **TypeScript**: Run `npx tsc --noEmit` to check for type errors
- **Clear Cache**: `npx expo start --clear`

---

## Data Sources

School data, statistics, and district information are sourced from:
- [Forsyth County Schools Official Website](https://www.forsyth.k12.ga.us)
- GHSA (Georgia High School Association)
- FCS Annual Reports

---

## License

This application is developed for Forsyth County Schools. All school data, logos, and branding belong to Forsyth County Schools, Georgia.
