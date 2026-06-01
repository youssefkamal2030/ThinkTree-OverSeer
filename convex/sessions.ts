import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get sessions for a group
export const listByGroup = query({
  args: { groupId: v.id("groups") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("sessions")
      .withIndex("by_group", (q) => q.eq("groupId", args.groupId))
      .collect();
  },
});

// Get upcoming sessions for a coach
export const listUpcoming = query({
  args: { coachId: v.id("coaches") },
  handler: async (ctx, args) => {
    const now = Date.now();
    const sessions = await ctx.db
      .query("sessions")
      .withIndex("by_coach", (q) => q.eq("coachId", args.coachId))
      .collect();
    
    return sessions.filter(
      (s) => s.status === "scheduled" && s.scheduledDate >= now
    );
  },
});

// Create a session
export const create = mutation({
  args: {
    groupId: v.id("groups"),
    coachId: v.id("coaches"),
    sessionNumber: v.number(),
    scheduledDate: v.number(),
    sessionType: v.union(
      v.literal("regular"),
      v.literal("review"),
      v.literal("makeup"),
      v.literal("replacement")
    ),
  },
  handler: async (ctx, args) => {
    const sessionId = await ctx.db.insert("sessions", {
      groupId: args.groupId,
      coachId: args.coachId,
      sessionNumber: args.sessionNumber,
      scheduledDate: args.scheduledDate,
      status: "scheduled",
      sessionType: args.sessionType,
      createdAt: Date.now(),
    });
    return sessionId;
  },
});

// Mark session as completed
export const complete = mutation({
  args: { id: v.id("sessions") },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.id);
    if (!session) throw new Error("Session not found");

    await ctx.db.patch(args.id, {
      status: "completed",
      completedDate: Date.now(),
    });

    // Update group completed sessions count
    const group = await ctx.db.get(session.groupId);
    if (group) {
      const newCompletedCount = group.completedSessions + 1;
      await ctx.db.patch(session.groupId, {
        completedSessions: newCompletedCount,
      });

      // If all 8 sessions completed, mark group as completed
      if (newCompletedCount >= 8) {
        await ctx.db.patch(session.groupId, {
          status: "completed",
          endDate: Date.now(),
        });
      }
    }
  },
});
