import { z } from "zod";

export const RoomKeySchema = z.object({
  roomKey: z
    .string()
    .length(6, "Room key must be 6 digits")
    .regex(/^\d+$/, "Room key must only contain numbers"),
});
