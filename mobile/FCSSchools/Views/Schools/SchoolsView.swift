import SwiftUI

struct SchoolsView: View {
    @State private var searchText = ""
    @State private var selectedLevel: SchoolLevel? = nil

    private var filtered: [School] {
        allSchools.filter { school in
            let matchesLevel = selectedLevel == nil || school.level == selectedLevel
            let matchesSearch = searchText.isEmpty
                || school.name.localizedCaseInsensitiveContains(searchText)
                || school.city.localizedCaseInsensitiveContains(searchText)
                || school.address.localizedCaseInsensitiveContains(searchText)
            return matchesLevel && matchesSearch
        }
    }

    var body: some View {
        NavigationView {
            VStack(spacing: 0) {
                // Search
                HStack(spacing: 10) {
                    Image(systemName: "magnifyingglass")
                        .foregroundColor(DesignTokens.Colors.textSecondary)
                    TextField("Search schools…", text: $searchText)
                        .font(DesignTokens.Typography.body())
                        .foregroundColor(DesignTokens.Colors.textPrimary)
                        .tint(DesignTokens.Colors.gold)
                    if !searchText.isEmpty {
                        Button { searchText = "" } label: {
                            Image(systemName: "xmark.circle.fill")
                                .foregroundColor(DesignTokens.Colors.textSecondary)
                        }
                    }
                }
                .padding(10)
                .background(DesignTokens.Colors.surface2)
                .cornerRadius(10)
                .padding(.horizontal, 16)
                .padding(.vertical, 12)

                // Level filter
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 8) {
                        LevelChip(title: "All (\(allSchools.count))", isSelected: selectedLevel == nil) {
                            selectedLevel = nil
                        }
                        ForEach(SchoolLevel.allCases) { level in
                            let count = allSchools.filter { $0.level == level }.count
                            LevelChip(title: "\(level.displayName) (\(count))",
                                      isSelected: selectedLevel == level) {
                                selectedLevel = selectedLevel == level ? nil : level
                            }
                        }
                    }
                    .padding(.horizontal, 16)
                    .padding(.bottom, 12)
                }

                // Results count
                HStack {
                    Text("\(filtered.count) school\(filtered.count == 1 ? "" : "s")")
                        .font(DesignTokens.Typography.caption())
                        .foregroundColor(DesignTokens.Colors.textSecondary)
                    Spacer()
                }
                .padding(.horizontal, 16)
                .padding(.vertical, 8)

                // School list
                ScrollView(showsIndicators: false) {
                    LazyVStack(spacing: 12) {
                        ForEach(filtered) { school in
                            NavigationLink(destination: SchoolDetailView(school: school)) {
                                SchoolCardView(school: school)
                            }
                            .buttonStyle(.plain)
                        }
                    }
                    .padding(.horizontal, 16)
                    .padding(.vertical, 12)
                }
            }
            .background(.clear)
            .navigationTitle("Schools Directory")
            .navigationBarTitleDisplayMode(.large)
            .toolbarColorScheme(.dark, for: .navigationBar)
            .toolbarBackground(.clear, for: .navigationBar)
        }
        .navigationViewStyle(.stack)
    }
}

struct LevelChip: View {
    let title: String
    let isSelected: Bool
    let action: () -> Void
    var body: some View {
        Button(action: action) {
            Text(title)
                .font(DesignTokens.Typography.caption(13))
                .fontWeight(.semibold)
                .foregroundColor(isSelected ? DesignTokens.Colors.navy : DesignTokens.Colors.gold)
                .padding(.horizontal, 14)
                .padding(.vertical, 7)
                .background(isSelected ? DesignTokens.Colors.gold : DesignTokens.Colors.gold.opacity(0.15))
                .cornerRadius(20)
        }
    }
}
