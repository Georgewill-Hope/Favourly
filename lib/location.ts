import { LocationSuggestion } from "@/types/types";
import { Alert } from "react-native";

const API_KEY = process.env.EXPO_PUBLIC_LOCATION_IQ_API_KEY;

export const searchPlaces = async (
  query: string
): Promise<LocationSuggestion[]> => {
  if (!query) return [];

  try {
    const response = await fetch(
      `https://api.locationiq.com/v1/autocomplete?key=${API_KEY}&q=${encodeURIComponent(
        query
      )}&limit=5&dedupe=1`
    );

    const data = await response.json();

    if (!Array.isArray(data)) {
      Alert.alert("LocationIQ error:", data);
      return [];
    }

    return data.map((place: any) => ({
      id: place.place_id,
      name: place.display_name,
      lat: place.lat,
      lon: place.lon,

      // OpenStreetMap URL
      mapUrl: `https://www.openstreetmap.org/?mlat=${place.lat}&mlon=${place.lon}#map=18/${place.lat}/${place.lon}`,

      // Static map preview image
      photo: `https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${place.lat},${place.lon}&zoom=15&size=600x300&markers=icon:large-red-cutout|${place.lat},${place.lon}`,
    }));
  } catch (error) {
    console.error("Search places error:", error);
    return [];
  }
};
