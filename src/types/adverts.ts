export interface Advert {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  advertiser: string;
  tags?: string[];
  adType: 'banner' | 'sidebar' | 'in-content' | 'sponsored-post' | 'popup' | 'video';
  priority: number;
  image: {
    asset: {
      _ref: string;
      url: string;
    };
    hotspot?: {
      x: number;
      y: number;
    };
  };
  altText: string;
  description?: string;
  clickUrl?: string;
  openInNewTab: boolean;
  isActive: boolean;
  startDate: string;
  endDate?: string;
  budget?: number;
}
