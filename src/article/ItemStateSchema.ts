import { z, ZodType } from 'zod';
import {
  CustomHoverStateParams,
  EmbedHoverStateParams,
  MediaHoverStateParams,
  RectangleHoverStateParams,
  RichTextHoverStateParams
} from './ItemState';

export const getHoverParamsSchema = <T extends z.ZodTypeAny>(schema: T) => {
  return z.object({
    timing: z.string(),
    duration: z.number(),
    delay: z.number(),
    value: schema
  });
};

export const ItemHoverStateBaseSchema = z.object({
  width: getHoverParamsSchema(z.number()).optional(),
  height: getHoverParamsSchema(z.number()).optional(),
  angle: getHoverParamsSchema(z.number()).optional(),
  top: getHoverParamsSchema(z.number()).optional(),
  left: getHoverParamsSchema(z.number()).optional(),
  scale: getHoverParamsSchema(z.number()).optional()
});

export const MediaHoverStateParamsSchema = z.record(
  z.object({
    opacity: getHoverParamsSchema(z.number()).optional(),
    radius: getHoverParamsSchema(z.number()).optional(),
    strokeWidth: getHoverParamsSchema(z.number()).optional(),
    strokeColor: getHoverParamsSchema(z.string()).optional()
  })
  .merge(ItemHoverStateBaseSchema)
) satisfies ZodType<MediaHoverStateParams>;

export const RectangleHoverStateParamsSchema = z.record(
  z.object({
    strokeWidth: getHoverParamsSchema(z.number()).optional(),
    radius: getHoverParamsSchema(z.number()).optional(),
    fillColor: getHoverParamsSchema(z.string()).optional(),
    strokeColor: getHoverParamsSchema(z.string()).optional()
  }).merge(ItemHoverStateBaseSchema)
) satisfies ZodType<RectangleHoverStateParams>;

export const CustomItemHoverStateParamsSchema = z.record(ItemHoverStateBaseSchema) satisfies ZodType<CustomHoverStateParams>;

export const EmbedHoverStateParamsSchema = z.record(z.object({
    radius: getHoverParamsSchema(z.number()).optional()
  }).merge(ItemHoverStateBaseSchema)
) satisfies ZodType<EmbedHoverStateParams>;

export const RichTextHoverStateParamsSchema = z.record(ItemHoverStateBaseSchema)satisfies ZodType<RichTextHoverStateParams>;
export const ItemHoverStateParamsSchema = z.union([
  MediaHoverStateParamsSchema,
  RectangleHoverStateParamsSchema,
  CustomItemHoverStateParamsSchema,
  EmbedHoverStateParamsSchema,
  RichTextHoverStateParamsSchema
])
