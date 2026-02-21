import SwiftUI

struct ContentView: View {
    var body: some View {
        TabView {
            HomeView()
                .tabItem {
                    Label("Home", systemImage: "house.fill")
                }
            NewsView()
                .tabItem {
                    Label("News", systemImage: "newspaper.fill")
                }
            SchoolsView()
                .tabItem {
                    Label("Schools", systemImage: "building.2.fill")
                }
            CalendarView()
                .tabItem {
                    Label("Calendar", systemImage: "calendar")
                }
            AthleticsView()
                .tabItem {
                    Label("Athletics", systemImage: "trophy.fill")
                }
            MoreView()
                .tabItem {
                    Label("More", systemImage: "ellipsis.circle.fill")
                }
        }
        .accentColor(AppColors.primary)
    }
}
