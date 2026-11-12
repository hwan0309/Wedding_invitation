import { config } from "./config";
import Cover from "./components/Cover";
import Greeting from "./components/Greeting";

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
      <Greeting message={config.greeting} groom={groom} bride={bride} />
    </main>
  );
}

export default App;
