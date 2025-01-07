import httpx

url = "https://history.muffinlabs.com/date/1/1"

try:
    response = httpx.get(url)
    response.raise_for_status()  # Raise error if status is not 200

    # Print response headers (to check if it's JSON)
    print("Content-Type:", response.headers.get("Content-Type"))

    # Try to parse JSON
    data = response.json()
    print("Success! Here's the data:", data)

except httpx.HTTPStatusError as e:
    print(f"HTTP error: {e}")
except httpx.RequestError as e:
    print(f"Request error: {e}")
except ValueError:
    print("Failed to parse JSON. API might be returning HTML instead.")
