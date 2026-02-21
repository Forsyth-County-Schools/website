import SwiftUI

struct MoreView: View {
    @AppStorage("notificationsEnabled") private var notificationsEnabled = true
    @AppStorage("athleticsAlerts") private var athleticsAlerts = false

    var body: some View {
        NavigationView {
            ScrollView(showsIndicators: false) {
                VStack(spacing: 20) {

                    // District Info
                    GlassCard(.elevated) {
                        VStack(spacing: 10) {
                            ZStack {
                                Circle()
                                    .fill(DesignTokens.Colors.navy)
                                    .frame(width: 72, height: 72)
                                    .overlay(
                                        Circle()
                                            .stroke(DesignTokens.Colors.gold.opacity(0.6), lineWidth: 1.5)
                                    )
                                Text("FCS")
                                    .font(.system(size: 22, weight: .black))
                                    .foregroundColor(DesignTokens.Colors.gold)
                            }
                            Text("Forsyth County Schools")
                                .font(DesignTokens.Typography.headline())
                                .foregroundColor(DesignTokens.Colors.textPrimary)
                            Text("Serving 54,000+ students across 42 schools")
                                .font(DesignTokens.Typography.caption())
                                .foregroundColor(DesignTokens.Colors.textSecondary)
                                .multilineTextAlignment(.center)
                        }
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 16)
                        .padding(.horizontal, 16)
                    }

                    // Notifications
                    MoreSection(title: "Notifications") {
                        Toggle(isOn: $notificationsEnabled) {
                            Label("District Announcements", systemImage: "bell.fill")
                                .foregroundColor(DesignTokens.Colors.textPrimary)
                        }
                        .tint(DesignTokens.Colors.gold)
                        MoreDivider()
                        Toggle(isOn: $athleticsAlerts) {
                            Label("Athletics Score Alerts", systemImage: "trophy.fill")
                                .foregroundColor(DesignTokens.Colors.textPrimary)
                        }
                        .tint(DesignTokens.Colors.gold)
                    }

                    // Contact
                    MoreSection(title: "Contact Us") {
                        LinkRow(icon: "phone.fill",        title: "Main Office",
                                subtitle: "(770) 887-2461", url: "tel:7708872461")
                        MoreDivider()
                        LinkRow(icon: "envelope.fill",     title: "Email",
                                subtitle: "info@forsyth.k12.ga.us",
                                url: "mailto:info@forsyth.k12.ga.us")
                        MoreDivider()
                        LinkRow(icon: "mappin.circle.fill", title: "Address",
                                subtitle: "1120 Dahlonega Hwy, Cumming, GA 30040",
                                url: "maps://?q=Forsyth+County+Schools+Central+Office")
                    }

                    // Connect
                    MoreSection(title: "Connect") {
                        LinkRow(icon: "globe",              title: "Website",
                                subtitle: "forsyth.k12.ga.us",
                                url: "https://www.forsyth.k12.ga.us")
                        MoreDivider()
                        LinkRow(icon: "camera.fill",        title: "Instagram",
                                subtitle: "@forsythcountyschools",
                                url: "https://instagram.com/forsythcountyschools")
                        MoreDivider()
                        LinkRow(icon: "play.rectangle.fill", title: "YouTube",
                                subtitle: "FCS YouTube Channel",
                                url: "https://www.youtube.com/@ForsythCountySchoolsGA")
                        MoreDivider()
                        LinkRow(icon: "person.2.fill",      title: "Facebook",
                                subtitle: "@ForsythCountySchools",
                                url: "https://facebook.com/ForsythCountySchools")
                    }

                    // Leadership
                    MoreSection(title: "Leadership") {
                        InfoListRow(label: "Superintendent",        value: "Dr. Mitch Young")
                        MoreDivider()
                        InfoListRow(label: "Board Chairman",        value: "Mr. Mike Valdes")
                        MoreDivider()
                        InfoListRow(label: "Deputy Superintendent", value: "Dr. David Knotts")
                    }

                    // About
                    MoreSection(title: "About This App") {
                        InfoListRow(label: "Version",  value: "1.0.0")
                        MoreDivider()
                        InfoListRow(label: "Platform", value: "iOS (Swift + SwiftUI)")
                        MoreDivider()
                        InfoListRow(label: "Data",     value: "Forsyth County Schools")
                        MoreDivider()
                        LinkRow(icon: "lock.shield", title: "Privacy Policy",
                                subtitle: "forsyth.k12.ga.us/privacy",
                                url: "https://www.forsyth.k12.ga.us/privacy")
                    }
                }
                .padding(.horizontal, 16)
                .padding(.vertical, 12)
                .padding(.bottom, 16)
            }
            .background(.clear)
            .navigationTitle("More")
            .navigationBarTitleDisplayMode(.large)
            .toolbarColorScheme(.dark, for: .navigationBar)
            .toolbarBackground(.clear, for: .navigationBar)
        }
        .navigationViewStyle(.stack)
    }
}

// MARK: - Reusable section container

private struct MoreSection<Content: View>: View {
    let title: String
    @ViewBuilder let content: Content
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(title.uppercased())
                .font(DesignTokens.Typography.label(11))
                .kerning(1)
                .foregroundColor(DesignTokens.Colors.gold)
                .padding(.horizontal, 4)
            GlassCard(.subtle) {
                VStack(alignment: .leading, spacing: 0) {
                    content
                }
                .padding(.vertical, 4)
                .padding(.horizontal, 16)
            }
        }
    }
}

private struct MoreDivider: View {
    var body: some View {
        Divider().background(Color.white.opacity(0.12))
    }
}

// MARK: - Row components

struct LinkRow: View {
    let icon: String
    let title: String
    let subtitle: String
    let url: String
    var body: some View {
        Button {
            if let u = URL(string: url) { UIApplication.shared.open(u) }
        } label: {
            HStack(spacing: 12) {
                Image(systemName: icon)
                    .font(.system(size: 16))
                    .foregroundColor(DesignTokens.Colors.gold)
                    .frame(width: 28)
                VStack(alignment: .leading, spacing: 2) {
                    Text(title)
                        .font(DesignTokens.Typography.body())
                        .foregroundColor(DesignTokens.Colors.textPrimary)
                    Text(subtitle)
                        .font(DesignTokens.Typography.caption())
                        .foregroundColor(DesignTokens.Colors.textSecondary)
                }
                Spacer()
                Image(systemName: "arrow.up.right.square")
                    .font(.system(size: 13))
                    .foregroundColor(DesignTokens.Colors.textTertiary)
            }
            .padding(.vertical, 10)
        }
    }
}

struct InfoListRow: View {
    let label: String
    let value: String
    var body: some View {
        HStack {
            Text(label)
                .foregroundColor(DesignTokens.Colors.textSecondary)
            Spacer()
            Text(value)
                .fontWeight(.medium)
                .foregroundColor(DesignTokens.Colors.textPrimary)
        }
        .font(DesignTokens.Typography.body())
        .padding(.vertical, 10)
    }
}
