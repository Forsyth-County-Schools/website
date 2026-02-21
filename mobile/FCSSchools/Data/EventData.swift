import Foundation

private func date(_ iso: String) -> Date {
    let formatter = ISO8601DateFormatter()
    return formatter.date(from: iso) ?? Date()
}

let sampleEvents: [CalendarEvent] = [
    CalendarEvent(id: "1", title: "Spring Break",
                  description: "No school — Spring Break for all students and staff.",
                  startDate: date("2026-03-16T00:00:00Z"), endDate: date("2026-03-20T23:59:59Z"),
                  location: "District-wide", category: .district, allDay: true),

    CalendarEvent(id: "2", title: "Board of Education Meeting",
                  description: "Regular monthly meeting of the Board of Education.",
                  startDate: date("2026-02-25T18:00:00Z"), endDate: date("2026-02-25T21:00:00Z"),
                  location: "Central Office Board Room", category: .district, allDay: false),

    CalendarEvent(id: "3", title: "District Science Fair",
                  description: "Annual district-wide science fair competition.",
                  startDate: date("2026-03-05T08:00:00Z"), endDate: date("2026-03-05T16:00:00Z"),
                  location: "Forsyth Conference Center", category: .school, allDay: false),

    CalendarEvent(id: "4", title: "State Basketball Tournament",
                  description: "GHSA State Basketball Tournament begins.",
                  startDate: date("2026-03-10T10:00:00Z"), endDate: date("2026-03-14T22:00:00Z"),
                  location: "Macon Centreplex", category: .athletics, allDay: false),

    CalendarEvent(id: "5", title: "Spring Concert Series",
                  description: "District-wide spring concert featuring all high school bands and orchestras.",
                  startDate: date("2026-04-15T19:00:00Z"), endDate: date("2026-04-15T21:30:00Z"),
                  location: "Denmark High School Performing Arts Center", category: .arts, allDay: false),

    CalendarEvent(id: "6", title: "End of Third Quarter",
                  description: "Last day of the third grading quarter.",
                  startDate: date("2026-03-20T00:00:00Z"), endDate: date("2026-03-20T23:59:59Z"),
                  location: "District-wide", category: .district, allDay: true),

    CalendarEvent(id: "7", title: "Teacher Work Day",
                  description: "No school for students. Professional development for teachers.",
                  startDate: date("2026-03-23T00:00:00Z"), endDate: date("2026-03-23T23:59:59Z"),
                  location: "District-wide", category: .district, allDay: true),

    CalendarEvent(id: "8", title: "GHSA State Track & Field",
                  description: "GHSA State Track & Field Championships.",
                  startDate: date("2026-05-01T08:00:00Z"), endDate: date("2026-05-02T18:00:00Z"),
                  location: "Georgia Tech Track", category: .athletics, allDay: false),

    CalendarEvent(id: "9", title: "High School Graduation Season",
                  description: "Graduation ceremonies for all FCS high schools.",
                  startDate: date("2026-05-21T00:00:00Z"), endDate: date("2026-05-28T23:59:59Z"),
                  location: "Various venues", category: .school, allDay: true),

    CalendarEvent(id: "10", title: "Last Day of School",
                  description: "Last day of the 2025-2026 school year.",
                  startDate: date("2026-05-28T00:00:00Z"), endDate: date("2026-05-28T23:59:59Z"),
                  location: "District-wide", category: .district, allDay: true),
]
