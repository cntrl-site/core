import { z } from 'zod';
import { AnchorSide } from './enums/AnchorSide';
import { ScaleAnchor } from './enums/ScaleAnchor';

export const ItemAreaSchema = z.object({
  top: z.number(),
  left: z.number(),
  width: z.number(),
  height: z.number(),
  zIndex: z.number(),
  angle: z.number(),
  anchorSide: z.nativeEnum(AnchorSide).optional(),
  scale: z.number().nonnegative(),
  scaleAnchor: z.nativeEnum(ScaleAnchor)
});
