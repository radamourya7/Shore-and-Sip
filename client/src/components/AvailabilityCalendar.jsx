import { useState, useEffect, useCallback } from 'react';
import { getBookedDates } from '../services/api';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function isSameDay(a, b) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isDateInRange(date, ranges) {
    return ranges.some(r => {
        const ci = new Date(r.checkIn); ci.setHours(0, 0, 0, 0);
        const co = new Date(r.checkOut); co.setHours(0, 0, 0, 0);
        return date >= ci && date < co;
    });
}

function generateCalendarDays(year, month) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
    return cells;
}

export default function AvailabilityCalendar({ roomId, onSelectDates }) {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const [bookedRanges, setBookedRanges] = useState([]);
    const [viewMonth, setViewMonth] = useState({ year: today.getFullYear(), month: today.getMonth() });
    const [hoveredDate, setHoveredDate] = useState(null);
    const [selection, setSelection] = useState({ start: null, end: null });

    useEffect(() => {
        if (!roomId) return;
        getBookedDates(roomId).then(r => setBookedRanges(r.data)).catch(() => { });
    }, [roomId]);

    const prevMonth = () => setViewMonth(v => {
        const d = new Date(v.year, v.month - 1, 1);
        return { year: d.getFullYear(), month: d.getMonth() };
    });
    const nextMonth = () => setViewMonth(v => {
        const d = new Date(v.year, v.month + 1, 1);
        return { year: d.getFullYear(), month: d.getMonth() };
    });

    const getSecondMonth = () => {
        const d = new Date(viewMonth.year, viewMonth.month + 1, 1);
        return { year: d.getFullYear(), month: d.getMonth() };
    };

    const handleDateClick = useCallback((date) => {
        if (!date || date < today || isDateInRange(date, bookedRanges)) return;
        if (!selection.start || (selection.start && selection.end)) {
            setSelection({ start: date, end: null });
        } else {
            if (date <= selection.start) {
                setSelection({ start: date, end: null });
                return;
            }
            // Check no booked dates in range
            const rangeBooked = bookedRanges.some(r => {
                const ci = new Date(r.checkIn); ci.setHours(0, 0, 0, 0);
                return ci > selection.start && ci < date;
            });
            if (rangeBooked) {
                alert('A booked date exists in your selected range. Please choose different dates.');
                setSelection({ start: date, end: null });
                return;
            }
            const end = date;
            setSelection({ start: selection.start, end });
            if (onSelectDates) {
                onSelectDates(
                    selection.start.toISOString().split('T')[0],
                    end.toISOString().split('T')[0]
                );
            }
        }
    }, [selection, bookedRanges, today, onSelectDates]);

    const isInSelection = (date) => {
        if (!date) return false;
        const start = selection.start;
        const end = selection.end || hoveredDate;
        if (!start || !end) return false;
        const lo = start < end ? start : end;
        const hi = start < end ? end : start;
        return date > lo && date < hi;
    };

    const getDayStyle = (date) => {
        if (!date) return {};
        const isPast = date < today;
        const isBooked = isDateInRange(date, bookedRanges);
        const isStart = selection.start && isSameDay(date, selection.start);
        const isEnd = selection.end && isSameDay(date, selection.end);
        const isSelected = isStart || isEnd;
        const inRange = isInSelection(date);
        const isToday = isSameDay(date, today);
        const isHovered = hoveredDate && isSameDay(date, hoveredDate);

        let bg = 'transparent', color = '#1A1A2E', cursor = 'pointer', fontWeight = 400, opacity = 1;

        if (isPast) { color = '#c5c5d5'; cursor = 'not-allowed'; opacity = 0.4; }
        else if (isBooked) { bg = '#fee2e2'; color = '#ef4444'; cursor = 'not-allowed'; fontWeight = 500; }
        else if (isSelected) { bg = '#D4854A'; color = 'white'; fontWeight = 700; }
        else if (inRange) { bg = 'rgba(212,133,74,0.15)'; color = '#D4854A'; }
        else if (isToday) { bg = '#fff3ea'; color = '#D4854A'; fontWeight = 700; }
        else if (isHovered && !isPast && !isBooked) { bg = 'rgba(212,133,74,0.08)'; }

        return { background: bg, color, cursor, fontWeight, opacity };
    };

    const renderMonth = ({ year, month }) => {
        const cells = generateCalendarDays(year, month);
        return (
            <div style={{ flex: '1 1 280px', minWidth: '260px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    {month === viewMonth.month && year === viewMonth.year
                        ? <button onClick={prevMonth} style={{ background: 'none', border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '0.3rem 0.6rem', cursor: 'pointer', fontSize: '0.9rem', color: '#555' }}>‹</button>
                        : <span style={{ width: '32px' }} />}
                    <span style={{ fontWeight: 600, color: '#1A1A2E', fontSize: '0.95rem' }}>{MONTHS[month]} {year}</span>
                    {month !== viewMonth.month
                        ? <button onClick={nextMonth} style={{ background: 'none', border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '0.3rem 0.6rem', cursor: 'pointer', fontSize: '0.9rem', color: '#555' }}>›</button>
                        : <span style={{ width: '32px' }} />}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
                    {DAYS.map(d => <div key={d} style={{ textAlign: 'center', fontSize: '0.7rem', fontWeight: 600, color: '#7a7a9a', padding: '4px 0' }}>{d}</div>)}
                    {cells.map((date, i) => (
                        <div key={i}
                            style={{ textAlign: 'center', padding: '6px 2px', borderRadius: '0.4rem', fontSize: '0.8rem', transition: 'all 0.1s', ...getDayStyle(date) }}
                            onClick={() => handleDateClick(date)}
                            onMouseEnter={() => date && setHoveredDate(date)}
                            onMouseLeave={() => setHoveredDate(null)}>
                            {date ? date.getDate() : ''}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const second = getSecondMonth();
    const nights = selection.start && selection.end
        ? Math.ceil((selection.end - selection.start) / (1000 * 60 * 60 * 24))
        : 0;

    if (!roomId) return null;

    return (
        <div style={{ background: 'white', borderRadius: '1.25rem', padding: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: '1.5rem' }}>
            <h3 style={{ fontWeight: 600, color: '#1A1A2E', fontSize: '0.95rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                📅 Availability Calendar
                <span style={{ fontWeight: 400, fontSize: '0.8rem', color: '#7a7a9a' }}>— Click to select check-in then check-out</span>
            </h3>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {renderMonth(viewMonth)}
                {renderMonth(second)}
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #f0f0f0' }}>
                {[
                    { color: '#fff3ea', border: '1px solid #D4854A', label: 'Today' },
                    { color: '#D4854A', label: 'Selected' },
                    { color: 'rgba(212,133,74,0.15)', border: '1px solid rgba(212,133,74,0.3)', label: 'Your stay' },
                    { color: '#fee2e2', border: '1px solid #fca5a5', label: 'Booked' },
                ].map((l, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#7a7a9a' }}>
                        <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: l.color, border: l.border || 'none' }} />
                        {l.label}
                    </div>
                ))}
            </div>

            {/* Selection summary */}
            {selection.start && (
                <div style={{ marginTop: '0.75rem', background: 'linear-gradient(135deg, #fff8f2, #f0f7ff)', borderRadius: '0.75rem', padding: '0.75rem 1rem', fontSize: '0.875rem' }}>
                    {selection.end ? (
                        <span style={{ color: '#1A1A2E', fontWeight: 500 }}>
                            ✅ <strong>{selection.start.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</strong>
                            {' → '}
                            <strong>{selection.end.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</strong>
                            {' · '}
                            <span style={{ color: '#D4854A', fontWeight: 700 }}>{nights} night{nights > 1 ? 's' : ''}</span>
                        </span>
                    ) : (
                        <span style={{ color: '#7a7a9a' }}>
                            Check-in: <strong style={{ color: '#1A1A2E' }}>{selection.start.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</strong> — now click a check-out date
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}
