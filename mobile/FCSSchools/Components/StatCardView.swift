import SwiftUI

struct StatCardView: View {
    let icon: String
    let value: String
    let label: String
    var body: some View {
        VStack(spacing: 6) {
            Image(systemName: icon)
                .font(.system(size: 22))
                .foregroundColor(AppColors.gold)
            Text(value)
                .font(.system(size: 20, weight: .heavy))
                .foregroundColor(.white)
            Text(label)
                .font(AppFonts.caption())
                .foregroundColor(.white.opacity(0.8))
                .multilineTextAlignment(.center)
        }
        .frame(maxWidth: .infinity)
        .padding(14)
        .background(Color.white.opacity(0.12))
        .cornerRadius(12)
    }
}
