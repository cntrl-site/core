import { FontFileTypes } from './enums/FontFileTypes';

export interface CustomFontFile {
  type: FontFileTypes;
  url: string;
}

export interface CustomFont {
  name: string;
  style: string;
  weight: number;
  files: CustomFontFile[];
}

export interface Fonts {
  google: string;
  adobe: string;
  custom: CustomFont[];
}
