import { z, ZodType } from 'zod';
import { ItemState } from './ItemState';
import { ArticleItemType } from './enums/ArticleItemType';

export const getHoverParamsSchema = <T extends z.ZodTypeAny>(schema: T) => {
  return z.object({
    ease: z.string(),
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

export const MediaStateParamsSchema = z.object({
  hover: z.record(z.object({
    opacity: getHoverParamsSchema(z.number()).optional(),
    radius: getHoverParamsSchema(z.number()).optional(),
    strokeWidth: getHoverParamsSchema(z.number()).optional(),
    strokeColor: getHoverParamsSchema(z.string()).optional()
  }).merge(ItemHoverStateBaseSchema))
}) satisfies ZodType<ItemState<ArticleItemType.Image | ArticleItemType.Video>>;

export const RectangleStateParamsSchema = z.object({
  hover: z.record(z.object({
    strokeWidth: getHoverParamsSchema(z.number()).optional(),
    radius: getHoverParamsSchema(z.number()).optional(),
    fillColor: getHoverParamsSchema(z.string()).optional(),
    strokeColor: getHoverParamsSchema(z.string()).optional()
  }).merge(ItemHoverStateBaseSchema))
}) satisfies ZodType<ItemState<ArticleItemType.Rectangle>>;

export const CustomItemStateParamsSchema = z.object({
  hover: z.record(ItemHoverStateBaseSchema)
}) satisfies ZodType<ItemState<ArticleItemType.Custom>>;

export const EmbedStateParamsSchema = z.object({
  hover: z.record(z.object({
    radius: getHoverParamsSchema(z.number()).optional()
  }).merge(ItemHoverStateBaseSchema))
}) satisfies ZodType<ItemState<ArticleItemType.YoutubeEmbed | ArticleItemType.VimeoEmbed>>;

export const RichTextStateParamsSchema = z.object({
  hover: z.record(ItemHoverStateBaseSchema)
}) satisfies ZodType<ItemState<ArticleItemType.Custom>>;
