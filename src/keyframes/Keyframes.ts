export type KeyframeAny = Keyframe<KeyframeType>;

export interface Keyframe<T extends KeyframeType> {
  id: string;
  type: T;
  articleId: string;
  layoutId: string;
  itemId: string;
  position: number;
  value: KeyframeValueMap[T];
}

export enum KeyframeType {
  Dimensions = 'dimensions',
  Position = 'position',
  Rotation = 'rotation',
  BorderRadius = 'border-radius',
  BorderWidth = 'border-width',
  Color = 'color',
  BorderColor = 'border-color',
  Opacity = 'opacity'
}

export interface KeyframeValueMap {
  [KeyframeType.Dimensions]: DimensionsValue;
  [KeyframeType.Position]: PositionValue;
  [KeyframeType.Rotation]: RotationValue;
  [KeyframeType.BorderRadius]: BorderRadiusValue;
  [KeyframeType.BorderWidth]: BorderWidthValue;
  [KeyframeType.BorderWidth]: BorderWidthValue;
  [KeyframeType.Color]: ColorValue;
  [KeyframeType.BorderColor]: BorderColorValue;
  [KeyframeType.Opacity]: OpacityValue;
}

interface DimensionsValue {
  width: number;
  height: number;
}

interface PositionValue {
  top: number;
  left: number;
}

interface RotationValue {
  angle: number;
}

interface BorderRadiusValue {
  radius: number;
}

interface BorderWidthValue {
  borderWidth: number;
}

interface ColorValue {
  color: string;
}

interface BorderColorValue {
  color: string;
}

interface OpacityValue {
  opacity: string;
}
