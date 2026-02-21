import SwiftUI

struct NewsDetailView: View {
    let article: NewsArticle
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                // Category + Date
                HStack {
                    Text(article.category.uppercased())
                        .font(DesignTokens.Typography.label(11))
                        .kerning(0.5)
                        .foregroundColor(DesignTokens.Colors.gold)
                        .padding(.horizontal, 10)
                        .padding(.vertical, 4)
                        .background(DesignTokens.Colors.gold.opacity(0.15))
                        .cornerRadius(4)
                    Spacer()
                    Text(article.formattedDate)
                        .font(DesignTokens.Typography.caption())
                        .foregroundColor(DesignTokens.Colors.textSecondary)
                }

                Text(article.title)
                    .font(.system(size: 22, weight: .bold))
                    .foregroundColor(DesignTokens.Colors.textPrimary)
                    .fixedSize(horizontal: false, vertical: true)

                HStack {
                    Image(systemName: "person.circle.fill")
                        .foregroundColor(DesignTokens.Colors.textSecondary)
                    Text(article.author)
                        .font(DesignTokens.Typography.body())
                        .foregroundColor(DesignTokens.Colors.textSecondary)
                }

                Divider().background(Color.white.opacity(0.15))

                Text(article.content)
                    .font(DesignTokens.Typography.body())
                    .foregroundColor(DesignTokens.Colors.textPrimary)
                    .lineSpacing(6)
                    .fixedSize(horizontal: false, vertical: true)

                Divider().background(Color.white.opacity(0.15))

                // Tags
                FlowLayout(tags: article.tags)
            }
            .padding(20)
        }
        .background(.clear)
        .navigationTitle("Article")
        .navigationBarTitleDisplayMode(.inline)
        .toolbarColorScheme(.dark, for: .navigationBar)
        .toolbarBackground(.clear, for: .navigationBar)
    }
}

struct FlowLayout: View {
    let tags: [String]
    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text("Tags")
                .font(DesignTokens.Typography.caption())
                .foregroundColor(DesignTokens.Colors.textSecondary)
            HStack(spacing: 6) {
                ForEach(tags, id: \.self) { tag in
                    Text(tag)
                        .font(DesignTokens.Typography.caption(12))
                        .foregroundColor(DesignTokens.Colors.textSecondary)
                        .padding(.horizontal, 10)
                        .padding(.vertical, 4)
                        .background(Color.white.opacity(0.08))
                        .cornerRadius(6)
                }
            }
        }
    }
}
