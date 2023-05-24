import { z, ZodType } from 'zod';
import { ItemBaseSchema } from './ItemBase.schema';
import { ArticleItemType } from './enums/ArticleItemType';
import { RichTextItemSchema } from './RichTextItem.schema';
import { CustomItem, ImageItem, RectangleItem, VideoItem, VimeoEmbedItem, YoutubeEmbedItem } from './ArticleItems';

const ImageItemSchema = ItemBaseSchema.extend({
  type: z.literal(ArticleItemType.Image),
  commonParams: z.object({
    url: z.string().min(1),
    ratioLock: z.boolean()
  }),
  sticky: z.record(
    z.object({
      from: z.number(),
      to: z.number().optional()
    }).nullable(),
  ),
  layoutParams: z.record(
    z.object({
      opacity: z.number().nonnegative(),
      radius: z.number(),
      strokeWidth: z.number(),
      strokeColor: z.string()
    })
  )
}) satisfies ZodType<ImageItem>;

const VideoItemSchema = ItemBaseSchema.extend({
  type: z.literal(ArticleItemType.Video),
  commonParams: z.object({
    url: z.string().min(1),
    ratioLock: z.boolean()
  }),
  sticky: z.record(
    z.object({
      from: z.number(),
      to: z.number().optional()
    }).nullable(),
  ),
  layoutParams: z.record(
    z.object({
      autoplay: z.boolean(),
      opacity: z.number().nonnegative(),
      radius: z.number(),
      strokeWidth: z.number(),
      strokeColor: z.string()
    })
  )
}) satisfies ZodType<VideoItem>;

const RectangleItemSchema = ItemBaseSchema.extend({
  type: z.literal(ArticleItemType.Rectangle),
  commonParams: z.object({
    ratioLock: z.boolean()
  }),
  sticky: z.record(
    z.object({
      from: z.number(),
      to: z.number().optional()
    }).nullable(),
  ),
  layoutParams: z.record(
    z.object({
      radius: z.number(),
      strokeWidth: z.number(),
      fillColor: z.string().min(1),
      strokeColor: z.string().min(1)
    })
  )
}) satisfies ZodType<RectangleItem>;

const CustomItemSchema = ItemBaseSchema.extend({
  type: z.literal(ArticleItemType.Custom),
  commonParams: z.object({
    ratioLock: z.boolean(),
    name: z.string()
  }),
  sticky: z.record(
    z.object({
      from: z.number(),
      to: z.number().optional()
    }).nullable(),
  ),
  layoutParams: z.record(z.object({}))
}) satisfies ZodType<CustomItem>;

const VimeoEmbedItemSchema = ItemBaseSchema.extend({
  type: z.literal(ArticleItemType.VimeoEmbed),
  commonParams: z.object({
    autoplay: z.boolean(),
    controls: z.boolean(),
    loop: z.boolean(),
    muted: z.boolean(),
    pictureInPicture: z.boolean(),
    url: z.string().min(1),
    ratioLock: z.boolean()
  }),
  sticky: z.record(
    z.object({
      from: z.number(),
      to: z.number().optional()
    }).nullable(),
  ),
  layoutParams: z.record(
    z.object({
      radius: z.number()
    })
  )
}) satisfies ZodType<VimeoEmbedItem>;

const YoutubeEmbedItemSchema = ItemBaseSchema.extend({
  type: z.literal(ArticleItemType.YoutubeEmbed),
  commonParams: z.object({
    autoplay: z.boolean(),
    controls: z.boolean(),
    loop: z.boolean(),
    url: z.string().min(1),
    ratioLock: z.boolean()
  }),
  sticky: z.record(
    z.object({
      from: z.number(),
      to: z.number().optional()
    }).nullable(),
  ),
  layoutParams: z.record(
    z.object({
      radius: z.number()
    })
  )
}) satisfies ZodType<YoutubeEmbedItem>;

export const ItemSchema = z.discriminatedUnion('type', [
  ImageItemSchema,
  VideoItemSchema,
  RectangleItemSchema,
  CustomItemSchema,
  RichTextItemSchema,
  VimeoEmbedItemSchema,
  YoutubeEmbedItemSchema
]);
