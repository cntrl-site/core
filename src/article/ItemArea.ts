import { AnchorSide } from './enums/AnchorSide';
import { ScaleAnchor } from './enums/ScaleAnchor';

export interface ItemArea {
  top: number;
  left: number;
  width: number;
  height: number;
  zIndex: number;
  angle: number;
  anchorSide?: AnchorSide;
  scale: number;
  scaleAnchor: ScaleAnchor;
}
