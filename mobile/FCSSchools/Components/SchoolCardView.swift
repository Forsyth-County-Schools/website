import SwiftUI

struct SchoolCardView: View {
    let school: School
    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            HStack(spacing: 6) {
                Circle()
                    .fill(levelColor)
                    .frame(width: 8, height: 8)
                Text(school.level.displayName.uppercased())
                    .font(AppFonts.label())
                    .foregroundColor(levelColor)
                    .kerning(0.5)
                Spacer()
                HStack(spacing: 3) {
                    Image(systemName: "star.fill")
                        .font(.system(size: 11))
                        .foregroundColor(AppColors.gold)
                    Text(String(format: "%.1f", school.rating))
                        .font(AppFonts.caption())
                        .foregroundColor(.secondary)
                }
            }
            Text(school.name)
                .font(AppFonts.headline())
                .foregroundColor(AppColors.primary)
                .fixedSize(horizontal: false, vertical: true)
            Label(school.address + ", " + school.city, systemImage: "mappin.circle")
                .font(AppFonts.caption())
                .foregroundColor(.secondary)
            Label(school.phone, systemImage: "phone")
                .font(AppFonts.caption())
                .foregroundColor(.secondary)
            Divider()
            HStack {
                Label("\(school.enrollment.formatted()) students", systemImage: "person.2")
                    .font(AppFonts.caption())
                    .foregroundColor(.secondary)
                Spacer()
                Text("Principal: \(school.principal.name)")
                    .font(AppFonts.caption())
                    .foregroundColor(.secondary)
                    .lineLimit(1)
            }
        }
        .padding(16)
        .background(Color(.systemBackground))
        .cornerRadius(12)
        .shadow(color: .black.opacity(0.06), radius: 6, x: 0, y: 2)
    }

    private var levelColor: Color {
        switch school.level {
        case .high: return AppColors.high
        case .middle: return AppColors.middle
        case .elementary: return AppColors.elementary
        }
    }
}
