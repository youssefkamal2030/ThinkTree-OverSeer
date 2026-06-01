import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all groups for a coach
export const listByCoach = query({
  args: { coachId: v.id("coaches") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("groups")
      .withIndex("by_coach", (q) => q.eq("coachId", args.coachId))
      .collect();
  },
});

// Get active groups
export const listActive = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("groups")
      .withIndex("by_status", (q) => q.eq("status", "active"))
      .collect();
  },
});

// Create a new group
export const create = mutation({
  args: {
    coachId: v.id("coaches"),
    level: v.number(),
    startDate: v.number(),
  },
  handler: async (ctx, args) => {
    const groupId = await ctx.db.insert("groups", {
      coachId: args.coachId,
      level: args.level,
      startDate: args.startDate,
      status: "active",
      totalSessions: 8,
      completedSessions: 0,
      createdAt: Date.now(),
    });
    return groupId;
  },
});

// Mark group as completed
export const complete = mutation({
  args: { id: v.id("groups") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: "completed",
      endDate: Date.now(),
    });
  },
});
