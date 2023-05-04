import { ArticleItemType } from './enums/ArticleItemType';
import { ItemArea } from './ItemArea';
import { RichTextBlock, RichTextStyle } from './RichText';
import { TextAlign } from './enums/TextAlign';

export type ItemAny = Item<ArticleItemType>;

export interface Item<T extends ArticleItemType> {
  id: string;
  type: T;
  area: Record<LayoutIdentifier, ItemArea>;
  visible: Record<LayoutIdentifier, boolean>;
  link?: Link;
  commonParams: ItemCommonParamsMap[T];
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
  styles?: RichTextStyle[];
}

interface RectangleCommonParams {
  ratioLock: boolean;
}

interface CustomCommonParams {
  name: string;
  ratioLock: boolean;
}

interface VimeoEmbedCommonParams {
  autoplay: boolean;
  controls: boolean;
  loop: boolean;
  muted: boolean;
  pictureInPicture: boolean;
  url: string;
  ratioLock: boolean;
}

interface YoutubeEmbedCommonParams {
  autoplay: boolean;
  controls: boolean;
  loop: boolean;
  url: string;
  ratioLock: boolean;
}

interface ItemBaseLayoutParams {
  sticky: StickyParams | null;
}

interface MediaLayoutParams extends ItemBaseLayoutParams {
  opacity: number;
  radius: number;
  strokeWidth: number;
  strokeColor: string;
}

interface CustomLayoutParams extends ItemBaseLayoutParams {}

interface VimeoEmbedLayoutParams extends ItemBaseLayoutParams {
  radius: number;
}

interface YoutubeEmbedLayoutParams extends ItemBaseLayoutParams {
  radius: number;
}

interface ImageLayoutParams extends MediaLayoutParams {}

interface VideoLayoutParams extends MediaLayoutParams {
  autoplay: boolean;
}

interface RichTextLayoutParams extends ItemBaseLayoutParams {
  preset: string | null;
  styles?: RichTextStyle[];
  textAlign: TextAlign;
  lineHeightLock: boolean;
  sizing: string;
}

interface RectangleLayoutParams extends ItemBaseLayoutParams {
  radius: number;
  strokeWidth: number;
  fillColor: string;
  strokeColor: string;
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
