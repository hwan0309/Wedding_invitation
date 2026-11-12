import { config } from "./config";
import Cover from "./components/Cover";

function App() {
  const { groom, bride, date, venue, coverImage } = config;
  return (
    <main className="mx-auto max-w-md min-h-screen bg-white">
      <Cover
        groomName={groom.person.name}
        brideName={bride.person.name}
        date={date}
        venueName={venue.name}
        image={coverImage}
      />
    </main>
  );
}

export default App;
