import { AllowedTags } from './enums/AllowedTags';

export interface TypePresetEntryLayoutParams {
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  wordSpacing: number;
  textTransform: string;
}

export interface TypePresetEntry {
  id: string;
  name: string;
  fontFamily: string;
  fontStyle: string;
  fontWeight: string;
  tag: AllowedTags;
  layoutParams: Record<string, TypePresetEntryLayoutParams>;
}
