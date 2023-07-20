import { ArticleItemType } from './enums/ArticleItemType';

type LayoutIdentifier = string;

export interface ItemState<T extends ArticleItemType> {
  hover: Record<LayoutIdentifier, ItemHoverStatesMap[T]>;
}

export interface ItemHoverStatesMap {
  [ArticleItemType.Image]: MediaStateParams;
  [ArticleItemType.Video]: MediaStateParams;
  [ArticleItemType.RichText]: RichTextStateParams;
  [ArticleItemType.Rectangle]: RectangleStateParams;
  [ArticleItemType.VimeoEmbed]: EmbedStateParams;
  [ArticleItemType.YoutubeEmbed]: EmbedStateParams;
  [ArticleItemType.Custom]: CustomStateParams;
}

interface HoverParams<T> {
  ease: string;
  duration: number;
  delay: number;
  value: T;
}

interface ItemHoversBaseMap {
  width?: HoverParams<number>;
  height?: HoverParams<number>;
  angle?:  HoverParams<number>;
  top?:  HoverParams<number>;
  left?:  HoverParams<number>;
  scale?:  HoverParams<number>;
}

export interface MediaStateParams extends ItemHoversBaseMap {
  opacity?: HoverParams<number>;
  radius?: HoverParams<number>;
  strokeWidth?: HoverParams<number>;
  strokeColor?: HoverParams<string>;
}

interface RichTextStateParams extends ItemHoversBaseMap {}

interface RectangleStateParams extends ItemHoversBaseMap {
  radius?: HoverParams<number>;
  strokeWidth?: HoverParams<number>;
  fillColor?: HoverParams<string>;
  strokeColor?: HoverParams<string>;
}

interface EmbedStateParams extends ItemHoversBaseMap {
  radius?: HoverParams<number>;
}

interface CustomStateParams extends ItemHoversBaseMap {}
