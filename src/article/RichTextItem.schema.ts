import { z, ZodType } from 'zod';
import { ArticleItemType } from './enums/ArticleItemType';
import { RichTextBlock as TRichTextBlock } from './RichText';
import { ItemBaseSchema } from './ItemBase.schema';
import { TextAlign } from './enums/TextAlign';
import { RichTextItem } from './ArticleItems';
import { RichTextHoverStateParamsSchema } from './ItemStateSchema';
import { TextTransform } from './enums/TextTransform';
import { VerticalAlign } from './enums/VerticalAlign';
import { TextDecoration } from './enums/TextDecoration';

export const RichTextEntitySchema = z.object({
  start: z.number().nonnegative(),
  end: z.number().nonnegative(),
  type: z.string(),
  data: z.any().optional()
});

export const RichTextStyleSchema = z.object({
  start: z.number().nonnegative(),
  end: z.number().nonnegative(),
  style: z.string().min(1),
  value: z.string().optional()
});

export const RichTextBlockSchema: z.Schema<TRichTextBlock> = z.lazy(() => (
  z.object({
    start: z.number().nonnegative(),
    end: z.number().nonnegative(),
    type: z.string().min(1),
    entities: z.array(RichTextEntitySchema).optional(),
    children: z.array(RichTextBlockSchema).optional(),
    data: z.any().optional()
  })
));

export const RichTextItemSchema = ItemBaseSchema.extend({
  type: z.literal(ArticleItemType.RichText),
  commonParams: z.object({
    text: z.string(),
    blocks: z.array(RichTextBlockSchema).optional()
  }),
  sticky: z.record(
    z.object({
      from: z.number(),
      to: z.number().optional()
    }).nullable(),
  ),
  layoutParams: z.record(
    z.object({
      preset: z.string().nullable(),
      rangeStyles: z.array(RichTextStyleSchema).optional(),
      textAlign: z.nativeEnum(TextAlign),
      lineHeightLock: z.boolean(),
      sizing: z.string(),
      blur: z.number(),
      fontSize: z.number().optional(),
      lineHeight: z.number().optional(),
      letterSpacing: z.number().optional(),
      wordSpacing: z.number().optional(),
      textTransform: z.nativeEnum(TextTransform).optional(),
      verticalAlign: z.nativeEnum(VerticalAlign).optional(),
      color: z.string().optional(),
      typeFace: z.string().optional(),
      fontStyle: z.string().optional(),
      fontWeight: z.number().optional(),
      textDecoration: z.nativeEnum(TextDecoration).optional(),
    })
  ),
  state: z.object({
    hover: z.record(RichTextHoverStateParamsSchema)
  })
}) satisfies ZodType<RichTextItem>;
