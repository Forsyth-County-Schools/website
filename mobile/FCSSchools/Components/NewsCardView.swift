import SwiftUI

struct NewsCardView: View {
    let article: NewsArticle
    var body: some View {
        GlassCard(article.featured ? .elevated : .subtle) {
            VStack(alignment: .leading, spacing: 10) {
                if article.featured {
                    Text("FEATURED")
                        .font(DesignTokens.Typography.label(10))
                        .kerning(1)
                        .foregroundColor(DesignTokens.Colors.navy)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 3)
                        .background(DesignTokens.Colors.gold)
                        .cornerRadius(4)
                }
                HStack {
                    Text(article.category.uppercased())
                        .font(DesignTokens.Typography.label(10))
                        .kerning(0.5)
                        .foregroundColor(DesignTokens.Colors.gold)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 3)
                        .background(DesignTokens.Colors.gold.opacity(0.15))
                        .cornerRadius(4)
                    Spacer()
                    Text(article.formattedDate)
                        .font(DesignTokens.Typography.caption())
                        .foregroundColor(DesignTokens.Colors.textSecondary)
                }
                Text(article.title)
                    .font(DesignTokens.Typography.subheadline())
                    .foregroundColor(DesignTokens.Colors.textPrimary)
                    .fixedSize(horizontal: false, vertical: true)
                    .lineLimit(2)
                Text(article.excerpt)
                    .font(DesignTokens.Typography.body(14))
                    .foregroundColor(DesignTokens.Colors.textSecondary)
                    .lineLimit(3)
                Divider().background(Color.white.opacity(0.15))
                HStack {
                    Label(article.author, systemImage: "person.circle")
                        .font(DesignTokens.Typography.caption())
                        .foregroundColor(DesignTokens.Colors.textSecondary)
                    Spacer()
                    HStack(spacing: 4) {
                        ForEach(article.tags.prefix(2), id: \.self) { tag in
                            Text(tag)
                                .font(DesignTokens.Typography.caption(11))
                                .foregroundColor(DesignTokens.Colors.textTertiary)
                                .padding(.horizontal, 6)
                                .padding(.vertical, 2)
                                .background(Color.white.opacity(0.08))
                                .cornerRadius(4)
                        }
                    }
                }
            }
            .padding(16)
        }
    }
}
