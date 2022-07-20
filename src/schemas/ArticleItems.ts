import { ItemBase } from './ItemBase';
import { z } from 'zod';
import { ArticleItemType } from '../enums/ArticleItemType';
import { TextAlign } from '../enums/TextAlign';
import { RichTextItem } from './RichTextItem';

const ImageItem = ItemBase.extend({
  type: z.literal(ArticleItemType.Image),
  commonParams: z.object({
    url: z.string().min(1),
    sizing: z.string().min(1),
    ratioLock: z.boolean()
  }),
  layoutParams: z.record(
    z.object({
      fullwidth: z.boolean(),
      opacity: z.number().nonnegative(),
      radius: z.number(),
      strokeWidth: z.number(),
      strokeColor: z.string()
    })
  )
});

const VideoItem = ItemBase.extend({
  type: z.literal(ArticleItemType.Video),
  commonParams: z.object({
    url: z.string().min(1),
    sizing: z.string().min(1),
    ratioLock: z.boolean()
  }),
  layoutParams: z.record(
    z.object({
      fullwidth: z.boolean(),
      autoplay: z.boolean(),
      opacity: z.number().nonnegative(),
      radius: z.number(),
      strokeWidth: z.number(),
      strokeColor: z.string()
    })
  )
});

const TextItem = ItemBase.extend({
  type: z.literal(ArticleItemType.Text),
  commonParams: z.object({
    sizing: z.string().min(1),
    content: z.string(),
    fontFamily: z.string().min(1),
    fontStyle: z.string().min(1)
  }),
  layoutParams: z.record(
    z.object({
      align: z.nativeEnum(TextAlign),
      fontSize: z.number(),
      letterSpacing: z.number(),
      lineHeight: z.number(),
      opacity: z.number().nonnegative(),
      textColor: z.string().min(1),
      wordSpacing: z.number()
    })
  )
});

const RectangleItem = ItemBase.extend({
  type: z.literal(ArticleItemType.Rectangle),
  layoutParams: z.record(
    z.object({
      radius: z.number(),
      strokeWidth: z.number(),
      fillColor: z.string().min(1),
      strokeColor: z.string().min(1),
      fullwidth: z.boolean()
    })
  )
});

export const Item = z.discriminatedUnion('type', [
  ImageItem,
  VideoItem,
  RectangleItem,
  TextItem,
  RichTextItem
]);
