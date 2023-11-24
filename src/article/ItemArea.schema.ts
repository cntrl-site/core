import { z } from 'zod';
import { AnchorSide } from './enums/AnchorSide';
import { ScaleAnchor } from './enums/ScaleAnchor';
import { PositionType } from './enums/PositionType';

export const ItemAreaSchema = z.object({
  top: z.number(),
  left: z.number(),
  width: z.number(),
  height: z.number(),
  zIndex: z.number(),
  angle: z.number(),
  positionType: z.nativeEnum(PositionType),
  anchorSide: z.nativeEnum(AnchorSide).optional(),
  scale: z.number().nonnegative(),
  scaleAnchor: z.nativeEnum(ScaleAnchor)
});
