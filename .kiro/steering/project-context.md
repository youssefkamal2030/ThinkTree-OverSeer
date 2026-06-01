# Chess Academy Payment & Group Management System

## Project Overview

This is a payment and group management system designed for a chess academy that works with part-time chess coaches. The system manages coach assignments, session tracking, payment calculations, and reminders.

## Business Model

### Coach Types

**Main Coaches:**
- Assigned multiple groups of children across different levels (1–13)
- Each group attends one session per week for 8 sessions total
- Paid per completed group using the formula: `220 × level + 680`
- Final payment may vary based on business factors

**Freelance Coaches:**
- Act as substitutes for main coaches
- Paid per session rather than per group
- Payments usually processed after completion of entire level

### Group Structure

- **Levels:** 1–13 (different skill/age groups)
- **Sessions:** 8 sessions per group (1 session/week)
- **Duration:** ~8 weeks per group cycle
- **Completion:** Group is considered complete after all 8 sessions

### Payment Calculation

**Base Formula (Main Coaches):**
```
Payment = 220 × level + 680
```

**Payment Adjustments:**
The final payment may vary based on:
- Coach performance during sessions
- Session type (regular, review, makeup, replacement, etc.)
- Academy bonuses or penalties
- Other internal adjustments

**Important:** Calculated earnings represent expected values, not guaranteed final payouts.

### Payment Schedule

- Payments are NOT issued immediately after group completion
- Payment dates: Either **Sunday** or **Thursday** following the last session
- Example: If final session is on Thursday → payment arrives next Sunday or Thursday
- Freelancers: Usually paid after entire level completion

## MVP Requirements

### Core Features

1. **Session Tracking**
   - Track all assigned sessions
   - Track completed sessions
   - View session history

2. **Group Management**
   - View group information (level, start date, end date)
   - Track group completion status
   - Monitor active vs completed groups

3. **Payment Management**
   - Estimate expected payments based on completed groups
   - Calculate expected payment dates
   - Detect overdue payments
   - Send follow-up email reminders for overdue payments

4. **Income Estimation**
   - Calculate estimated monthly income
   - Calculate estimated weekly income
   - Based on completed sessions and groups

5. **Session Reminders**
   - Receive reminders for upcoming scheduled sessions
   - Notification system for session alerts

### Technical Requirements

- **Responsive Design:** Must work on both mobile and desktop devices
- **Real-time Updates:** Session and payment status should update in real-time
- **Email Integration:** Automated email reminders for overdue payments

## Key Business Rules

1. A group is complete after 8 sessions
2. Payment calculation uses level-based formula but may be adjusted
3. Payment dates follow Sunday/Thursday schedule after last session
4. Freelancers have different payment structure (per session vs per group)
5. System should flag overdue payments for follow-up
6. All payment amounts are estimates until academy confirms final payout

## User Roles

- **Main Coach:** Full-time or regular part-time coaches with assigned groups
- **Freelance Coach:** Substitute coaches paid per session
- **Admin/Academy:** (Future consideration for payment confirmation and adjustments)

## Technology Stack

- **Frontend:** Next.js (App Router)
- **Backend:** Convex (real-time database)
- **Deployment:** Vercel
- **Styling:** Tailwind CSS (based on globals.css)

## Development Priorities

1. Session and group tracking
2. Payment calculation engine
3. Payment date estimation
4. Overdue payment detection
5. Email reminder system
6. Income estimation dashboard
7. Session reminder notifications
