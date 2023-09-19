import { ArticleItemType } from './enums/ArticleItemType';
import { ItemArea } from './ItemArea';
import { RichTextBlock, RichTextStyle } from './RichText';
import { TextAlign } from './enums/TextAlign';
import { ItemState } from './ItemState';
import { TextTransform } from './enums/TextTransform';
import { VerticalAlign } from './enums/VerticalAlign';
import { TextDecoration } from './enums/TextDecoration';

export type ItemAny = Item<ArticleItemType>;

export interface Item<T extends ArticleItemType> {
  id: string;
  type: T;
  area: Record<LayoutIdentifier, ItemArea>;
  hidden: Record<LayoutIdentifier, boolean>;
  link?: Link;
  isLocked?: boolean;
  label?: string;
  sticky: Record<LayoutIdentifier, StickyParams | null>;
  commonParams: ItemCommonParamsMap[T];
  state: ItemState<T>;
  layoutParams: Record<LayoutIdentifier, ItemLayoutParamsMap[T]>;
}

export interface ItemCommonParamsMap {
  [ArticleItemType.Image]: ImageCommonParams;
  [ArticleItemType.Video]: VideoCommonParams;
  [ArticleItemType.RichText]: RichTextCommonParams;
  [ArticleItemType.Rectangle]: RectangleCommonParams;
  [ArticleItemType.VimeoEmbed]: VimeoEmbedCommonParams;
  [ArticleItemType.YoutubeEmbed]: YoutubeEmbedCommonParams;
  [ArticleItemType.Custom]: CustomCommonParams;
}

export interface ItemLayoutParamsMap {
  [ArticleItemType.Image]: ImageLayoutParams;
  [ArticleItemType.Video]: VideoLayoutParams;
  [ArticleItemType.RichText]: RichTextLayoutParams;
  [ArticleItemType.Rectangle]: RectangleLayoutParams;
  [ArticleItemType.VimeoEmbed]: VimeoEmbedLayoutParams;
  [ArticleItemType.YoutubeEmbed]: YoutubeEmbedLayoutParams;
  [ArticleItemType.Custom]: CustomLayoutParams;
}

interface MediaCommonParams {
  url: string;
  ratioLock: boolean;
}

interface VideoCommonParams extends MediaCommonParams {}

interface ImageCommonParams extends MediaCommonParams {}

interface RichTextCommonParams {
  text: string;
  blocks?: RichTextBlock[];
}

interface RectangleCommonParams {
  ratioLock: boolean;
}

interface CustomCommonParams {
  name: string;
  ratioLock: boolean;
}

interface VimeoEmbedCommonParams {
  play: 'on-hover' | 'on-click' | 'auto';
  controls: boolean;
  loop: boolean;
  muted: boolean;
  pictureInPicture: boolean;
  url: string;
  ratioLock: boolean;
}

interface YoutubeEmbedCommonParams {
  play: 'on-hover' | 'on-click' | 'auto';
  controls: boolean;
  loop: boolean;
  url: string;
  ratioLock: boolean;
}

interface MediaLayoutParams {
  opacity: number;
  radius: number;
  strokeWidth: number;
  strokeColor: string;
  blur: number;
}

interface CustomLayoutParams {}

interface VimeoEmbedLayoutParams {
  radius: number;
  blur: number;
}

interface YoutubeEmbedLayoutParams {
  radius: number;
  blur: number;
}

interface ImageLayoutParams extends MediaLayoutParams {}

interface VideoLayoutParams extends MediaLayoutParams {
  autoplay: boolean;
}

interface RichTextLayoutParams {
  preset: string | null;
  rangeStyles?: RichTextStyle[];
  textAlign: TextAlign;
  lineHeightLock: boolean;
  sizing: string;
  blur: number;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  wordSpacing: number;
  textTransform: TextTransform;
  verticalAlign: VerticalAlign;
  color: string;
  typeFace: string;
  fontStyle: string;
  fontWeight: number;
  textDecoration: TextDecoration;
}

interface RectangleLayoutParams {
  radius: number;
  strokeWidth: number;
  fillColor: string;
  strokeColor: string;
  blur: number;
  backdropBlur: number;
  blurMode: 'default' | 'backdrop';
}

export interface StickyParams {
  from: number;
  to?: number;
}

export interface Link {
  url: string;
  target: string;
}

type LayoutIdentifier = string;

// aliases for shorter usage
export type VideoItem = Item<ArticleItemType.Video>;
export type RectangleItem = Item<ArticleItemType.Rectangle>;
export type ImageItem = Item<ArticleItemType.Image>;
export type RichTextItem = Item<ArticleItemType.RichText>;
export type VimeoEmbedItem = Item<ArticleItemType.VimeoEmbed>;
export type YoutubeEmbedItem = Item<ArticleItemType.YoutubeEmbed>;
export type CustomItem = Item<ArticleItemType.Custom>;

export function isItemType<T extends ArticleItemType>(item: ItemAny, itemType: T): item is Item<T> {
  return item.type === itemType;
}
