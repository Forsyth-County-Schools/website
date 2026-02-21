import Foundation

private func date(_ iso: String) -> Date {
    let formatter = ISO8601DateFormatter()
    return formatter.date(from: iso) ?? Date()
}

let sampleNews: [NewsArticle] = [
    NewsArticle(id: "1", title: "Forsyth County Schools Achieves Record 96.2% Graduation Rate",
                excerpt: "The district celebrates its highest graduation rate in history, with all seven high schools exceeding state and national averages.",
                content: "Forsyth County Schools is proud to announce a record-breaking graduation rate of 96.2% for the 2025-2026 school year. This milestone reflects the dedication of our students, teachers, and families. Every high school in the district exceeded both state and national averages, a testament to our commitment to academic excellence.",
                category: "District News", author: "Communications Office",
                publishedAt: date("2026-02-15T10:00:00Z"), featured: true,
                tags: ["graduation", "achievement", "district"]),

    NewsArticle(id: "2", title: "STEM Initiative Expands to All Elementary Schools",
                excerpt: "Every elementary school will now feature dedicated STEM labs and robotics programs starting fall 2026.",
                content: "Building on the success of our pilot STEM programs, Forsyth County Schools is expanding dedicated STEM labs and robotics programs to all 25 elementary schools. The initiative, funded by the recently approved bond referendum, will ensure every FCS student has hands-on STEM experiences from their earliest school years.",
                category: "Academics", author: "Dr. Sarah Thompson",
                publishedAt: date("2026-02-12T14:30:00Z"), featured: true,
                tags: ["stem", "technology", "elementary"]),

    NewsArticle(id: "3", title: "Lambert High School Wins State Football Championship",
                excerpt: "The Longhorns bring home their third state title with an impressive victory in the championship game.",
                content: "Lambert High School's football team capped an undefeated season by claiming the GHSA 7A State Championship title, defeating the defending champions 28-14. This marks the Longhorns' third state title in program history.",
                category: "Athletics", author: "Sports Desk",
                publishedAt: date("2026-02-10T20:00:00Z"), featured: true,
                tags: ["athletics", "football", "championship", "lambert"]),

    NewsArticle(id: "4", title: "State-of-the-Art Fine Arts Center Opens at Denmark High",
                excerpt: "The new 25,000 sq ft facility features a 500-seat auditorium and professional-grade studios.",
                content: "Denmark High School unveiled its stunning new Fine Arts Center, a 25,000-square-foot facility that includes a 500-seat auditorium, recording studios, art galleries, and practice rooms. The center will serve students across the district for performances and arts education.",
                category: "Fine Arts", author: "Fine Arts Department",
                publishedAt: date("2026-02-08T09:00:00Z"), featured: false,
                tags: ["fine arts", "facilities", "denmark"]),

    NewsArticle(id: "5", title: "District Expands Mental Health Resources for Students",
                excerpt: "New counselors and programs aim to support student wellness across all grade levels.",
                content: "Forsyth County Schools is investing in student mental health with 45 new counselors and expanded wellness programs across all 42 schools. The initiative includes mindfulness programs, peer support groups, and 24/7 crisis resources.",
                category: "Student Services", author: "Student Services Office",
                publishedAt: date("2026-02-05T11:00:00Z"), featured: false,
                tags: ["wellness", "mental health", "support"]),

    NewsArticle(id: "6", title: "Voters Approve $680 Million School Bond Referendum",
                excerpt: "The approved bond will fund two new schools, technology upgrades, and facility improvements.",
                content: "Forsyth County voters overwhelmingly approved a $680 million bond referendum that will fund two new elementary schools, district-wide technology upgrades, gymnasium renovations, and safety improvements across all 42 campuses.",
                category: "District News", author: "Communications Office",
                publishedAt: date("2026-02-01T18:00:00Z"), featured: false,
                tags: ["bond", "facilities", "community"]),

    NewsArticle(id: "7", title: "South Forsyth Robotics Team Advances to World Championship",
                excerpt: "The War Eagles robotics team earned a berth at the VEX Robotics World Championship.",
                content: "South Forsyth High School's robotics team, the War Eagles, earned a coveted spot at the VEX Robotics World Championship after a dominant performance at the state competition. The team will represent Georgia in Dallas next spring.",
                category: "Academics", author: "STEM Department",
                publishedAt: date("2026-01-28T15:00:00Z"), featured: false,
                tags: ["robotics", "stem", "competition", "south forsyth"]),

    NewsArticle(id: "8", title: "New Superintendent Dr. Mitch Young Outlines Five-Year Vision",
                excerpt: "Superintendent Young unveils a bold plan focused on innovation, equity, and community.",
                content: "Superintendent Dr. Mitch Young presented his five-year strategic plan to the Board of Education, outlining key priorities including one-to-one technology access, expanded dual enrollment opportunities, and a commitment to recruiting and retaining top teachers.",
                category: "Leadership", author: "Board of Education",
                publishedAt: date("2026-01-20T10:00:00Z"), featured: false,
                tags: ["superintendent", "strategy", "leadership"]),

    NewsArticle(id: "9", title: "FCS Recognized as a National Leader in AP Participation",
                excerpt: "The College Board recognizes the district for expanding Advanced Placement access.",
                content: "The College Board has recognized Forsyth County Schools as a national leader in expanding AP course access and participation. Over 78% of AP exams taken by FCS students earned a passing score of 3 or higher, well above national averages.",
                category: "Academics", author: "Academics Office",
                publishedAt: date("2026-01-15T09:00:00Z"), featured: false,
                tags: ["AP", "academics", "college board", "achievement"]),

    NewsArticle(id: "10", title: "Early Kindergarten Registration Now Open",
                excerpt: "Families with children born on or before September 1, 2021 can register for fall kindergarten.",
                content: "Forsyth County Schools invites families to register their children for kindergarten for the 2026-2027 school year. Registration is available online at forsyth.k12.ga.us. Students must turn 5 on or before September 1, 2026. Families are encouraged to register early to ensure placement at their zoned school.",
                category: "Enrollment", author: "Student Services",
                publishedAt: date("2026-01-10T08:00:00Z"), featured: false,
                tags: ["kindergarten", "enrollment", "registration"]),
]
