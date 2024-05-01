import streamlit as st
import requests
from bs4 import BeautifulSoup

def get_historical_events(day, month, year):
    # Construct the Wikipedia URL for the specified date
    date = f"{month} {day}"
    url = f"https://en.wikipedia.org/wiki/{date}"
    
    # Send an HTTP GET request to the Wikipedia page
    response = requests.get(url)
    
    # Check if the request was successful
    if response.status_code == 200:
        # Parse the HTML content of the page using BeautifulSoup
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Find all list items in the page
        all_list_items = soup.find_all('li')
        
        # Initialize a list to store events
        events = []
        
        # Loop through each list item
        for item in all_list_items:
            # Extract the text of the list item
            item_text = item.get_text(strip=True)
            
            # Extract the date from the item text (assuming it's the first word)
            item_date = item_text.split('–')[0].strip()
            
            # Check if the event occurred on the specified date and if it's relevant to historical occurrences
            if item_date.startswith(f"{month} {day}, {year}") and not item_text.startswith(f"{date} ("):
                events.append(item_text)
        
        if events:
            return events
    
    # If no events are found or the request failed, return a default message
    return ["No events found for this date."]

st.title("Historia: Explore Historical Events")

# Define a list of options for the selectbox
months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

# Display the selectbox in the Streamlit app
month = st.selectbox('Select a month:', months)
day = st.number_input("Enter a day", min_value=1, max_value=31)
year = st.number_input("Enter a year", value=1971, min_value=1, max_value=9999)

if month and day and year:
    events = get_historical_events(day, month, year)
    selected_date = f"{month} {day}, {year}"
    st.markdown(f"### Events on {selected_date}")
    
    if events:
        for event in events:
            st.write(event)
    else:
        st.write("No events found for this date.")
