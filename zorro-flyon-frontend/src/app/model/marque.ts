export interface Marque {
  id: string | null;
  profileId: string;
  name: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  site: string;
  presentation: string;
  originalLogo: any;
  resizedLogo: any;
  showLogoFiche: boolean;
  createdAt: Date;
}
