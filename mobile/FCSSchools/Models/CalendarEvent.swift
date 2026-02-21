import Foundation
import SwiftUI

enum EventCategory: String, CaseIterable {
    case district = "district"
    case school = "school"
    case athletics = "athletics"
    case arts = "arts"
    case community = "community"

    var displayName: String {
        switch self {
        case .district: return "District"
        case .school: return "School"
        case .athletics: return "Athletics"
        case .arts: return "Arts"
        case .community: return "Community"
        }
    }

    var color: Color {
        switch self {
        case .district: return Color(hex: "#003087")
        case .school: return Color(hex: "#10B981")
        case .athletics: return Color(hex: "#F59E0B")
        case .arts: return Color(hex: "#8B5CF6")
        case .community: return Color(hex: "#EF4444")
        }
    }
}

struct CalendarEvent: Identifiable {
    let id: String
    let title: String
    let description: String
    let startDate: Date
    let endDate: Date
    let location: String
    let category: EventCategory
    let allDay: Bool
}

extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3:
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6:
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8:
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (255, 0, 0, 0)
        }
        self.init(.sRGB,
                  red: Double(r) / 255,
                  green: Double(g) / 255,
                  blue:  Double(b) / 255,
                  opacity: Double(a) / 255)
    }
}
