import SwiftUI

struct HomeView: View {
    private let stats: [(icon: String, value: String, label: String)] = [
        ("person.3.fill",    "54,000+",  "Students"),
        ("building.2.fill",  "42",        "Schools"),
        ("graduationcap.fill","95.8%",   "Grad Rate"),
        ("pencil.and.list.clipboard", "3,600", "Teachers"),
    ]

    private let quickLinks: [(title: String, icon: String, color: Color, tab: Int)] = [
        ("News",      "newspaper.fill",       Color.blue,          1),
        ("Schools",   "building.2.fill",      Color(hex: "#10B981"), 2),
        ("Calendar",  "calendar",             Color.purple,        3),
        ("Athletics", "trophy.fill",          Color.orange,        4),
        ("More",      "ellipsis.circle.fill", AppColors.primary,   5),
        ("Website",   "globe",                Color(hex: "#0077BE"),5),
    ]

    var body: some View {
        NavigationView {
            ScrollView(showsIndicators: false) {
                VStack(spacing: 0) {
                    // Hero
                    ZStack(alignment: .bottomLeading) {
                        AppColors.primary
                            .frame(maxWidth: .infinity)
                        VStack(alignment: .leading, spacing: 10) {
                            Text("FORSYTH COUNTY SCHOOLS")
                                .font(AppFonts.label(11))
                                .kerning(2)
                                .foregroundColor(AppColors.gold)
                            Text("Excellence in\nEducation")
                                .font(.system(size: 30, weight: .heavy))
                                .foregroundColor(.white)
                            Text("Serving 54,000+ students across 42 world-class schools in Forsyth County, Georgia.")
                                .font(AppFonts.body(14))
                                .foregroundColor(.white.opacity(0.85))
                                .fixedSize(horizontal: false, vertical: true)
                        }
                        .padding(24)
                        .padding(.bottom, 8)
                    }

                    // Stats Grid
                    LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 12) {
                        ForEach(stats, id: \.label) { s in
                            StatCardView(icon: s.icon, value: s.value, label: s.label)
                        }
                    }
                    .padding(.horizontal, 16)
                    .padding(.vertical, 16)
                    .background(AppColors.primary)

                    // Quick Links
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Quick Access")
                            .font(AppFonts.headline(18))
                            .padding(.horizontal, 16)
                            .padding(.top, 20)
                        LazyVGrid(columns: Array(repeating: GridItem(.flexible()), count: 3), spacing: 10) {
                            ForEach(quickLinks, id: \.title) { link in
                                VStack(spacing: 8) {
                                    ZStack {
                                        Circle()
                                            .fill(link.color.opacity(0.12))
                                            .frame(width: 52, height: 52)
                                        Image(systemName: link.icon)
                                            .font(.system(size: 22))
                                            .foregroundColor(link.color)
                                    }
                                    Text(link.title)
                                        .font(AppFonts.caption(12))
                                        .fontWeight(.semibold)
                                        .foregroundColor(.primary)
                                }
                                .frame(maxWidth: .infinity)
                                .padding(.vertical, 12)
                                .background(Color(.systemBackground))
                                .cornerRadius(12)
                                .shadow(color: .black.opacity(0.05), radius: 4, x: 0, y: 1)
                            }
                        }
                        .padding(.horizontal, 16)
                    }

                    // Latest News
                    VStack(alignment: .leading, spacing: 12) {
                        HStack {
                            Text("Latest News")
                                .font(AppFonts.headline(18))
                            Spacer()
                            NavigationLink(destination: NewsView()) {
                                Text("See All")
                                    .font(AppFonts.body(14))
                                    .fontWeight(.semibold)
                                    .foregroundColor(AppColors.primary)
                            }
                        }
                        .padding(.horizontal, 16)
                        .padding(.top, 20)

                        ForEach(sampleNews.prefix(3)) { article in
                            NewsCardView(article: article)
                                .padding(.horizontal, 16)
                        }
                    }
                    .padding(.bottom, 32)
                }
            }
            .background(Color(.systemGroupedBackground))
            .navigationBarHidden(true)
        }
    }
}
