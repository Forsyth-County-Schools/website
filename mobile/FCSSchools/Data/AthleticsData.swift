import Foundation

let allSports: [Sport] = [
    // Fall
    Sport(id: "football", name: "Football", season: .fall, icon: "football.fill"),
    Sport(id: "volleyball", name: "Volleyball", season: .fall, icon: "volleyball.fill"),
    Sport(id: "cross_country", name: "Cross Country", season: .fall, icon: "figure.run"),
    Sport(id: "golf_f", name: "Golf (Fall)", season: .fall, icon: "figure.golf"),
    Sport(id: "tennis_f", name: "Tennis (Fall)", season: .fall, icon: "tennisball.fill"),
    // Winter
    Sport(id: "basketball_boys", name: "Boys Basketball", season: .winter, icon: "basketball.fill"),
    Sport(id: "basketball_girls", name: "Girls Basketball", season: .winter, icon: "basketball.fill"),
    Sport(id: "swimming", name: "Swimming & Diving", season: .winter, icon: "figure.pool.swim"),
    Sport(id: "wrestling", name: "Wrestling", season: .winter, icon: "figure.wrestling"),
    Sport(id: "cheerleading", name: "Cheerleading", season: .winter, icon: "figure.gymnastics"),
    // Spring
    Sport(id: "baseball", name: "Baseball", season: .spring, icon: "baseball.fill"),
    Sport(id: "softball", name: "Softball", season: .spring, icon: "baseball"),
    Sport(id: "soccer", name: "Soccer", season: .spring, icon: "soccerball"),
    Sport(id: "track", name: "Track & Field", season: .spring, icon: "figure.run"),
    Sport(id: "lacrosse", name: "Lacrosse", season: .spring, icon: "sportscourt.fill"),
    Sport(id: "tennis_s", name: "Tennis (Spring)", season: .spring, icon: "tennisball.fill"),
]

private func date(_ iso: String) -> Date {
    let f = ISO8601DateFormatter(); return f.date(from: iso) ?? Date()
}

let recentGames: [Game] = [
    Game(id: "g1", sport: "Boys Basketball", homeTeam: "Lambert Longhorns",
         awayTeam: "South Forsyth War Eagles",
         date: date("2026-02-20T19:00:00Z"), time: "7:00 PM",
         location: "Lambert High School Gym", homeScore: 68, awayScore: 55, status: .completed),

    Game(id: "g2", sport: "Girls Basketball", homeTeam: "West Forsyth Wolverines",
         awayTeam: "North Forsyth Raiders",
         date: date("2026-02-21T18:00:00Z"), time: "6:00 PM",
         location: "West Forsyth High School", homeScore: 52, awayScore: 48, status: .completed),

    Game(id: "g3", sport: "Boys Basketball", homeTeam: "Forsyth Central Bulldogs",
         awayTeam: "Denmark Danes",
         date: date("2026-02-25T19:00:00Z"), time: "7:00 PM",
         location: "Forsyth Central High School", homeScore: nil, awayScore: nil, status: .upcoming),

    Game(id: "g4", sport: "Wrestling", homeTeam: "Lambert Longhorns",
         awayTeam: "Forsyth Central Bulldogs",
         date: date("2026-02-24T17:00:00Z"), time: "5:00 PM",
         location: "Forsyth Central High School", homeScore: nil, awayScore: nil, status: .upcoming),

    Game(id: "g5", sport: "Swimming", homeTeam: "South Forsyth War Eagles",
         awayTeam: "West Forsyth Wolverines",
         date: date("2026-02-22T10:00:00Z"), time: "10:00 AM",
         location: "South Forsyth Aquatic Center", homeScore: 198, awayScore: 175, status: .completed),

    Game(id: "g6", sport: "Boys Basketball", homeTeam: "East Forsyth Broncos",
         awayTeam: "Lambert Longhorns",
         date: date("2026-02-28T19:00:00Z"), time: "7:00 PM",
         location: "East Forsyth High School", homeScore: nil, awayScore: nil, status: .upcoming),
]
