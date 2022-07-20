export interface CustomFontFile {
  type: string;
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
