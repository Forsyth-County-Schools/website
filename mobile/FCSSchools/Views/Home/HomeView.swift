import SwiftUI

struct HomeView: View {
    private let stats: [(icon: String, value: String, label: String)] = [
        ("person.3.fill",              "54,000+", "Students"),
        ("building.2.fill",            "42",       "Schools"),
        ("graduationcap.fill",         "95.8%",   "Grad Rate"),
        ("pencil.and.list.clipboard",  "3,600",   "Teachers"),
    ]

    private let quickLinks: [(title: String, icon: String)] = [
        ("News",      "newspaper.fill"),
        ("Schools",   "building.2.fill"),
        ("Calendar",  "calendar"),
        ("Athletics", "trophy.fill"),
        ("More",      "ellipsis.circle.fill"),
        ("Website",   "globe"),
    ]

    var body: some View {
        NavigationView {
            ScrollView(showsIndicators: false) {
                VStack(spacing: 28) {

                    // ── Welcome Hero ────────────────────────────────────────
                    VStack(spacing: 6) {
                        Text("FORSYTH COUNTY SCHOOLS")
                            .font(DesignTokens.Typography.label(11))
                            .kerning(2.5)
                            .foregroundColor(DesignTokens.Colors.gold)

                        Text("Welcome")
                            .font(.system(size: 44, weight: .black))
                            .foregroundColor(DesignTokens.Colors.textPrimary)

                        Text("Excellence in Education")
                            .font(DesignTokens.Typography.subheadline(17))
                            .foregroundColor(DesignTokens.Colors.gold.opacity(0.85))

                        Text("Serving 54,000+ students across 42 world-class schools in Forsyth County, Georgia.")
                            .font(DesignTokens.Typography.body(14))
                            .foregroundColor(DesignTokens.Colors.textSecondary)
                            .multilineTextAlignment(.center)
                            .fixedSize(horizontal: false, vertical: true)
                            .padding(.top, 4)
                    }
                    .padding(.horizontal, 24)
                    .padding(.top, 56)

                    // ── Stats Grid ──────────────────────────────────────────
                    LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 12) {
                        ForEach(stats, id: \.label) { s in
                            StatCardView(icon: s.icon, value: s.value, label: s.label)
                        }
                    }
                    .padding(.horizontal, 16)

                    // ── Quick Access ────────────────────────────────────────
                    VStack(alignment: .leading, spacing: 14) {
                        Text("Quick Access")
                            .font(DesignTokens.Typography.headline(18))
                            .foregroundColor(DesignTokens.Colors.textPrimary)
                            .padding(.horizontal, 16)

                        LazyVGrid(columns: Array(repeating: GridItem(.flexible()), count: 3), spacing: 10) {
                            ForEach(quickLinks, id: \.title) { link in
                                GlassCard(.subtle) {
                                    VStack(spacing: 8) {
                                        Image(systemName: link.icon)
                                            .font(.system(size: 22))
                                            .foregroundColor(DesignTokens.Colors.gold)
                                        Text(link.title)
                                            .font(DesignTokens.Typography.caption(12))
                                            .fontWeight(.semibold)
                                            .foregroundColor(DesignTokens.Colors.textPrimary)
                                    }
                                    .frame(maxWidth: .infinity)
                                    .padding(.vertical, 14)
                                }
                            }
                        }
                        .padding(.horizontal, 16)
                    }

                    // ── Latest News ─────────────────────────────────────────
                    VStack(alignment: .leading, spacing: 14) {
                        HStack {
                            Text("Latest News")
                                .font(DesignTokens.Typography.headline(18))
                                .foregroundColor(DesignTokens.Colors.textPrimary)
                            Spacer()
                            NavigationLink(destination: NewsView()) {
                                Text("See All")
                                    .font(DesignTokens.Typography.body(14))
                                    .fontWeight(.semibold)
                                    .foregroundColor(DesignTokens.Colors.gold)
                            }
                        }
                        .padding(.horizontal, 16)

                        ForEach(sampleNews.prefix(3)) { article in
                            NewsCardView(article: article)
                                .padding(.horizontal, 16)
                        }
                    }
                    .padding(.bottom, 32)
                }
            }
            .background(.clear)
            .navigationBarHidden(true)
        }
        .navigationViewStyle(.stack)
    }
}
