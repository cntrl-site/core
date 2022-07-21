import { z } from 'zod';
import { AdditionalHTMLSchema } from './AdditionalHTML.schema';
import { MetaSchema } from '../metaInfo/MetaInfo.schema';
import { GridSchema } from '../grid/Grid.schema';
import { LayoutSchema } from '../layout/Layout.schema';
import { PageSchema } from '../page/Page.schema';
import { FontsSchema } from './Fonts.schema';

export const ProjectSchema = z.object({
  id: z.string().min(1),
  html: AdditionalHTMLSchema,
  meta: MetaSchema,
  grid: GridSchema,
  layouts: z.array(LayoutSchema),
  pages: z.array(PageSchema),
  fonts: FontsSchema
});
