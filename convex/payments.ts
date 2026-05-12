import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Calculate base payment for main coach
export const calculateBasePayment = (level: number): number => {
  return 220 * level + 680;
};

// Calculate next payment date (Sunday or Thursday)
export const calculatePaymentDate = (lastSessionDate: number): number => {
  const date = new Date(lastSessionDate);
  const dayOfWeek = date.getDay();
  
  // If last session is Sunday (0) or Monday-Wednesday (1-3), next payment is Thursday
  // If last session is Thursday-Saturday (4-6), next payment is Sunday
  
  let daysToAdd = 0;
  if (dayOfWeek >= 0 && dayOfWeek <= 3) {
    // Next Thursday
    daysToAdd = 4 - dayOfWeek;
  } else {
    // Next Sunday
    daysToAdd = 7 - dayOfWeek;
  }
  
  const paymentDate = new Date(date);
  paymentDate.setDate(date.getDate() + daysToAdd);
  return paymentDate.getTime();
};

// Get payments for a coach
export const listByCoach = query({
  args: { coachId: v.id("coaches") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("payments")
      .withIndex("by_coach", (q) => q.eq("coachId", args.coachId))
      .collect();
  },
});

// Get overdue payments
export const listOverdue = query({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const payments = await ctx.db
      .query("payments")
      .withIndex("by_status", (q) => q.eq("status", "pending"))
      .collect();
    
    return payments.filter((p) => p.expectedPaymentDate < now);
  },
});

// Create payment for completed group
export const createForGroup = mutation({
  args: {
    coachId: v.id("coaches"),
    groupId: v.id("groups"),
    lastSessionDate: v.number(),
  },
  handler: async (ctx, args) => {
    const group = await ctx.db.get(args.groupId);
    if (!group) throw new Error("Group not found");

    const baseAmount = calculateBasePayment(group.level);
    const expectedPaymentDate = calculatePaymentDate(args.lastSessionDate);

    const paymentId = await ctx.db.insert("payments", {
      coachId: args.coachId,
      groupId: args.groupId,
      baseAmount,
      expectedPaymentDate,
      status: "pending",
      createdAt: Date.now(),
    });
    return paymentId;
  },
});

// Mark payment as paid
export const markPaid = mutation({
  args: {
    id: v.id("payments"),
    actualAmount: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const payment = await ctx.db.get(args.id);
    if (!payment) throw new Error("Payment not found");

    await ctx.db.patch(args.id, {
      status: "paid",
      actualPaymentDate: Date.now(),
      adjustedAmount: args.actualAmount,
    });
  },
});

// Update payment status to overdue
export const markOverdue = mutation({
  args: { id: v.id("payments") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: "overdue",
    });
  },
});
