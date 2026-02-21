import Foundation

enum SchoolLevel: String, CaseIterable, Identifiable {
    case elementary = "elementary"
    case middle = "middle"
    case high = "high"

    var id: String { rawValue }

    var displayName: String {
        switch self {
        case .elementary: return "Elementary School"
        case .middle: return "Middle School"
        case .high: return "High School"
        }
    }

    var color: String {
        switch self {
        case .elementary: return "#10B981"
        case .middle: return "#F59E0B"
        case .high: return "#C8102E"
        }
    }
}

struct Principal: Identifiable {
    let id = UUID()
    let name: String
    let title: String
    let email: String
    let phone: String
}

struct School: Identifiable {
    let id: String
    let name: String
    let level: SchoolLevel
    let address: String
    let city: String
    let state: String
    let zip: String
    let phone: String
    let website: String
    let enrollment: Int
    let rating: Double
    let principal: Principal
    let mascot: String
    let colors: [String]
    let established: Int
    let latitude: Double
    let longitude: Double
    let description: String
    let features: [String]
}
