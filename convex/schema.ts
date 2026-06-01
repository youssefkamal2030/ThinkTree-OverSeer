import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Coaches table
  coaches: defineTable({
    name: v.string(),
    email: v.string(),
    type: v.union(v.literal("main"), v.literal("freelance")),
    createdAt: v.number(),
  }).index("by_email", ["email"]),

  // Groups table
  groups: defineTable({
    coachId: v.id("coaches"),
    level: v.number(), // 1-13
    startDate: v.number(), // timestamp
    endDate: v.optional(v.number()), // timestamp when 8th session completed
    status: v.union(v.literal("active"), v.literal("completed")),
    totalSessions: v.number(), // should be 8
    completedSessions: v.number(),
    createdAt: v.number(),
  }).index("by_coach", ["coachId"])
    .index("by_status", ["status"]),

  // Sessions table
  sessions: defineTable({
    groupId: v.id("groups"),
    coachId: v.id("coaches"),
    sessionNumber: v.number(), // 1-8
    scheduledDate: v.number(), // timestamp
    completedDate: v.optional(v.number()), // timestamp when marked complete
    status: v.union(
      v.literal("scheduled"),
      v.literal("completed"),
      v.literal("cancelled")
    ),
    sessionType: v.union(
      v.literal("regular"),
      v.literal("review"),
      v.literal("makeup"),
      v.literal("replacement")
    ),
    notes: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_group", ["groupId"])
    .index("by_coach", ["coachId"])
    .index("by_scheduled_date", ["scheduledDate"]),

  // Payments table
  payments: defineTable({
    coachId: v.id("coaches"),
    groupId: v.optional(v.id("groups")), // null for freelance per-session payments
    sessionId: v.optional(v.id("sessions")), // for freelance payments
    baseAmount: v.number(), // calculated amount (220 × level + 680)
    adjustedAmount: v.optional(v.number()), // final amount after adjustments
    expectedPaymentDate: v.number(), // calculated Sunday/Thursday
    actualPaymentDate: v.optional(v.number()), // when actually paid
    status: v.union(
      v.literal("pending"),
      v.literal("overdue"),
      v.literal("paid")
    ),
    adjustmentReason: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_coach", ["coachId"])
    .index("by_status", ["status"])
    .index("by_expected_date", ["expectedPaymentDate"]),

  // Reminders table (for email tracking)
  reminders: defineTable({
    coachId: v.id("coaches"),
    type: v.union(v.literal("session"), v.literal("payment")),
    relatedId: v.string(), // sessionId or paymentId
    sentAt: v.number(),
    status: v.union(v.literal("sent"), v.literal("failed")),
  }).index("by_coach", ["coachId"]),
});
