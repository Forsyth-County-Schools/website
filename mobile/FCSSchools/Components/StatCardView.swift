import SwiftUI

struct StatCardView: View {
    let icon: String
    let value: String
    let label: String
    var body: some View {
        GlassCard(.subtle) {
            VStack(spacing: 6) {
                Image(systemName: icon)
                    .font(.system(size: 22))
                    .foregroundColor(DesignTokens.Colors.gold)
                Text(value)
                    .font(.system(size: 20, weight: .heavy))
                    .foregroundColor(DesignTokens.Colors.textPrimary)
                Text(label)
                    .font(DesignTokens.Typography.caption())
                    .foregroundColor(DesignTokens.Colors.textSecondary)
                    .multilineTextAlignment(.center)
            }
            .frame(maxWidth: .infinity)
            .padding(14)
        }
    }
}
