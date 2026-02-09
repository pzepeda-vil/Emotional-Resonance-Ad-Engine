export interface FormState {
  brandName: string;
  platform: string;
  goal: string;
  tone: string;
}

export interface GroundingSource {
  uri: string;
  title: string;
}

export interface Ad {
  headline: string;
  body: string;
}

export interface AdCopy {
  positiveEmotions?: string[];
  negativeEmotions?: string[];
  campaign: Ad[];
  sources?: GroundingSource[];
}
