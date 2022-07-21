export interface Meta extends PageMeta {
  favicon?: string;
}

export interface PageMeta {
  title?: string;
  description?: string;
  opengraphThumbnail?: string;
  keywords?: string;
}
