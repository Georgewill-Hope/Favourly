export function buildTravelPrompt(
  location: string,
  days: number,
  nights: number,
  budget: string,
  people: string
) {
  return ` Generate a ${budget} travel plan for the location: ${location} for ${days} Days and ${nights} Nights for ${people}.

The response MUST be returned strictly in valid JSON format and must follow the exact schema defined below.
Do not include explanations, comments, or text outside the JSON.

IMPORTANT RULES:
- The number of hotel_options MUST be at least 3.
- The itinerary MUST contain EXACTLY ${days} number of days.
- Do NOT hardcode day_1, day_2, etc. Instead return an array of days.
- Each day must be labeled dynamically using "day": 1, 2, 3... up to ${days}.
- Ensure all image URLs are valid.
- Prices must include currency symbols.
- Coordinates must be decimal numbers.

ADDITIONAL ITINERARY RULES:
- Each day MUST include 3 to 5 activities.
- Activities must be different locations (no duplicates).
- Ensure logical travel flow (nearby places grouped together).
- Include realistic travel time between activities.

STRICT JSON STRUCTURE:

{
  "trip_summary": {
    "location": "string",
    "duration": "string",
    "group_size": "string",
    "budget_category": "string",
    "locationImageUrl": "string"
  },

  "flight_information": {
    "note": "string",
    "booking_url": "string",
    "recommended_class": "string",
    "flight_options": [
      {
        "airline": "string",
        "flight_number": "string",
        "departure_airport": "string",
        "arrival_airport": "string",
        "departure_time": "string",
        "arrival_time": "string",
        "flight_duration": "string",
        "price_per_person": "string",
        "booking_url": "string"
      }
    ]
  },

  "hotel_options": [
    {
      "hotel_name": "string",
      "address": "string",
      "price_per_night_approx": "string",
      "image_url": "string",
      "geo_coordinates": {
        "lat": 0.0,
        "lng": 0.0
      },
      "rating": 0.0,
      "description": "string",
      "nearby_places": [
        {
          "place_name": "string",
          "place_details": "string",
          "image_url": "string",
          "geo_coordinates": {
            "lat": 0.0,
            "lng": 0.0
          },
          "ticket_pricing": "string",
          "distance_from_hotel": "string",
          "estimated_travel_time": "string"
        }
      ]
    }
  ],

  "itinerary": [
    {
      "day": 1,
      "theme": "string",
      "activities": [
        {
          "place_name": "string",
          "details": "string",
          "image_url": "string",
          "geo_coordinates": {
            "lat": 0.0,
            "lng": 0.0
          },
          "ticket_pricing": "string",
          "best_time_to_visit": "string",
          "recommended_duration": "string",
          "travel_time_from_previous_location": "string"
        }
      ]
    }
  ]
}
  
  `;
}

export async function askGemini(prompt: string) {
  const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:generateContent?key=" +
        API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    return data.candidates?.[0]?.content?.parts?.[0]?.text;
  } catch (error) {
    return null;
  }
}
