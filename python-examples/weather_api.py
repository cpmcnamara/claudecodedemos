#!/usr/bin/env python3
"""
Weather API Client Demo
A simple command-line tool to fetch weather data from a public API.
"""

import requests
import json
import sys
from datetime import datetime


class WeatherClient:
    """Client for fetching weather data from wttr.in"""

    BASE_URL = "https://wttr.in"

    def __init__(self):
        self.session = requests.Session()

    def get_weather(self, location="London", format_type="json"):
        """
        Fetch weather data for a given location.

        Args:
            location (str): City name or location
            format_type (str): Response format (json, text)

        Returns:
            dict: Weather data
        """
        try:
            url = f"{self.BASE_URL}/{location}"
            params = {"format": "j1"} if format_type == "json" else {}

            response = self.session.get(url, params=params, timeout=10)
            response.raise_for_status()

            if format_type == "json":
                return response.json()
            return response.text

        except requests.exceptions.RequestException as e:
            print(f"Error fetching weather data: {e}", file=sys.stderr)
            return None

    def display_weather(self, location="London"):
        """Display weather information for a location."""
        data = self.get_weather(location)

        if not data:
            return

        current = data.get("current_condition", [{}])[0]

        print(f"\n{'='*50}")
        print(f"Weather for {location}")
        print(f"{'='*50}")
        print(f"Temperature: {current.get('temp_C', 'N/A')}°C / {current.get('temp_F', 'N/A')}°F")
        print(f"Conditions: {current.get('weatherDesc', [{}])[0].get('value', 'N/A')}")
        print(f"Humidity: {current.get('humidity', 'N/A')}%")
        print(f"Wind: {current.get('windspeedKmph', 'N/A')} km/h {current.get('winddir16Point', '')}")
        print(f"Feels Like: {current.get('FeelsLikeC', 'N/A')}°C")
        print(f"{'='*50}\n")


def main():
    """Main function to run the weather client."""
    client = WeatherClient()

    if len(sys.argv) > 1:
        location = " ".join(sys.argv[1:])
    else:
        location = "London"

    print(f"Fetching weather data for: {location}")
    client.display_weather(location)


if __name__ == "__main__":
    main()
