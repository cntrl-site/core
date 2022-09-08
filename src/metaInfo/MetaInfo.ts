export interface Meta extends GenericMeta {
  favicon?: string;
}

export interface PageMeta extends GenericMeta {
  enabled: boolean;
}

interface GenericMeta {
  title?: string;
  description?: string;
  opengraphThumbnail?: string;
  keywords?: string;
}
