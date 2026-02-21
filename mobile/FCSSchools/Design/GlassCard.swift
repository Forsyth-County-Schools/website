import SwiftUI

// MARK: - Glass Card Variant

enum GlassCardVariant {
    case subtle     // ultraThinMaterial – lightest blur
    case elevated   // regularMaterial   – medium blur
    case prominent  // thickMaterial     – heaviest blur
}

// MARK: - GlassCard View

struct GlassCard<Content: View>: View {
    let variant: GlassCardVariant
    let content: Content

    init(_ variant: GlassCardVariant = .elevated, @ViewBuilder content: () -> Content) {
        self.variant = variant
        self.content = content()
    }

    var body: some View {
        content
            .background(cardBackground)
            .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
            .overlay(shimmerBorder)
    }

    // MARK: - Helpers

    @ViewBuilder
    private var cardBackground: some View {
        ZStack {
            // Material blur layer
            switch variant {
            case .subtle:    RoundedRectangle(cornerRadius: 16, style: .continuous).fill(.ultraThinMaterial)
            case .elevated:  RoundedRectangle(cornerRadius: 16, style: .continuous).fill(.regularMaterial)
            case .prominent: RoundedRectangle(cornerRadius: 16, style: .continuous).fill(.thickMaterial)
            }
            // Navy glass tint overlay
            RoundedRectangle(cornerRadius: 16, style: .continuous)
                .fill(DesignTokens.Colors.navy.opacity(navyOpacity))
        }
    }

    private var navyOpacity: Double {
        switch variant {
        case .subtle:    return 0.30
        case .elevated:  return 0.45
        case .prominent: return 0.60
        }
    }

    private var shimmerBorder: some View {
        RoundedRectangle(cornerRadius: 16, style: .continuous)
            .strokeBorder(
                LinearGradient(
                    colors: [
                        DesignTokens.Colors.gold.opacity(0.70),
                        DesignTokens.Colors.gold.opacity(0.10),
                        DesignTokens.Colors.gold.opacity(0.00),
                        DesignTokens.Colors.gold.opacity(0.40),
                    ],
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                ),
                lineWidth: borderWidth
            )
    }

    private var borderWidth: CGFloat {
        switch variant {
        case .subtle:    return 0.5
        case .elevated:  return 1.0
        case .prominent: return 1.5
        }
    }
}

// MARK: - Preview

#Preview {
    ZStack {
        DesignTokens.Colors.surface0.ignoresSafeArea()
        VStack(spacing: 20) {
            GlassCard(.subtle) {
                Text("Subtle Glass Card")
                    .foregroundColor(DesignTokens.Colors.textPrimary)
                    .padding()
            }
            GlassCard(.elevated) {
                Text("Elevated Glass Card")
                    .foregroundColor(DesignTokens.Colors.textPrimary)
                    .padding()
            }
            GlassCard(.prominent) {
                Text("Prominent Glass Card")
                    .foregroundColor(DesignTokens.Colors.textPrimary)
                    .padding()
            }
        }
        .padding()
    }
    .preferredColorScheme(.dark)
}
