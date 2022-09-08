export interface Meta extends PageMeta {
  favicon?: string;
}

export interface PageMeta {
  enabled: boolean;
  title?: string;
  description?: string;
  opengraphThumbnail?: string;
  keywords?: string;
}
