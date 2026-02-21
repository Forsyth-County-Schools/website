import SwiftUI

/// Central design token registry for the FCS Schools app.
enum DesignTokens {

    // MARK: - Brand Colors
    enum Colors {
        /// PANTONE 2767 Navy – primary brand color
        static let navy  = Color(hex: "#022744")
        /// PANTONE 1245 Gold – accent brand color
        static let gold  = Color(hex: "#C99600")

        // Dark surface palette
        static let surface0 = Color(hex: "#010E1A")   // darkest background
        static let surface1 = Color(hex: "#021929")
        static let surface2 = Color(hex: "#032235")
        static let surface3 = Color(hex: "#053352")

        // Text
        static let textPrimary   = Color.white
        static let textSecondary = Color.white.opacity(0.65)
        static let textTertiary  = Color.white.opacity(0.40)

        // School-level accent colors
        static let elementary = Color(hex: "#10B981")
        static let middle     = Color(hex: "#F59E0B")
        static let high       = Color(hex: "#C8102E")
    }

    // MARK: - Typography
    enum Typography {
        static func display(_ size: CGFloat = 30) -> Font     { .system(size: size, weight: .heavy) }
        static func headline(_ size: CGFloat = 17) -> Font    { .system(size: size, weight: .bold) }
        static func subheadline(_ size: CGFloat = 15) -> Font { .system(size: size, weight: .semibold) }
        static func body(_ size: CGFloat = 15) -> Font        { .system(size: size, weight: .regular) }
        static func caption(_ size: CGFloat = 12) -> Font     { .system(size: size, weight: .regular) }
        static func label(_ size: CGFloat = 11) -> Font       { .system(size: size, weight: .semibold) }
    }
}

#Preview {
    VStack(spacing: 16) {
        Text("Navy")
            .padding()
            .background(DesignTokens.Colors.navy)
            .foregroundColor(.white)
        Text("Gold")
            .padding()
            .background(DesignTokens.Colors.gold)
            .foregroundColor(.black)
        Text("Headline")
            .font(DesignTokens.Typography.headline())
        Text("Body")
            .font(DesignTokens.Typography.body())
        Text("Caption")
            .font(DesignTokens.Typography.caption())
    }
    .padding()
    .background(DesignTokens.Colors.surface0)
    .preferredColorScheme(.dark)
}
