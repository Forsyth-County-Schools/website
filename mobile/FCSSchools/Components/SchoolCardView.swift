import SwiftUI

struct SchoolCardView: View {
    let school: School
    var body: some View {
        GlassCard(.elevated) {
            VStack(alignment: .leading, spacing: 10) {
                HStack(spacing: 6) {
                    Circle()
                        .fill(levelColor)
                        .frame(width: 8, height: 8)
                    Text(school.level.displayName.uppercased())
                        .font(DesignTokens.Typography.label())
                        .foregroundColor(levelColor)
                        .kerning(0.5)
                    Spacer()
                    HStack(spacing: 3) {
                        Image(systemName: "star.fill")
                            .font(.system(size: 11))
                            .foregroundColor(DesignTokens.Colors.gold)
                        Text(String(format: "%.1f", school.rating))
                            .font(DesignTokens.Typography.caption())
                            .foregroundColor(DesignTokens.Colors.textSecondary)
                    }
                }
                Text(school.name)
                    .font(DesignTokens.Typography.headline())
                    .foregroundColor(DesignTokens.Colors.textPrimary)
                    .fixedSize(horizontal: false, vertical: true)
                Label(school.address + ", " + school.city, systemImage: "mappin.circle")
                    .font(DesignTokens.Typography.caption())
                    .foregroundColor(DesignTokens.Colors.textSecondary)
                Label(school.phone, systemImage: "phone")
                    .font(DesignTokens.Typography.caption())
                    .foregroundColor(DesignTokens.Colors.textSecondary)
                Divider().background(Color.white.opacity(0.15))
                HStack {
                    Label("\(school.enrollment.formatted()) students", systemImage: "person.2")
                        .font(DesignTokens.Typography.caption())
                        .foregroundColor(DesignTokens.Colors.textSecondary)
                    Spacer()
                    Text("Principal: \(school.principal.name)")
                        .font(DesignTokens.Typography.caption())
                        .foregroundColor(DesignTokens.Colors.textSecondary)
                        .lineLimit(1)
                }
            }
            .padding(16)
        }
    }

    private var levelColor: Color {
        switch school.level {
        case .high:        return DesignTokens.Colors.high
        case .middle:      return DesignTokens.Colors.middle
        case .elementary:  return DesignTokens.Colors.elementary
        }
    }
}
