export default function gca() {
  const CLIENT_ID =
    "840951746882-ksrhra0q5ikp5mt2se38aifbpmidmi2i.apps.googleusercontent.com";
  const API_KEY = "AIzaSyDyDNlcwP4TRieJ7UUktzq2RB0EuGQ8V1s";
  const DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];
  const SCOPES = "https://www.googleapis.com/auth/calendar.events";

  const handleClick = () => {
    const gapi = (window as any).gapi;
    gapi.load("client:auth2", async () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });
      await gapi.auth2.getAuthInstance().signIn();
      const res = await gapi.client.calendar.events.list({
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: "startTime",
      });
      const arr: { title: string; url: string; date: string }[] = [];
      const events = res.result.items;
      events.forEach((event: any) => {
        if ("conferenceData" in event || "hangoutLink" in event) {
          arr.push({
            title: event.summary || "",
            url:
              event.hangoutLink ||
              event.conferenceData.entryPoints[0].uri ||
              "",
            date: event.start.dateTime || "",
          });
        }
      });
      console.log("EVENTS: ", arr);
    });
  };

  function handleSignoutClick() {
    (window as any).gapi.auth2.getAuthInstance().signOut();
  }

  return (
    <div>
      <button onClick={handleClick}>click</button>
      <button onClick={handleSignoutClick}>logout</button>
    </div>
  );
}
