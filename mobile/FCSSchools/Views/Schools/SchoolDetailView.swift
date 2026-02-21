import SwiftUI
import MapKit

struct SchoolDetailView: View {
    let school: School

    @State private var position: MapCameraPosition

    init(school: School) {
        self.school = school
        _position = State(initialValue: .region(MKCoordinateRegion(
            center: CLLocationCoordinate2D(latitude: school.latitude, longitude: school.longitude),
            span: MKCoordinateSpan(latitudeDelta: 0.01, longitudeDelta: 0.01)
        )))
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 0) {
                // Header Banner
                ZStack(alignment: .bottomLeading) {
                    DesignTokens.Colors.navy
                        .frame(height: 160)
                    VStack(alignment: .leading, spacing: 6) {
                        LevelBadge(level: school.level)
                        Text(school.name)
                            .font(.system(size: 22, weight: .bold))
                            .foregroundColor(DesignTokens.Colors.textPrimary)
                        Text("Est. \(school.established) · \(school.mascot)")
                            .font(DesignTokens.Typography.body(14))
                            .foregroundColor(DesignTokens.Colors.textSecondary)
                    }
                    .padding(20)
                }

                VStack(alignment: .leading, spacing: 20) {
                    // Info Cards
                    InfoSection(title: "Contact") {
                        InfoRow(icon: "mappin.circle", label: "\(school.address), \(school.city), \(school.state) \(school.zip)")
                        InfoRow(icon: "phone", label: school.phone)
                        InfoRow(icon: "globe", label: school.website)
                    }

                    InfoSection(title: "Leadership") {
                        InfoRow(icon: "person.badge.key", label: "\(school.principal.name) — \(school.principal.title)")
                        InfoRow(icon: "envelope", label: school.principal.email)
                    }

                    InfoSection(title: "At a Glance") {
                        InfoRow(icon: "person.3", label: "\(school.enrollment.formatted()) students enrolled")
                        InfoRow(icon: "star.fill", label: "Rating: \(String(format: "%.1f", school.rating)) / 5.0")
                    }

                    // Description
                    GlassCard(.elevated) {
                        VStack(alignment: .leading, spacing: 8) {
                            Text("About")
                                .font(DesignTokens.Typography.subheadline())
                                .foregroundColor(DesignTokens.Colors.textPrimary)
                            Text(school.description)
                                .font(DesignTokens.Typography.body())
                                .foregroundColor(DesignTokens.Colors.textSecondary)
                                .lineSpacing(4)
                        }
                        .padding(16)
                    }

                    // Features
                    GlassCard(.elevated) {
                        VStack(alignment: .leading, spacing: 8) {
                            Text("Highlights")
                                .font(DesignTokens.Typography.subheadline())
                                .foregroundColor(DesignTokens.Colors.textPrimary)
                            FlexWrap(items: school.features)
                        }
                        .padding(16)
                    }

                    // Map
                    GlassCard(.elevated) {
                        VStack(alignment: .leading, spacing: 8) {
                            Text("Location")
                                .font(DesignTokens.Typography.subheadline())
                                .foregroundColor(DesignTokens.Colors.textPrimary)
                                .padding(.horizontal, 16)
                                .padding(.top, 16)
                            Map(position: $position) {
                                Marker(school.name, coordinate: CLLocationCoordinate2D(
                                    latitude: school.latitude, longitude: school.longitude))
                                    .tint(DesignTokens.Colors.gold)
                            }
                            .frame(height: 200)
                            .cornerRadius(12)
                            .padding(.horizontal, 16)

                            Button {
                                openInMaps()
                            } label: {
                                Label("Get Directions", systemImage: "arrow.triangle.turn.up.right.circle")
                                    .font(DesignTokens.Typography.subheadline())
                                    .foregroundColor(DesignTokens.Colors.navy)
                                    .frame(maxWidth: .infinity)
                                    .padding(.vertical, 12)
                                    .background(DesignTokens.Colors.gold)
                                    .cornerRadius(10)
                            }
                            .padding([.horizontal, .bottom], 16)
                        }
                    }
                }
                .padding(16)
            }
        }
        .background(.clear)
        .navigationTitle(school.name)
        .navigationBarTitleDisplayMode(.inline)
        .toolbarColorScheme(.dark, for: .navigationBar)
        .toolbarBackground(.clear, for: .navigationBar)
    }

    private func openInMaps() {
        let query = "\(school.name), \(school.address), \(school.city), \(school.state)"
            .addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? ""
        if let url = URL(string: "maps://?q=\(query)") {
            UIApplication.shared.open(url)
        }
    }
}

struct LevelBadge: View {
    let level: SchoolLevel
    var body: some View {
        Text(level.displayName.uppercased())
            .font(DesignTokens.Typography.label(10))
            .kerning(1)
            .foregroundColor(.white)
            .padding(.horizontal, 10)
            .padding(.vertical, 4)
            .background(Color(hex: level.color))
            .cornerRadius(4)
    }
}

struct InfoSection<Content: View>: View {
    let title: String
    @ViewBuilder let content: Content
    var body: some View {
        GlassCard(.elevated) {
            VStack(alignment: .leading, spacing: 10) {
                Text(title)
                    .font(DesignTokens.Typography.subheadline())
                    .foregroundColor(DesignTokens.Colors.textPrimary)
                content
            }
            .padding(16)
        }
    }
}

struct InfoRow: View {
    let icon: String
    let label: String
    var body: some View {
        HStack(alignment: .top, spacing: 10) {
            Image(systemName: icon)
                .font(.system(size: 14))
                .foregroundColor(DesignTokens.Colors.gold)
                .frame(width: 20)
            Text(label)
                .font(DesignTokens.Typography.body(14))
                .foregroundColor(DesignTokens.Colors.textSecondary)
                .fixedSize(horizontal: false, vertical: true)
        }
    }
}

struct FlexWrap: View {
    let items: [String]

    private var lines: [[String]] {
        var result: [[String]] = [[]]
        for item in items {
            result[result.count - 1].append(item)
            if result[result.count - 1].count >= 2 {
                result.append([])
            }
        }
        return result
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            ForEach(lines.indices, id: \.self) { i in
                HStack(spacing: 6) {
                    ForEach(lines[i], id: \.self) { item in
                        Text(item)
                            .font(DesignTokens.Typography.caption(13))
                            .foregroundColor(DesignTokens.Colors.gold)
                            .padding(.horizontal, 10)
                            .padding(.vertical, 5)
                            .background(DesignTokens.Colors.gold.opacity(0.15))
                            .cornerRadius(8)
                    }
                }
            }
        }
    }
}
