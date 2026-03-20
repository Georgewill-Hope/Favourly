import { useGlobalContext } from "@/context/GlobalContext";
import { searchPlaces } from "@/lib/location";
import { LocationSuggestion } from "@/types/types";
import { router } from "expo-router";
import debounce from "lodash.debounce";
import moment from "moment";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

interface LocationSearchType {
  id: string;
  lat: number;
  lon: number;
  mapUrl: string;
  name: string;
  photo: string;
}

export default function LocationSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<LocationSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const { setTrip, trip } = useGlobalContext();
  const debouncedSearch = useMemo(
    () =>
      debounce(async (text: string) => {
        setLoading(true);
        const data = await searchPlaces(text);
        setResults(data);
        setLoading(false);
      }, 500),
    []
  );

  const handleChange = (text: string) => {
    setQuery(text);
    debouncedSearch(text);
  };

  const getCityImage = async (city: string) => {
    const apiKey = process.env.EXPO_PUBLIC_UNSPLASH;
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${city}&client_id=${apiKey}`
    );

    const data = await res.json();
    return data.results[0].urls.regular;
  };

  const selectLocation = async (place: LocationSearchType) => {
    // const photoUrl = await getCityImage(place.name);

    setTrip({
      name: place.name,
      lat: Number(place.lat),
      lon: Number(place.lon),
      mapUrl: place.mapUrl,
      photo:  place.photo,
      traveler: {
        id: 0,
        title: "",
        desc: "",
        icon: "",
        people: "",
      },
      startDate: moment("2026-06-10"),
      endDate: moment("2026-06-10"),
      totalNumberOfDays: 0,
      budget: "",
    });

    router.push("/(create)/select-traveler");
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Search location..."
        value={query}
        onChangeText={handleChange}
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          borderRadius: 10,
          padding: 12,
          fontFamily: "Outfit-Regular",
        }}
      />

      {loading && <ActivityIndicator style={{ marginTop: 10 }} />}

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 10 }}
        renderItem={({ item }) => (
          <Pressable
            style={{
              padding: 12,
              borderBottomWidth: 1,
              borderColor: "#eee",
            }}
            onPress={() => selectLocation(item)}
          >
            <Text className="font-Outfit-Regular">{item.name}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
