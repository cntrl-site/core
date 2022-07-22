import { ArticleItemType } from './ArticleItemType';
import { TextAlign } from './TextAlign';
import { RichTextBlock, RichTextStyle } from './RichText';

export interface Article {
  id: string;
  sections: Section[];
}

export interface Section {
  id: string;
  height: Record<Layout, number>;
  visible: Record<Layout, boolean>;
  items: Item[];
}

export type Item =
  | ImageItem
  | VideoItem
  | TextItem
  | RichTextItem
  | RectangleItem;

export interface ItemArea {
  top: number;
  left: number;
  width: number;
  height: number;
  zIndex: number;
  angle: number;
}

type Layout = string;

interface Link {
  url: string;
  target: string;
}

export interface ItemBase {
  id: string;
  area: Record<Layout, ItemArea>;
  visible: Record<Layout, boolean>;
  type: ArticleItemType;
  link?: Link;
  commonParams: any;
  layoutParams?: Record<Layout, any>;
}

export interface ImageItem extends ItemBase {
  type: ArticleItemType.Image;
  commonParams: {
    url: string;
    sizing: string;
  };
  layoutParams: Record<
    Layout,
    {
      fullwidth: boolean;
      opacity: number;
      radius: number;
      strokeWidth: number;
      strokeColor: string;
    }
    >;
}

export interface VideoItem extends ItemBase {
  type: ArticleItemType.Video;
  commonParams: {
    url: string;
    sizing: string;
    ratioLock: boolean;
  };
  layoutParams: Record<
    Layout,
    {
      fullwidth: boolean;
      autoplay: boolean;
      radius: number;
      opacity: number;
      strokeWidth: number;
      strokeColor: string;
    }
    >;
}

export interface TextItem extends ItemBase {
  type: ArticleItemType.Text;
  commonParams: {
    sizing: string;
    content: string;
    fontFamily: string;
    fontStyle: string;
  };
  layoutParams: Record<
    Layout,
    {
      align: TextAlign;
      fontSize: number;
      letterSpacing: number;
      lineHeight: number;
      opacity: number;
      textColor: string;
      wordSpacing: number;
    }
    >;
}

export interface RichTextItem extends ItemBase {
  type: ArticleItemType.RichText;
  commonParams: {
    sizing: string;
    text: string;
    blocks?: RichTextBlock[];
    styles?: RichTextStyle[];
  };
  layoutParams: Record<Layout, {
    styles?: RichTextStyle[];
    textAlign: TextAlign;
    lineHeightLock: boolean;
  }>;
}

export interface RectangleItem extends ItemBase {
  type: ArticleItemType.Rectangle;
  layoutParams: Record<
    Layout,
    {
      radius: number;
      strokeWidth: number;
      fillColor: string;
      strokeColor: string;
      fullwidth: boolean;
    }
    >;
}
