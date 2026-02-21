import SwiftUI

struct ContentView: View {
    @State private var selectedTab: FCSTab = .home

    var body: some View {
        ZStack {
            AnimatedGradientBackground()

            Group {
                switch selectedTab {
                case .home:      HomeView()
                case .news:      NewsView()
                case .schools:   SchoolsView()
                case .calendar:  CalendarView()
                case .athletics: AthleticsView()
                case .more:      MoreView()
                }
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
        }
        .safeAreaInset(edge: .bottom, spacing: 0) {
            FCSTabBar(selected: $selectedTab)
        }
        .preferredColorScheme(.dark)
    }
}
