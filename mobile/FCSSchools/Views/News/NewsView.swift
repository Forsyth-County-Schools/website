import SwiftUI

struct NewsView: View {
    @State private var searchText = ""
    @State private var selectedCategory: String? = nil

    private var categories: [String] {
        Array(Set(sampleNews.map(\.category))).sorted()
    }

    private var filtered: [NewsArticle] {
        sampleNews.filter { article in
            let matchesSearch = searchText.isEmpty
                || article.title.localizedCaseInsensitiveContains(searchText)
                || article.excerpt.localizedCaseInsensitiveContains(searchText)
            let matchesCategory = selectedCategory == nil || article.category == selectedCategory
            return matchesSearch && matchesCategory
        }
    }

    var body: some View {
        NavigationView {
            VStack(spacing: 0) {
                // Search
                HStack(spacing: 10) {
                    Image(systemName: "magnifyingglass")
                        .foregroundColor(DesignTokens.Colors.textSecondary)
                    TextField("Search news…", text: $searchText)
                        .font(DesignTokens.Typography.body())
                        .foregroundColor(DesignTokens.Colors.textPrimary)
                        .tint(DesignTokens.Colors.gold)
                }
                .padding(10)
                .background(DesignTokens.Colors.surface2)
                .cornerRadius(10)
                .padding(.horizontal, 16)
                .padding(.vertical, 12)

                // Category Chips
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 8) {
                        CategoryChip(title: "All", isSelected: selectedCategory == nil) {
                            selectedCategory = nil
                        }
                        ForEach(categories, id: \.self) { cat in
                            CategoryChip(title: cat, isSelected: selectedCategory == cat) {
                                selectedCategory = selectedCategory == cat ? nil : cat
                            }
                        }
                    }
                    .padding(.horizontal, 16)
                    .padding(.bottom, 12)
                }

                // Articles
                ScrollView(showsIndicators: false) {
                    LazyVStack(spacing: 12) {
                        ForEach(filtered) { article in
                            NavigationLink(destination: NewsDetailView(article: article)) {
                                NewsCardView(article: article)
                            }
                            .buttonStyle(.plain)
                        }
                    }
                    .padding(.horizontal, 16)
                    .padding(.vertical, 12)

                    if filtered.isEmpty {
                        VStack(spacing: 12) {
                            Image(systemName: "newspaper")
                                .font(.system(size: 44))
                                .foregroundColor(DesignTokens.Colors.textSecondary)
                            Text("No articles found")
                                .font(DesignTokens.Typography.subheadline())
                                .foregroundColor(DesignTokens.Colors.textSecondary)
                        }
                        .frame(maxWidth: .infinity)
                        .padding(.top, 60)
                    }
                }
            }
            .background(.clear)
            .navigationTitle("News & Announcements")
            .navigationBarTitleDisplayMode(.large)
            .toolbarColorScheme(.dark, for: .navigationBar)
            .toolbarBackground(.clear, for: .navigationBar)
        }
        .navigationViewStyle(.stack)
    }
}

struct CategoryChip: View {
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
