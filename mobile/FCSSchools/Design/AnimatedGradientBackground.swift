import SwiftUI

// MARK: - Animated Gradient Background

struct AnimatedGradientBackground: View {
    @State private var phase: CGFloat = 0

    var body: some View {
        TimelineView(.animation(minimumInterval: 1 / 30)) { context in
            Canvas { gc, size in
                // Base fill
                gc.fill(
                    Path(CGRect(origin: .zero, size: size)),
                    with: .color(DesignTokens.Colors.surface0)
                )
                drawGlow(gc: gc, size: size, color: DesignTokens.Colors.navy,
                         center: navyCenter(size: size), radius: size.width * 0.70)
                drawGlow(gc: gc, size: size, color: DesignTokens.Colors.gold,
                         center: goldCenter(size: size), radius: size.width * 0.45)
            }
        }
        .onAppear { startAnimation() }
        .ignoresSafeArea()
    }

    // MARK: - Glow helpers

    private func drawGlow(gc: GraphicsContext, size: CGSize, color: Color,
                          center: CGPoint, radius: CGFloat) {
        var inner = gc
        inner.opacity = 0.35
        inner.fill(
            Path(ellipseIn: CGRect(
                x: center.x - radius,
                y: center.y - radius,
                width: radius * 2,
                height: radius * 2
            )),
            with: .color(color)
        )
    }

    // MARK: - Animated positions

    private func navyCenter(size: CGSize) -> CGPoint {
        CGPoint(
            x: size.width  * (0.20 + 0.25 * sin(phase * 0.4)),
            y: size.height * (0.25 + 0.20 * cos(phase * 0.3))
        )
    }

    private func goldCenter(size: CGSize) -> CGPoint {
        CGPoint(
            x: size.width  * (0.70 + 0.20 * cos(phase * 0.35)),
            y: size.height * (0.65 + 0.18 * sin(phase * 0.45))
        )
    }

    private func startAnimation() {
        withAnimation(.linear(duration: 120).repeatForever(autoreverses: false)) {
            phase = .pi * 2 * 60   // 60 full cycles over 120 s → very slow drift
        }
    }
}

// MARK: - Preview

#Preview {
    ZStack {
        AnimatedGradientBackground()
        VStack {
            Text("FCS Schools")
                .font(DesignTokens.Typography.display())
                .foregroundColor(DesignTokens.Colors.textPrimary)
            Text("Excellence in Education")
                .font(DesignTokens.Typography.subheadline())
                .foregroundColor(DesignTokens.Colors.gold)
        }
    }
    .preferredColorScheme(.dark)
}
