import SwiftUI

struct NewsCardView: View {
    let article: NewsArticle
    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            if article.featured {
                Text("FEATURED")
                    .font(AppFonts.label(10))
                    .kerning(1)
                    .foregroundColor(AppColors.primary)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 3)
                    .background(AppColors.gold)
                    .cornerRadius(4)
            }
            HStack {
                Text(article.category.uppercased())
                    .font(AppFonts.label(10))
                    .kerning(0.5)
                    .foregroundColor(AppColors.primary)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 3)
                    .background(AppColors.primary.opacity(0.1))
                    .cornerRadius(4)
                Spacer()
                Text(article.formattedDate)
                    .font(AppFonts.caption())
                    .foregroundColor(.secondary)
            }
            Text(article.title)
                .font(AppFonts.subheadline())
                .foregroundColor(.primary)
                .fixedSize(horizontal: false, vertical: true)
                .lineLimit(2)
            Text(article.excerpt)
                .font(AppFonts.body(14))
                .foregroundColor(.secondary)
                .lineLimit(3)
            Divider()
            HStack {
                Label(article.author, systemImage: "person.circle")
                    .font(AppFonts.caption())
                    .foregroundColor(.secondary)
                Spacer()
                HStack(spacing: 4) {
                    ForEach(article.tags.prefix(2), id: \.self) { tag in
                        Text(tag)
                            .font(AppFonts.caption(11))
                            .foregroundColor(.secondary)
                            .padding(.horizontal, 6)
                            .padding(.vertical, 2)
                            .background(Color(.systemGray6))
                            .cornerRadius(4)
                    }
                }
            }
        }
        .padding(16)
        .background(Color(.systemBackground))
        .cornerRadius(12)
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(article.featured ? AppColors.gold : Color.clear, lineWidth: 2)
        )
        .shadow(color: .black.opacity(0.06), radius: 6, x: 0, y: 2)
    }
}
