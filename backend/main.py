from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import httpx

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/events/{month}/{day}/{year}")
async def get_events(month: int, day: int, year: int):
    url = f"https://history.muffinlabs.com/date/{month}/{day}"
    
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        
        # Check if the response is HTML instead of JSON
        if "text/html" in response.headers.get("Content-Type", ""):
            raise HTTPException(status_code=500, detail="Received HTML instead of JSON. The MuffinLabs API might be down.")
        
        # Try parsing JSON safely
        try:
            data = response.json()
        except ValueError:
            raise HTTPException(status_code=500, detail="Invalid JSON response received.")

        # Extract and filter events
        filtered_events = [
            {"year": event["year"], "text": event["text"]}
            for event in data.get("data", {}).get("Events", [])
            if str(year) in event.get("year", "")
        ]
        
        return {"events": filtered_events}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
