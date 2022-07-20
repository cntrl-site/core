import { z } from 'zod';
import { AdditionalHTMLSchema } from './AdditionalHTML';
import { MetaSchema } from './MetaInfo';
import { GridSchema } from './Grid';
import { LayoutSchema } from './Layout';
import { PageSchema } from './Page';
import { FontsSchema } from './Fonts';

export const ProjectSchema = z.object({
  id: z.string().min(1),
  html: AdditionalHTMLSchema,
  meta: MetaSchema,
  grid: GridSchema,
  layouts: z.array(LayoutSchema),
  pages: z.array(PageSchema),
  fonts: FontsSchema
});
