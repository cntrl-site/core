import { PageMeta } from '../metaInfo/MetaInfo';

export interface Page {
  id: string;
  title: string;
  articleId: string;
  slug: string;
  isPublished: boolean;
  meta?: PageMeta;
}
