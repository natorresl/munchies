export interface PriceRange {
  id: number;
  range: string;
}

export interface Filter {
  id: number;
  name: string;
  image_url: string;  // used in FilterFoodCategory
}

export interface Restaurant {
  id: number;
  name: string;
  image_url: string;  // used in RestaurantCards
  price_range_id: number;
  delivery_time_minutes: number;
  filter_ids: number[];
}