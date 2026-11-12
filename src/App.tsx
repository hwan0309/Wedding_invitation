import { config } from "./config";
import Cover from "./components/Cover";
import Greeting from "./components/Greeting";
import WeddingInfo from "./components/WeddingInfo";
import Calendar from "./components/Calendar";

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
      <WeddingInfo date={config.date} venue={config.venue} />
      <Calendar date={date} />
    </main>
  );
}

export default App;
