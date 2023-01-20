import { z } from 'zod';
import { KeyframeType } from './Keyframes';

const KeyframesBaseSchema = z.object({
  id: z.string().min(1),
  articleId: z.string().min(1),
  layoutId: z.string().min(1),
  itemId: z.string().min(1),
  position: z.number().min(0)
});

const DimensionsKeyframeSchema = KeyframesBaseSchema.extend({
  type: z.literal(KeyframeType.Dimensions),
  value: z.object({
    width: z.number().nonnegative(),
    height: z.number().nonnegative()
  })
});

const PositionKeyframeSchema = KeyframesBaseSchema.extend({
  type: z.literal(KeyframeType.Position),
  value: z.object({
    top: z.number(),
    left: z.number()
  })
});

const RotationKeyframeSchema = KeyframesBaseSchema.extend({
  type: z.literal(KeyframeType.Rotation),
  value: z.object({
    angle: z.number()
  })
});

const BorderRadiusKeyframeSchema = KeyframesBaseSchema.extend({
  type: z.literal(KeyframeType.BorderRadius),
  value: z.object({
    radius: z.number().nonnegative()
  })
});

const BorderWidthKeyframeSchema = KeyframesBaseSchema.extend({
  type: z.literal(KeyframeType.BorderWidth),
  value: z.object({
    borderWidth: z.number().nonnegative()
  })
});

const ColorKeyframeSchema = KeyframesBaseSchema.extend({
  type: z.literal(KeyframeType.Color),
  value: z.object({
    color: z.string()
  })
});

export const KeyframeSchema = z.discriminatedUnion('type', [
  DimensionsKeyframeSchema,
  PositionKeyframeSchema,
  RotationKeyframeSchema,
  BorderRadiusKeyframeSchema,
  BorderWidthKeyframeSchema,
  ColorKeyframeSchema
]);

export const KeyframesSchema = z.array(KeyframeSchema);
