import { AnchorSide } from './enums/AnchorSide';

export interface ItemArea {
  top: number;
  left: number;
  width: number;
  height: number;
  zIndex: number;
  angle: number;
  anchorSide?: AnchorSide;
}
