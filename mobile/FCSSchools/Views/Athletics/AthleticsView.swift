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
                        AppColors.primary.frame(maxWidth: .infinity).frame(height: 90)
                        VStack(spacing: 4) {
                            Text("FCS ATHLETICS")
                                .font(AppFonts.label(11))
                                .kerning(2)
                                .foregroundColor(AppColors.gold)
                            Text("Championship Programs")
                                .font(.system(size: 20, weight: .bold))
                                .foregroundColor(.white)
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
                                        .font(AppFonts.caption(12))
                                        .fontWeight(.semibold)
                                }
                                .foregroundColor(selectedSeason == season ? AppColors.primary : .secondary)
                                .frame(maxWidth: .infinity)
                                .padding(.vertical, 12)
                                .background(selectedSeason == season
                                    ? AppColors.primary.opacity(0.08)
                                    : Color(.systemBackground))
                            }
                        }
                    }
                    .background(Color(.systemBackground))
                    .overlay(Divider(), alignment: .bottom)

                    VStack(alignment: .leading, spacing: 16) {
                        // Sports Grid
                        Text("\(selectedSeason.displayName) Sports")
                            .font(AppFonts.headline())
                            .padding(.horizontal, 16)
                            .padding(.top, 20)

                        LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 10) {
                            ForEach(sportsForSeason) { sport in
                                HStack(spacing: 10) {
                                    Image(systemName: sport.icon)
                                        .font(.system(size: 20))
                                        .foregroundColor(AppColors.primary)
                                        .frame(width: 36, height: 36)
                                        .background(AppColors.primary.opacity(0.1))
                                        .clipShape(Circle())
                                    Text(sport.name)
                                        .font(AppFonts.body(14))
                                        .fontWeight(.semibold)
                                        .lineLimit(2)
                                    Spacer()
                                }
                                .padding(12)
                                .background(Color(.systemBackground))
                                .cornerRadius(10)
                                .shadow(color: .black.opacity(0.05), radius: 4, x: 0, y: 1)
                            }
                        }
                        .padding(.horizontal, 16)

                        // Games/Schedule
                        if !gamesForSeason.isEmpty {
                            Text("Recent & Upcoming Games")
                                .font(AppFonts.headline())
                                .padding(.horizontal, 16)
                                .padding(.top, 8)

                            ForEach(gamesForSeason) { game in
                                GameRowView(game: game)
                                    .padding(.horizontal, 16)
                            }
                        } else {
                            Text("No games scheduled yet for \(selectedSeason.displayName).")
                                .font(AppFonts.body())
                                .foregroundColor(.secondary)
                                .padding(.horizontal, 16)
                                .padding(.top, 8)
                        }
                    }
                    .padding(.bottom, 32)
                }
            }
            .background(Color(.systemGroupedBackground))
            .navigationTitle("Athletics")
            .navigationBarTitleDisplayMode(.large)
        }
    }
}

struct GameRowView: View {
    let game: Game
    private var dateStr: String {
        let f = DateFormatter(); f.dateStyle = .medium; f.timeStyle = .none
        return f.string(from: game.date)
    }
    var body: some View {
        VStack(spacing: 10) {
            HStack {
                Text(game.sport.uppercased())
                    .font(AppFonts.label(10))
                    .kerning(0.5)
                    .foregroundColor(AppColors.primary)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 3)
                    .background(AppColors.primary.opacity(0.1))
                    .cornerRadius(4)
                Spacer()
                StatusBadge(status: game.status)
                Text(dateStr)
                    .font(AppFonts.caption())
                    .foregroundColor(.secondary)
            }
            HStack {
                VStack(alignment: .leading, spacing: 2) {
                    Text(game.homeTeam)
                        .font(AppFonts.subheadline())
                        .lineLimit(1)
                    Text("HOME")
                        .font(AppFonts.label(10))
                        .foregroundColor(.secondary)
                }
                Spacer()
                if game.status == .completed, let hs = game.homeScore, let as_ = game.awayScore {
                    Text("\(hs) – \(as_)")
                        .font(.system(size: 20, weight: .heavy, design: .monospaced))
                        .foregroundColor(AppColors.primary)
                } else {
                    Text("vs")
                        .font(AppFonts.subheadline())
                        .foregroundColor(.secondary)
                }
                Spacer()
                VStack(alignment: .trailing, spacing: 2) {
                    Text(game.awayTeam)
                        .font(AppFonts.subheadline())
                        .multilineTextAlignment(.trailing)
                        .lineLimit(1)
                    Text("AWAY")
                        .font(AppFonts.label(10))
                        .foregroundColor(.secondary)
                }
            }
            Label(game.location, systemImage: "mappin")
                .font(AppFonts.caption())
                .foregroundColor(.secondary)
                .frame(maxWidth: .infinity, alignment: .leading)
        }
        .padding(14)
        .background(Color(.systemBackground))
        .cornerRadius(12)
        .shadow(color: .black.opacity(0.05), radius: 4, x: 0, y: 1)
    }
}

struct StatusBadge: View {
    let status: GameStatus
    var body: some View {
        Text(status == .completed ? "FINAL" : status == .live ? "LIVE" : "UPCOMING")
            .font(AppFonts.label(10))
            .kerning(0.5)
            .foregroundColor(statusColor)
            .padding(.horizontal, 7)
            .padding(.vertical, 3)
            .background(statusColor.opacity(0.12))
            .cornerRadius(4)
    }
    private var statusColor: Color {
        switch status {
        case .completed: return .secondary
        case .live: return .red
        case .upcoming: return AppColors.primary
        }
    }
}
