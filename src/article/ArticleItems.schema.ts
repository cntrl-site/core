import { z } from 'zod';
import { ItemBaseSchema } from './ItemBase.schema';
import { ArticleItemType } from './enums/ArticleItemType';
import { RichTextItemSchema } from './RichTextItem.schema';

const ImageItemSchema = ItemBaseSchema.extend({
  type: z.literal(ArticleItemType.Image),
  commonParams: z.object({
    url: z.string().min(1),
    sizing: z.string().min(1),
    ratioLock: z.boolean()
  }),
  layoutParams: z.record(
    z.object({
      opacity: z.number().nonnegative(),
      radius: z.number(),
      strokeWidth: z.number(),
      strokeColor: z.string()
    })
  )
});

const VideoItemSchema = ItemBaseSchema.extend({
  type: z.literal(ArticleItemType.Video),
  commonParams: z.object({
    url: z.string().min(1),
    sizing: z.string().min(1),
    ratioLock: z.boolean()
  }),
  layoutParams: z.record(
    z.object({
      autoplay: z.boolean(),
      opacity: z.number().nonnegative(),
      radius: z.number(),
      strokeWidth: z.number(),
      strokeColor: z.string()
    })
  )
});

const RectangleItemSchema = ItemBaseSchema.extend({
  type: z.literal(ArticleItemType.Rectangle),
  commonParams: z.object({
    sizing: z.string().min(1),
    ratioLock: z.boolean()
  }),
  layoutParams: z.record(
    z.object({
      radius: z.number(),
      strokeWidth: z.number(),
      fillColor: z.string().min(1),
      strokeColor: z.string().min(1)
    })
  )
});

const CustomItemSchema = ItemBaseSchema.extend({
  type: z.literal(ArticleItemType.Custom),
  commonParams: z.object({
    sizing: z.string().min(1),
    ratioLock: z.boolean(),
    name: z.string()
  }),
  layoutParams: z.record(z.object({}))
});

const VimeoEmbedItemSchema = ItemBaseSchema.extend({
  type: z.literal(ArticleItemType.VimeoEmbed),
  commonParams: z.object({
    sizing: z.string().min(1),
    autoplay: z.boolean(),
    controls: z.boolean(),
    loop: z.boolean(),
    muted: z.boolean(),
    pictureInPicture: z.boolean(),
    url: z.string().min(1),
    ratioLock: z.boolean()
  }),
  layoutParams: z.record(
    z.object({
      radius: z.number()
    })
  )
})

const YoutubeEmbedItemSchema = ItemBaseSchema.extend({
  type: z.literal(ArticleItemType.YoutubeEmbed),
  commonParams: z.object({
    sizing: z.string().min(1),
    autoplay: z.boolean(),
    controls: z.boolean(),
    loop: z.boolean(),
    url: z.string().min(1),
    ratioLock: z.boolean()
  }),
  layoutParams: z.record(
    z.object({
      radius: z.number()
    })
  )
})

export const Item = z.discriminatedUnion('type', [
  ImageItemSchema,
  VideoItemSchema,
  RectangleItemSchema,
  CustomItemSchema,
  RichTextItemSchema,
  VimeoEmbedItemSchema,
  YoutubeEmbedItemSchema
]);
