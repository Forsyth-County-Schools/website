import SwiftUI

struct CalendarView: View {
    @State private var selectedMonth = Calendar.current.component(.month, from: Date())
    @State private var selectedYear  = Calendar.current.component(.year, from: Date())
    @State private var selectedDate: Date? = nil

    private var calendar: Calendar { Calendar.current }

    private var monthTitle: String {
        let components = DateComponents(year: selectedYear, month: selectedMonth)
        let date = calendar.date(from: components) ?? Date()
        let formatter = DateFormatter()
        formatter.dateFormat = "MMMM yyyy"
        return formatter.string(from: date)
    }

    private var daysInMonth: [Date?] {
        let components = DateComponents(year: selectedYear, month: selectedMonth, day: 1)
        guard let firstDay = calendar.date(from: components) else { return [] }
        let range = calendar.range(of: .day, in: .month, for: firstDay)!
        let weekday = calendar.component(.weekday, from: firstDay) - 1
        var days: [Date?] = Array(repeating: nil, count: weekday)
        for day in range {
            let d = DateComponents(year: selectedYear, month: selectedMonth, day: day)
            days.append(calendar.date(from: d))
        }
        return days
    }

    private var eventsForSelected: [CalendarEvent] {
        guard let sel = selectedDate else { return [] }
        return sampleEvents.filter {
            calendar.isDate($0.startDate, inSameDayAs: sel) ||
            ($0.startDate <= sel && $0.endDate >= sel)
        }
    }

    private var upcomingEvents: [CalendarEvent] {
        sampleEvents
            .filter { $0.startDate >= Date() }
            .sorted { $0.startDate < $1.startDate }
    }

    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: 0) {
                    // Month navigator
                    HStack {
                        Button { shiftMonth(-1) } label: {
                            Image(systemName: "chevron.left")
                                .foregroundColor(DesignTokens.Colors.gold)
                                .padding(8)
                        }
                        Spacer()
                        Text(monthTitle)
                            .font(DesignTokens.Typography.subheadline(17))
                            .fontWeight(.bold)
                            .foregroundColor(DesignTokens.Colors.textPrimary)
                        Spacer()
                        Button { shiftMonth(1) } label: {
                            Image(systemName: "chevron.right")
                                .foregroundColor(DesignTokens.Colors.gold)
                                .padding(8)
                        }
                    }
                    .padding(.horizontal, 12)
                    .padding(.top, 8)

                    // Weekday headers
                    HStack {
                        ForEach(["Su","Mo","Tu","We","Th","Fr","Sa"], id: \.self) { d in
                            Text(d)
                                .font(DesignTokens.Typography.label(12))
                                .foregroundColor(DesignTokens.Colors.textSecondary)
                                .frame(maxWidth: .infinity)
                        }
                    }
                    .padding(.horizontal, 8)
                    .padding(.top, 8)

                    // Day grid
                    let cols = Array(repeating: GridItem(.flexible()), count: 7)
                    LazyVGrid(columns: cols, spacing: 4) {
                        ForEach(daysInMonth.indices, id: \.self) { i in
                            if let day = daysInMonth[i] {
                                DayCell(date: day,
                                        isSelected: selectedDate.map { calendar.isDate($0, inSameDayAs: day) } ?? false,
                                        isToday: calendar.isDateInToday(day),
                                        hasEvent: sampleEvents.contains { calendar.isDate($0.startDate, inSameDayAs: day) })
                                .onTapGesture {
                                    selectedDate = selectedDate.map { calendar.isDate($0, inSameDayAs: day) } ?? false ? nil : day
                                }
                            } else {
                                Color.clear.frame(height: 40)
                            }
                        }
                    }
                    .padding(.horizontal, 8)
                    .padding(.bottom, 12)

                    // Category legend
                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack(spacing: 12) {
                            ForEach(EventCategory.allCases, id: \.self) { cat in
                                HStack(spacing: 4) {
                                    Circle().fill(cat.color).frame(width: 8, height: 8)
                                    Text(cat.displayName)
                                        .font(DesignTokens.Typography.caption(12))
                                        .foregroundColor(DesignTokens.Colors.textSecondary)
                                }
                            }
                        }
                        .padding(.horizontal, 16)
                    }
                    .padding(.bottom, 16)

                    Divider().background(Color.white.opacity(0.15))

                    // Events for selected date OR upcoming
                    let events = selectedDate != nil ? eventsForSelected : upcomingEvents
                    VStack(alignment: .leading, spacing: 12) {
                        Text(selectedDate != nil ? "Events on this day" : "Upcoming Events")
                            .font(DesignTokens.Typography.subheadline())
                            .foregroundColor(DesignTokens.Colors.textPrimary)
                            .padding(.horizontal, 16)
                            .padding(.top, 16)

                        if events.isEmpty {
                            Text("No events")
                                .font(DesignTokens.Typography.body())
                                .foregroundColor(DesignTokens.Colors.textSecondary)
                                .padding(.horizontal, 16)
                        } else {
                            ForEach(events) { event in
                                EventRow(event: event)
                                    .padding(.horizontal, 16)
                            }
                        }
                    }
                    .padding(.bottom, 32)
                }
            }
            .background(.clear)
            .navigationTitle("Calendar")
            .navigationBarTitleDisplayMode(.large)
            .toolbarColorScheme(.dark, for: .navigationBar)
            .toolbarBackground(.clear, for: .navigationBar)
        }
        .navigationViewStyle(.stack)
    }

    private func shiftMonth(_ delta: Int) {
        var comps = DateComponents()
        comps.month = delta
        let base = Calendar.current.date(from: DateComponents(year: selectedYear, month: selectedMonth)) ?? Date()
        let shifted = Calendar.current.date(byAdding: comps, to: base) ?? Date()
        selectedMonth = Calendar.current.component(.month, from: shifted)
        selectedYear  = Calendar.current.component(.year,  from: shifted)
        selectedDate  = nil
    }
}

struct DayCell: View {
    let date: Date
    let isSelected: Bool
    let isToday: Bool
    let hasEvent: Bool
    private var day: Int { Calendar.current.component(.day, from: date) }
    var body: some View {
        VStack(spacing: 2) {
            Text("\(day)")
                .font(.system(size: 15, weight: isToday ? .bold : .regular))
                .foregroundColor(
                    isSelected ? DesignTokens.Colors.navy
                    : isToday  ? DesignTokens.Colors.gold
                    : DesignTokens.Colors.textPrimary
                )
                .frame(width: 36, height: 36)
                .background(
                    isSelected ? DesignTokens.Colors.gold
                    : isToday  ? DesignTokens.Colors.gold.opacity(0.20)
                    : Color.clear
                )
                .clipShape(Circle())
            Circle()
                .fill(hasEvent ? DesignTokens.Colors.gold : Color.clear)
                .frame(width: 5, height: 5)
        }
    }
}

struct EventRow: View {
    let event: CalendarEvent
    private var dateStr: String {
        let f = DateFormatter()
        f.dateStyle = .medium; f.timeStyle = event.allDay ? .none : .short
        return f.string(from: event.startDate)
    }
    var body: some View {
        GlassCard(.subtle) {
            HStack(alignment: .top, spacing: 12) {
                RoundedRectangle(cornerRadius: 3)
                    .fill(event.category.color)
                    .frame(width: 4)
                VStack(alignment: .leading, spacing: 4) {
                    Text(event.title)
                        .font(DesignTokens.Typography.subheadline())
                        .foregroundColor(DesignTokens.Colors.textPrimary)
                    Text(dateStr)
                        .font(DesignTokens.Typography.caption())
                        .foregroundColor(DesignTokens.Colors.textSecondary)
                    if !event.location.isEmpty {
                        Label(event.location, systemImage: "mappin")
                            .font(DesignTokens.Typography.caption())
                            .foregroundColor(DesignTokens.Colors.textSecondary)
                    }
                    Text(event.description)
                        .font(DesignTokens.Typography.body(14))
                        .foregroundColor(DesignTokens.Colors.textSecondary)
                        .lineLimit(2)
                }
            }
            .padding(12)
        }
    }
}
