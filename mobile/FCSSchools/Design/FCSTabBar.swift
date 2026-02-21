import SwiftUI

// MARK: - FCSTab enum

enum FCSTab: Int, CaseIterable {
    case home, news, schools, calendar, athletics, more

    var title: String {
        switch self {
        case .home:      return "Home"
        case .news:      return "News"
        case .schools:   return "Schools"
        case .calendar:  return "Calendar"
        case .athletics: return "Athletics"
        case .more:      return "More"
        }
    }

    var icon: String {
        switch self {
        case .home:      return "house.fill"
        case .news:      return "newspaper.fill"
        case .schools:   return "building.2.fill"
        case .calendar:  return "calendar"
        case .athletics: return "trophy.fill"
        case .more:      return "ellipsis.circle.fill"
        }
    }
}

// MARK: - FCSTabBar View

struct FCSTabBar: View {
    @Binding var selected: FCSTab

    var body: some View {
        HStack(spacing: 0) {
            ForEach(FCSTab.allCases, id: \.rawValue) { tab in
                tabButton(tab)
            }
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 10)
        .background(pillBackground)
        .padding(.horizontal, 16)
        .padding(.bottom, 8)
    }

    // MARK: - Individual tab button

    @ViewBuilder
    private func tabButton(_ tab: FCSTab) -> some View {
        Button {
            guard tab != selected else { return }
            UIImpactFeedbackGenerator(style: .light).impactOccurred()
            withAnimation(.spring(response: 0.35, dampingFraction: 0.70)) {
                selected = tab
            }
        } label: {
            VStack(spacing: 3) {
                Image(systemName: tab.icon)
                    .font(.system(size: tab == selected ? 22 : 18, weight: .semibold))
                    .foregroundColor(tab == selected ? DesignTokens.Colors.gold : .white.opacity(0.50))
                    .scaleEffect(tab == selected ? 1.15 : 1.0)
                    .animation(.spring(response: 0.35, dampingFraction: 0.70), value: selected)

                Text(tab.title)
                    .font(DesignTokens.Typography.label(9))
                    .foregroundColor(tab == selected ? DesignTokens.Colors.gold : .white.opacity(0.45))

                // Gold dot indicator
                Circle()
                    .fill(DesignTokens.Colors.gold)
                    .frame(width: 4, height: 4)
                    .opacity(tab == selected ? 1 : 0)
                    .scaleEffect(tab == selected ? 1 : 0.1)
                    .animation(.spring(response: 0.35, dampingFraction: 0.70), value: selected)
            }
            .frame(maxWidth: .infinity)
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
    }

    // MARK: - Pill background

    private var pillBackground: some View {
        ZStack {
            RoundedRectangle(cornerRadius: 28, style: .continuous)
                .fill(.regularMaterial)
            RoundedRectangle(cornerRadius: 28, style: .continuous)
                .fill(DesignTokens.Colors.navy.opacity(0.70))
            RoundedRectangle(cornerRadius: 28, style: .continuous)
                .strokeBorder(
                    LinearGradient(
                        colors: [
                            DesignTokens.Colors.gold.opacity(0.60),
                            DesignTokens.Colors.gold.opacity(0.10),
                        ],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    ),
                    lineWidth: 1
                )
        }
    }
}

// MARK: - Preview

#Preview {
    ZStack(alignment: .bottom) {
        DesignTokens.Colors.surface0.ignoresSafeArea()
        FCSTabBar(selected: .constant(.home))
    }
    .preferredColorScheme(.dark)
}
