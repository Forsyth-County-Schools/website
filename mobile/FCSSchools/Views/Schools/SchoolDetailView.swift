import SwiftUI
import MapKit

struct SchoolDetailView: View {
    let school: School

    @State private var region: MKCoordinateRegion

    init(school: School) {
        self.school = school
        _region = State(initialValue: MKCoordinateRegion(
            center: CLLocationCoordinate2D(latitude: school.latitude, longitude: school.longitude),
            span: MKCoordinateSpan(latitudeDelta: 0.01, longitudeDelta: 0.01)
        ))
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 0) {
                // Header Banner
                ZStack(alignment: .bottomLeading) {
                    AppColors.primary
                        .frame(height: 160)
                    VStack(alignment: .leading, spacing: 6) {
                        LevelBadge(level: school.level)
                        Text(school.name)
                            .font(.system(size: 22, weight: .bold))
                            .foregroundColor(.white)
                        Text("Est. \(school.established) · \(school.mascot)")
                            .font(AppFonts.body(14))
                            .foregroundColor(.white.opacity(0.8))
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
                    VStack(alignment: .leading, spacing: 8) {
                        Text("About")
                            .font(AppFonts.subheadline())
                        Text(school.description)
                            .font(AppFonts.body())
                            .foregroundColor(.secondary)
                            .lineSpacing(4)
                    }
                    .padding(16)
                    .background(Color(.systemBackground))
                    .cornerRadius(12)
                    .shadow(color: .black.opacity(0.05), radius: 4, x: 0, y: 1)

                    // Features
                    VStack(alignment: .leading, spacing: 8) {
                        Text("Highlights")
                            .font(AppFonts.subheadline())
                        FlexWrap(items: school.features)
                    }
                    .padding(16)
                    .background(Color(.systemBackground))
                    .cornerRadius(12)
                    .shadow(color: .black.opacity(0.05), radius: 4, x: 0, y: 1)

                    // Map
                    VStack(alignment: .leading, spacing: 8) {
                        Text("Location")
                            .font(AppFonts.subheadline())
                            .padding(.horizontal, 16)
                            .padding(.top, 16)
                        Map(coordinateRegion: $region, annotationItems: [school]) { s in
                            MapMarker(coordinate: CLLocationCoordinate2D(
                                latitude: s.latitude, longitude: s.longitude),
                                tint: AppColors.primary)
                        }
                        .frame(height: 200)
                        .cornerRadius(12)
                        .padding(.horizontal, 16)

                        Button {
                            openInMaps()
                        } label: {
                            Label("Get Directions", systemImage: "arrow.triangle.turn.up.right.circle")
                                .font(AppFonts.subheadline())
                                .foregroundColor(.white)
                                .frame(maxWidth: .infinity)
                                .padding(.vertical, 12)
                                .background(AppColors.primary)
                                .cornerRadius(10)
                        }
                        .padding([.horizontal, .bottom], 16)
                    }
                    .background(Color(.systemBackground))
                    .cornerRadius(12)
                    .shadow(color: .black.opacity(0.05), radius: 4, x: 0, y: 1)
                }
                .padding(16)
            }
        }
        .background(Color(.systemGroupedBackground))
        .navigationTitle(school.name)
        .navigationBarTitleDisplayMode(.inline)
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
            .font(AppFonts.label(10))
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
        VStack(alignment: .leading, spacing: 10) {
            Text(title)
                .font(AppFonts.subheadline())
            content
        }
        .padding(16)
        .background(Color(.systemBackground))
        .cornerRadius(12)
        .shadow(color: .black.opacity(0.05), radius: 4, x: 0, y: 1)
    }
}

struct InfoRow: View {
    let icon: String
    let label: String
    var body: some View {
        HStack(alignment: .top, spacing: 10) {
            Image(systemName: icon)
                .font(.system(size: 14))
                .foregroundColor(AppColors.primary)
                .frame(width: 20)
            Text(label)
                .font(AppFonts.body(14))
                .foregroundColor(.primary)
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
                            .font(AppFonts.caption(13))
                            .foregroundColor(AppColors.primary)
                            .padding(.horizontal, 10)
                            .padding(.vertical, 5)
                            .background(AppColors.primary.opacity(0.1))
                            .cornerRadius(8)
                    }
                }
            }
        }
    }
}
