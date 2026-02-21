import SwiftUI

struct MoreView: View {
    @AppStorage("notificationsEnabled") private var notificationsEnabled = true
    @AppStorage("athleticsAlerts") private var athleticsAlerts = false
    @Environment(\.colorScheme) private var colorScheme

    var body: some View {
        NavigationView {
            List {
                // District Info
                Section {
                    VStack(spacing: 10) {
                        ZStack {
                            Circle()
                                .fill(AppColors.primary)
                                .frame(width: 72, height: 72)
                            Text("FCS")
                                .font(.system(size: 22, weight: .black))
                                .foregroundColor(AppColors.gold)
                        }
                        Text("Forsyth County Schools")
                            .font(AppFonts.headline())
                        Text("Serving 54,000+ students across 42 schools")
                            .font(AppFonts.caption())
                            .foregroundColor(.secondary)
                            .multilineTextAlignment(.center)
                    }
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 12)
                }

                // Notifications
                Section("Notifications") {
                    Toggle(isOn: $notificationsEnabled) {
                        Label("District Announcements", systemImage: "bell.fill")
                    }
                    .tint(AppColors.primary)
                    Toggle(isOn: $athleticsAlerts) {
                        Label("Athletics Score Alerts", systemImage: "trophy.fill")
                    }
                    .tint(AppColors.primary)
                }

                // Contact
                Section("Contact Us") {
                    LinkRow(icon: "phone.fill", title: "Main Office",
                            subtitle: "(770) 887-2461", url: "tel:7708872461")
                    LinkRow(icon: "envelope.fill", title: "Email",
                            subtitle: "info@forsyth.k12.ga.us",
                            url: "mailto:info@forsyth.k12.ga.us")
                    LinkRow(icon: "mappin.circle.fill", title: "Address",
                            subtitle: "1120 Dahlonega Hwy, Cumming, GA 30040",
                            url: "maps://?q=Forsyth+County+Schools+Central+Office")
                }

                // Web & Social
                Section("Connect") {
                    LinkRow(icon: "globe", title: "Website",
                            subtitle: "forsyth.k12.ga.us",
                            url: "https://www.forsyth.k12.ga.us")
                    LinkRow(icon: "camera.fill", title: "Instagram",
                            subtitle: "@forsythcountyschools",
                            url: "https://instagram.com/forsythcountyschools")
                    LinkRow(icon: "play.rectangle.fill", title: "YouTube",
                            subtitle: "FCS YouTube Channel",
                            url: "https://www.youtube.com/@ForsythCountySchoolsGA")
                    LinkRow(icon: "person.2.fill", title: "Facebook",
                            subtitle: "@ForsythCountySchools",
                            url: "https://facebook.com/ForsythCountySchools")
                }

                // Leadership
                Section("Leadership") {
                    InfoListRow(label: "Superintendent", value: "Dr. Mitch Young")
                    InfoListRow(label: "Board Chairman", value: "Mr. Mike Valdes")
                    InfoListRow(label: "Deputy Superintendent", value: "Dr. David Knotts")
                }

                // About
                Section("About This App") {
                    InfoListRow(label: "Version", value: "1.0.0")
                    InfoListRow(label: "Platform", value: "iOS (Swift + SwiftUI)")
                    InfoListRow(label: "Data", value: "Forsyth County Schools")
                    LinkRow(icon: "lock.shield", title: "Privacy Policy",
                            subtitle: "forsyth.k12.ga.us/privacy",
                            url: "https://www.forsyth.k12.ga.us/privacy")
                }
            }
            .navigationTitle("More")
            .navigationBarTitleDisplayMode(.large)
        }
    }
}

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
                    .foregroundColor(AppColors.primary)
                    .frame(width: 28)
                VStack(alignment: .leading, spacing: 2) {
                    Text(title)
                        .font(AppFonts.body())
                        .foregroundColor(.primary)
                    Text(subtitle)
                        .font(AppFonts.caption())
                        .foregroundColor(.secondary)
                }
                Spacer()
                Image(systemName: "arrow.up.right.square")
                    .font(.system(size: 13))
                    .foregroundColor(.secondary)
            }
        }
    }
}

struct InfoListRow: View {
    let label: String
    let value: String
    var body: some View {
        HStack {
            Text(label).foregroundColor(.secondary)
            Spacer()
            Text(value).fontWeight(.medium)
        }
        .font(AppFonts.body())
    }
}
