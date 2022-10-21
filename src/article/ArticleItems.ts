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
}

export interface ItemLayoutParamsMap {
  [ArticleItemType.Image]: ImageLayoutParams;
  [ArticleItemType.Video]: VideoLayoutParams;
  [ArticleItemType.RichText]: RichTextLayoutParams;
  [ArticleItemType.Rectangle]: RectangleLayoutParams;
  [ArticleItemType.VimeoEmbed]: VimeoEmbedLayoutParams;
}

interface CommonItemCommonParams {
  sizing: string;
}

interface MediaCommonParams extends CommonItemCommonParams {
  url: string;
  ratioLock: boolean;
}

interface VideoCommonParams extends MediaCommonParams {}

interface ImageCommonParams extends MediaCommonParams {}

interface VimeoEmbedLayoutParams {
  strokeWidth: number;
  strokeColor: string;
}

interface RichTextCommonParams extends CommonItemCommonParams {
  sizing: string;
  text: string;
  blocks?: RichTextBlock[];
  styles?: RichTextStyle[];
}

interface RectangleCommonParams extends CommonItemCommonParams {
  ratioLock: boolean;
}

interface VimeoEmbedCommonParams extends CommonItemCommonParams {
  autoplay: boolean;
  controls: boolean;
  loop: boolean;
  muted: boolean;
  pictureInPicture: boolean;
}

interface MediaLayoutParams {
  opacity: number;
  radius: number;
  strokeWidth: number;
  strokeColor: string;
}

interface ImageLayoutParams extends MediaLayoutParams {}

interface VideoLayoutParams extends MediaLayoutParams {
  autoplay: boolean;
}

interface RichTextLayoutParams {
  styles?: RichTextStyle[];
  textAlign: TextAlign;
  lineHeightLock: boolean;
}

interface RectangleLayoutParams {
  radius: number;
  strokeWidth: number;
  fillColor: string;
  strokeColor: string;
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

export function isItemType<T extends ArticleItemType>(item: ItemAny, itemType: T): item is Item<T> {
  return item.type === itemType;
}
