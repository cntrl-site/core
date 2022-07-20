import { z } from 'zod';

export const ItemArea = z.object({
  top: z.number(),
  left: z.number(),
  width: z.number(),
  height: z.number(),
  zIndex: z.number(),
  angle: z.number()
});
