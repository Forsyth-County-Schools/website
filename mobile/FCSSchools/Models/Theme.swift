import SwiftUI

enum AppColors {
    static let primary    = Color(hex: "#003087")   // FCS Navy Blue
    static let primaryLight = Color(hex: "#004BB5")
    static let gold       = Color(hex: "#FCD34D")   // FCS Gold
    static let goldDark   = Color(hex: "#C99600")
    static let background = Color(.systemBackground)
    static let secondaryBG = Color(.secondarySystemBackground)
    static let cardBG     = Color(.systemBackground)
    static let text       = Color(.label)
    static let secondaryText = Color(.secondaryLabel)
    static let separator  = Color(.separator)

    // Level colors
    static let elementary = Color(hex: "#10B981")
    static let middle     = Color(hex: "#F59E0B")
    static let high       = Color(hex: "#C8102E")
}

enum AppFonts {
    static func headline(_ size: CGFloat = 17) -> Font { .system(size: size, weight: .bold) }
    static func subheadline(_ size: CGFloat = 15) -> Font { .system(size: size, weight: .semibold) }
    static func body(_ size: CGFloat = 15) -> Font { .system(size: size, weight: .regular) }
    static func caption(_ size: CGFloat = 12) -> Font { .system(size: size, weight: .regular) }
    static func label(_ size: CGFloat = 11) -> Font { .system(size: size, weight: .semibold) }
}
