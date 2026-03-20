export interface LocationSuggestion {
  id: string;
  name: string;
  lat: number;
  lon: number;
  mapUrl: string;
  photo: string;
}

export interface CardProps {
  id: number;
  title: string;
  desc: string;
  icon: string;
  people?: string;
  onPress?: () => void;
  selectOption?: number;
}
