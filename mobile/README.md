# FCS Schools — iOS App (Swift + SwiftUI)

A native **iOS app** for **Forsyth County Schools** built with Swift and SwiftUI.  
It mirrors and extends the functionality of [ahscampus.com](https://ahscampus.com) with a polished, native iOS UX.

---

## Requirements

| Tool | Version |
|------|---------|
| Xcode | 15.0 or later |
| iOS Deployment Target | 17.0+ |
| Swift | 5.9+ |
| macOS (build machine) | Sonoma 14+ |

No external Swift Package dependencies — the app uses only Apple system frameworks:
`SwiftUI`, `MapKit`, `Foundation`

---

## Getting Started

### 1. Open in Xcode

```bash
cd mobile/
open FCSSchools.xcodeproj
```

Xcode will open the project. Select a Simulator or connected device and press **⌘R** to run.

### 2. Run on iOS Simulator

1. Open `FCSSchools.xcodeproj` in Xcode
2. In the toolbar, choose a simulator (e.g. **iPhone 16 Pro**)
3. Press **⌘R** (Product → Run)

### 3. Run on a Physical Device

1. Connect your iPhone via USB
2. In Xcode go to **Signing & Capabilities** → set your **Team**
3. Select your device in the toolbar and press **⌘R**

---

## Build for Production (App Store)

### Archive & Upload

1. In Xcode choose **Product → Archive**
2. Once complete, Xcode Organizer opens automatically
3. Click **Distribute App** → **App Store Connect**
4. Follow the submission wizard

### Command-line archive

```bash
xcodebuild archive \
  -project FCSSchools.xcodeproj \
  -scheme FCSSchools \
  -configuration Release \
  -archivePath ./build/FCSSchools.xcarchive
```

### Export IPA

```bash
xcodebuild -exportArchive \
  -archivePath ./build/FCSSchools.xcarchive \
  -exportOptionsPlist ExportOptions.plist \
  -exportPath ./build/
```

---

## Project Structure

```
mobile/
├── FCSSchools.xcodeproj/              # Xcode project
│   ├── project.pbxproj                # Project configuration
│   └── xcshareddata/xcschemes/        # Build scheme
│       └── FCSSchools.xcscheme
└── FCSSchools/                        # Swift source root
    ├── App.swift                      # @main entry point
    ├── ContentView.swift              # Root TabView (6 tabs)
    ├── Info.plist                     # App metadata & permissions
    ├── Assets.xcassets/               # App icon, accent color
    ├── Models/
    │   ├── Theme.swift                # AppColors, AppFonts constants
    │   ├── School.swift               # School, Principal structs
    │   ├── News.swift                 # NewsArticle struct
    │   ├── CalendarEvent.swift        # CalendarEvent struct + Color(hex:)
    │   └── Athletics.swift            # Sport, Game, DistrictStats structs
    ├── Data/
    │   ├── SchoolData.swift           # All 42 real FCS schools
    │   ├── NewsData.swift             # 10 sample news articles
    │   ├── EventData.swift            # 10 calendar events
    │   └── AthleticsData.swift        # 16 sports + 6 sample games
    ├── Components/
    │   ├── SchoolCardView.swift       # Reusable school card
    │   ├── NewsCardView.swift         # Reusable news article card
    │   └── StatCardView.swift         # District stat tile
    └── Views/
        ├── Home/HomeView.swift        # Hero + stats + quick links + news preview
        ├── News/
        │   ├── NewsView.swift         # Searchable + filterable news feed
        │   └── NewsDetailView.swift   # Full article detail
        ├── Schools/
        │   ├── SchoolsView.swift      # All 42 schools, search + level filter
        │   └── SchoolDetailView.swift # School info, MapKit map, directions
        ├── Calendar/CalendarView.swift # Monthly calendar + event list
        ├── Athletics/AthleticsView.swift # Sports by season + game scores
        └── More/MoreView.swift        # Settings, contacts, links, about
```

---

## Features

| Screen | Features |
|--------|----------|
| **Home** | Hero banner, district stats grid, quick-access links, latest news preview |
| **News** | Searchable/filterable news feed, featured articles, detail view |
| **Schools** | All 42 FCS schools, filter by level, search, school detail with MapKit |
| **Calendar** | Native month calendar grid, event dots, upcoming event list |
| **Athletics** | 16 sports by season, game scores/schedule |
| **More** | Notification toggles, contact info, deep links, social media, about |

---

## Design

- **Brand colors:** Navy `#003087` (primary) + Gold `#FCD34D`
- **Dark Mode:** Fully supported via SwiftUI `colorScheme` and semantic colors
- **Typography:** SF Pro (system font — automatic on iOS)
- **Accessibility:** `accessibilityLabel`, dynamic type, semantic colors
- **Maps:** Native `MapKit` — tap "Get Directions" to open Apple Maps

---

## Bundle Identifier

`com.forsythcountyschools.app`

Change this in **Xcode → FCSSchools target → Signing & Capabilities** before submitting to the App Store.
