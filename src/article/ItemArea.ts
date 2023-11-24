import { AnchorSide } from './enums/AnchorSide';
import { ScaleAnchor } from './enums/ScaleAnchor';
import { PositionType } from './enums/PositionType';

export interface ItemArea {
  top: number;
  left: number;
  width: number;
  height: number;
  zIndex: number;
  angle: number;
  positionType: PositionType;
  anchorSide?: AnchorSide;
  scale: number;
  scaleAnchor: ScaleAnchor;
}
