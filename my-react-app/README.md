# Event Planning System

This is a **React** application built using **Vite** that helps users plan events by providing weather information for a chosen location. Based on the weather, it suggests whether an indoor event is preferable.

## Features
1. **User Authentication**:  
   - Login or Sign Up to access the system.

2. **Home Page**:  
   - Displays the current date's weather.  
   - Users can select an event from a dropdown, fill out a form with details like date, time, country, and city, and submit the form.  

3. **Event Summary**:  
   - After submitting, a modal shows:  
     - Weather details of the selected location and time.  
     - A suggestion on whether the weather is suitable for indoor events.  


## Technologies Used
- **Frontend**: React, Vite, Styled Components (for modal styling)
- **API**: A weather API is used to fetch weather details.  
  - API URL FOR WEATHER: `[342d4b5c8d4c4e8aa91155720250201]`
- **Deployment**: Netlify ([Visit deployed app here](https://679006567d24396ce29804fd--fascinating-baklava-ad0bb7.netlify.app/))
- **Version Control**: Git (GitHub repository: [Event Planning System](https://github.com/Awill100/Event-Planner))  

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Awill100/Event-Planner
   cd event-planning-system


Important Note:
1) npm install
2) VITE_API_KEY = 342d4b5c8d4c4e8aa91155720250201
3) npm run dev

To make the build of the project:
1) npm run build
