import { ArticleItemType } from './enums/ArticleItemType';

type LayoutIdentifier = string;

export interface ItemState<T extends ArticleItemType> {
  hover: Record<LayoutIdentifier, ItemHoverStatesMap[T]>;
}

export type ItemHoverState = ItemHoverStatesMap[ArticleItemType];

export interface ItemHoverStatesMap {
  [ArticleItemType.Image]: MediaHoverStateParams;
  [ArticleItemType.Video]: MediaHoverStateParams;
  [ArticleItemType.RichText]: RichTextHoverStateParams;
  [ArticleItemType.Rectangle]: RectangleHoverStateParams;
  [ArticleItemType.VimeoEmbed]: EmbedHoverStateParams;
  [ArticleItemType.YoutubeEmbed]: EmbedHoverStateParams;
  [ArticleItemType.Custom]: CustomHoverStateParams;
}

export interface HoverParams<T> {
  timing: string;
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

export interface MediaHoverStateParams extends ItemHoversBaseMap {
  opacity?: HoverParams<number>;
  radius?: HoverParams<number>;
  strokeWidth?: HoverParams<number>;
  strokeColor?: HoverParams<string>;
}

export interface RichTextHoverStateParams extends ItemHoversBaseMap {}

export interface RectangleHoverStateParams extends ItemHoversBaseMap {
  radius?: HoverParams<number>;
  strokeWidth?: HoverParams<number>;
  fillColor?: HoverParams<string>;
  strokeColor?: HoverParams<string>;
}

export interface EmbedHoverStateParams extends ItemHoversBaseMap {
  radius?: HoverParams<number>;
}

export interface CustomHoverStateParams extends ItemHoversBaseMap {}
