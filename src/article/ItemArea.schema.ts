import { z } from 'zod';
import { AnchorSide } from './enums/AnchorSide';

export const ItemAreaSchema = z.object({
  top: z.number(),
  left: z.number(),
  width: z.number(),
  height: z.number(),
  zIndex: z.number(),
  angle: z.number(),
  anchorSide: z.nativeEnum(AnchorSide).optional()
});
