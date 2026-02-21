import Foundation

enum SportSeason: String, CaseIterable {
    case fall = "fall"
    case winter = "winter"
    case spring = "spring"

    var displayName: String { rawValue.capitalized }

    var icon: String {
        switch self {
        case .fall: return "leaf.fill"
        case .winter: return "snowflake"
        case .spring: return "sun.max.fill"
        }
    }
}

enum GameStatus: String {
    case upcoming = "upcoming"
    case live = "live"
    case completed = "completed"
}

struct Sport: Identifiable {
    let id: String
    let name: String
    let season: SportSeason
    let icon: String
}

struct Game: Identifiable {
    let id: String
    let sport: String
    let homeTeam: String
    let awayTeam: String
    let date: Date
    let time: String
    let location: String
    let homeScore: Int?
    let awayScore: Int?
    let status: GameStatus
}

struct DistrictStats {
    let totalStudents: Int
    let totalSchools: Int
    let graduationRate: Double
    let collegeReadinessRate: Double
    let apPassRate: Double
    let teacherStudentRatio: Int
    let averageClassSize: Int
    let totalTeachers: Int
}
