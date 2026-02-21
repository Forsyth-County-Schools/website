import SwiftUI

struct AthleticsView: View {
    @State private var selectedSeason: SportSeason = .winter

    private var sportsForSeason: [Sport] {
        allSports.filter { $0.season == selectedSeason }
    }

    private var gamesForSeason: [Game] {
        let sportNames = Set(sportsForSeason.map(\.name))
        return recentGames.filter { sportNames.contains($0.sport) }
            .sorted { $0.date < $1.date }
    }

    var body: some View {
        NavigationView {
            ScrollView(showsIndicators: false) {
                VStack(spacing: 0) {
                    // Hero
                    ZStack {
                        DesignTokens.Colors.navy.frame(maxWidth: .infinity).frame(height: 90)
                        VStack(spacing: 4) {
                            Text("FCS ATHLETICS")
                                .font(DesignTokens.Typography.label(11))
                                .kerning(2)
                                .foregroundColor(DesignTokens.Colors.gold)
                            Text("Championship Programs")
                                .font(.system(size: 20, weight: .bold))
                                .foregroundColor(DesignTokens.Colors.textPrimary)
                        }
                    }

                    // Season picker
                    HStack(spacing: 0) {
                        ForEach(SportSeason.allCases, id: \.self) { season in
                            Button {
                                selectedSeason = season
                            } label: {
                                VStack(spacing: 4) {
                                    Image(systemName: season.icon)
                                        .font(.system(size: 16))
                                    Text(season.displayName)
                                        .font(DesignTokens.Typography.caption(12))
                                        .fontWeight(.semibold)
                                }
                                .foregroundColor(selectedSeason == season
                                    ? DesignTokens.Colors.gold
                                    : DesignTokens.Colors.textSecondary)
                                .frame(maxWidth: .infinity)
                                .padding(.vertical, 12)
                                .background(selectedSeason == season
                                    ? DesignTokens.Colors.gold.opacity(0.12)
                                    : DesignTokens.Colors.surface1)
                            }
                        }
                    }
                    .overlay(Divider().background(Color.white.opacity(0.15)), alignment: .bottom)

                    VStack(alignment: .leading, spacing: 16) {
                        // Sports Grid
                        Text("\(selectedSeason.displayName) Sports")
                            .font(DesignTokens.Typography.headline())
                            .foregroundColor(DesignTokens.Colors.textPrimary)
                            .padding(.horizontal, 16)
                            .padding(.top, 20)

                        LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 10) {
                            ForEach(sportsForSeason) { sport in
                                GlassCard(.subtle) {
                                    HStack(spacing: 10) {
                                        Image(systemName: sport.icon)
                                            .font(.system(size: 20))
                                            .foregroundColor(DesignTokens.Colors.gold)
                                            .frame(width: 36, height: 36)
                                            .background(DesignTokens.Colors.gold.opacity(0.12))
                                            .clipShape(Circle())
                                        Text(sport.name)
                                            .font(DesignTokens.Typography.body(14))
                                            .fontWeight(.semibold)
                                            .foregroundColor(DesignTokens.Colors.textPrimary)
                                            .lineLimit(2)
                                        Spacer()
                                    }
                                    .padding(12)
                                }
                            }
                        }
                        .padding(.horizontal, 16)

                        // Games/Schedule
                        if !gamesForSeason.isEmpty {
                            Text("Recent & Upcoming Games")
                                .font(DesignTokens.Typography.headline())
                                .foregroundColor(DesignTokens.Colors.textPrimary)
                                .padding(.horizontal, 16)
                                .padding(.top, 8)

                            ForEach(gamesForSeason) { game in
                                GameRowView(game: game)
                                    .padding(.horizontal, 16)
                            }
                        } else {
                            Text("No games scheduled yet for \(selectedSeason.displayName).")
                                .font(DesignTokens.Typography.body())
                                .foregroundColor(DesignTokens.Colors.textSecondary)
                                .padding(.horizontal, 16)
                                .padding(.top, 8)
                        }
                    }
                    .padding(.bottom, 32)
                }
            }
            .background(.clear)
            .navigationTitle("Athletics")
            .navigationBarTitleDisplayMode(.large)
            .toolbarColorScheme(.dark, for: .navigationBar)
            .toolbarBackground(.clear, for: .navigationBar)
        }
        .navigationViewStyle(.stack)
    }
}

struct GameRowView: View {
    let game: Game
    private var dateStr: String {
        let f = DateFormatter(); f.dateStyle = .medium; f.timeStyle = .none
        return f.string(from: game.date)
    }
    var body: some View {
        GlassCard(.elevated) {
            VStack(spacing: 10) {
                HStack {
                    Text(game.sport.uppercased())
                        .font(DesignTokens.Typography.label(10))
                        .kerning(0.5)
                        .foregroundColor(DesignTokens.Colors.navy)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 3)
                        .background(DesignTokens.Colors.gold)
                        .cornerRadius(4)
                    Spacer()
                    StatusBadge(status: game.status)
                    Text(dateStr)
                        .font(DesignTokens.Typography.caption())
                        .foregroundColor(DesignTokens.Colors.textSecondary)
                }
                HStack {
                    VStack(alignment: .leading, spacing: 2) {
                        Text(game.homeTeam)
                            .font(DesignTokens.Typography.subheadline())
                            .foregroundColor(DesignTokens.Colors.textPrimary)
                            .lineLimit(1)
                        Text("HOME")
                            .font(DesignTokens.Typography.label(10))
                            .foregroundColor(DesignTokens.Colors.textSecondary)
                    }
                    Spacer()
                    if game.status == .completed, let hs = game.homeScore, let as_ = game.awayScore {
                        Text("\(hs) – \(as_)")
                            .font(.system(size: 20, weight: .heavy, design: .monospaced))
                            .foregroundColor(DesignTokens.Colors.gold)
                    } else {
                        Text("vs")
                            .font(DesignTokens.Typography.subheadline())
                            .foregroundColor(DesignTokens.Colors.textSecondary)
                    }
                    Spacer()
                    VStack(alignment: .trailing, spacing: 2) {
                        Text(game.awayTeam)
                            .font(DesignTokens.Typography.subheadline())
                            .foregroundColor(DesignTokens.Colors.textPrimary)
                            .multilineTextAlignment(.trailing)
                            .lineLimit(1)
                        Text("AWAY")
                            .font(DesignTokens.Typography.label(10))
                            .foregroundColor(DesignTokens.Colors.textSecondary)
                    }
                }
                Label(game.location, systemImage: "mappin")
                    .font(DesignTokens.Typography.caption())
                    .foregroundColor(DesignTokens.Colors.textSecondary)
                    .frame(maxWidth: .infinity, alignment: .leading)
            }
            .padding(14)
        }
    }
}

struct StatusBadge: View {
    let status: GameStatus
    var body: some View {
        Text(status == .completed ? "FINAL" : status == .live ? "LIVE" : "UPCOMING")
            .font(DesignTokens.Typography.label(10))
            .kerning(0.5)
            .foregroundColor(statusColor)
            .padding(.horizontal, 7)
            .padding(.vertical, 3)
            .background(statusColor.opacity(0.15))
            .cornerRadius(4)
    }
    private var statusColor: Color {
        switch status {
        case .completed: return DesignTokens.Colors.textSecondary
        case .live:      return .red
        case .upcoming:  return DesignTokens.Colors.gold
        }
    }
}
