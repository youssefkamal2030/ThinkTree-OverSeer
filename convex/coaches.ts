import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all coaches
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("coaches").collect();
  },
});

// Get coach by ID
export const getById = query({
  args: { id: v.id("coaches") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Create a new coach
export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    type: v.union(v.literal("main"), v.literal("freelance")),
  },
  handler: async (ctx, args) => {
    const coachId = await ctx.db.insert("coaches", {
      name: args.name,
      email: args.email,
      type: args.type,
      createdAt: Date.now(),
    });
    return coachId;
  },
});
