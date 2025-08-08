import { z } from 'zod';

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  city: z.string().optional(),
  state: z.string().optional(),
  createdAt: z.any(),
  updatedAt: z.any(),
});
export type Project = z.infer<typeof ProjectSchema>;

export const SegmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  geom: z.any(),
  utilities: z.array(z.string()),
  ticket: z
    .object({
      number: z.string().optional(),
      description: z.string().optional(),
      openedAt: z.any().optional(),
      expiresAt: z.any().optional(),
    })
    .optional(),
  locate: z.object({
    status: z.enum(['pending_ticket', 'pending_locates', 'in_progress', 'completed']),
    updatedAt: z.any().optional(),
    updatedBy: z.string().optional(),
  }),
  conflicts: z
    .object({
      difficult: z.boolean().optional(),
      access: z.boolean().optional(),
      highProfile: z.boolean().optional(),
      standby: z.boolean().optional(),
      notes: z.string().optional(),
    })
    .optional(),
  soil: z
    .object({
      dominant: z.string().optional(),
      summary: z.record(z.number()).optional(),
    })
    .optional(),
  history: z.array(z.object({ at: z.any(), by: z.string(), change: z.string() })),
});
export type Segment = z.infer<typeof SegmentSchema>;

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  displayName: z.string(),
  roles: z.array(z.string()),
  assignments: z.object({ projects: z.array(z.string()), utilities: z.array(z.string()) }),
});
export type User = z.infer<typeof UserSchema>;

export const StateProfileSchema = z.object({
  callAheadDays: z.number(),
  ticketLifeDays: z.number(),
  ruralMaxMiles: z.number(),
  descriptionTemplate: z.string(),
  positiveResponseCodes: z.array(z.string()),
});
export type StateProfile = z.infer<typeof StateProfileSchema>;

export const AppConfigSchema = z.object({
  soilTiles: z.string().optional(),
  parcelTiles: z.string().optional(),
  allowImport: z.boolean().optional(),
});
export type AppConfig = z.infer<typeof AppConfigSchema>;
