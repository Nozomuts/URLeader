import React from "react";

export default function gca() {
  const CLIENT_ID =
    "840951746882-ksrhra0q5ikp5mt2se38aifbpmidmi2i.apps.googleusercontent.com";
  const API_KEY = "AIzaSyDyDNlcwP4TRieJ7UUktzq2RB0EuGQ8V1s";
  const DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];
  const SCOPES = "https://www.googleapis.com/auth/calendar.events";

  const handleClick = () => {
    const gapi = window.gapi;
    gapi.load("client:auth2", () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });
      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          console.log("signed in");
          gapi.client.calendar.events
            .list({
              calendarId: "primary",
              timeMin: new Date().toISOString(),
              showDeleted: false,
              singleEvents: true,
              maxResults: 10,
              orderBy: "startTime",
            })
            .then((response) => {
              const events = response.result.items;
              console.log("EVENTS: ", events);
            });
        });
    });
  };

  function handleSignoutClick() {
    window.gapi.auth2.getAuthInstance().signOut();
  }

  return (
    <div>
      <button onClick={handleClick}>click</button>
      <button onClick={handleSignoutClick}>logout</button>
    </div>
  );
}
