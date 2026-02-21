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
                        .font(AppFonts.label(11))
                        .kerning(0.5)
                        .foregroundColor(AppColors.primary)
                        .padding(.horizontal, 10)
                        .padding(.vertical, 4)
                        .background(AppColors.primary.opacity(0.1))
                        .cornerRadius(4)
                    Spacer()
                    Text(article.formattedDate)
                        .font(AppFonts.caption())
                        .foregroundColor(.secondary)
                }

                Text(article.title)
                    .font(.system(size: 22, weight: .bold))
                    .fixedSize(horizontal: false, vertical: true)

                HStack {
                    Image(systemName: "person.circle.fill")
                        .foregroundColor(.secondary)
                    Text(article.author)
                        .font(AppFonts.body())
                        .foregroundColor(.secondary)
                }

                Divider()

                Text(article.content)
                    .font(AppFonts.body())
                    .lineSpacing(6)
                    .fixedSize(horizontal: false, vertical: true)

                Divider()

                // Tags
                FlowLayout(tags: article.tags)
            }
            .padding(20)
        }
        .navigationTitle("Article")
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct FlowLayout: View {
    let tags: [String]
    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text("Tags")
                .font(AppFonts.caption())
                .foregroundColor(.secondary)
            HStack(spacing: 6) {
                ForEach(tags, id: \.self) { tag in
                    Text(tag)
                        .font(AppFonts.caption(12))
                        .foregroundColor(.secondary)
                        .padding(.horizontal, 10)
                        .padding(.vertical, 4)
                        .background(Color(.systemGray6))
                        .cornerRadius(6)
                }
            }
        }
    }
}
