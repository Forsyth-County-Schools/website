import Foundation

struct NewsArticle: Identifiable {
    let id: String
    let title: String
    let excerpt: String
    let content: String
    let category: String
    let author: String
    let publishedAt: Date
    let featured: Bool
    let tags: [String]

    var formattedDate: String {
        let formatter = DateFormatter()
        formatter.dateStyle = .medium
        formatter.timeStyle = .none
        return formatter.string(from: publishedAt)
    }
}
