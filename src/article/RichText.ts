export interface RichTextEntity {
  start: number;
  end: number;
  // TODO: @tkustov update with enum
  type: string;
  data?: any;
}

export interface RichTextStyle {
  start: number;
  end: number;
  style: string;
  value?: string;
}

export interface RichTextBlock {
  start: number;
  end: number;
  type: string;
  entities?: RichTextEntity[];
  children?: RichTextBlock[];
  data?: any;
}
