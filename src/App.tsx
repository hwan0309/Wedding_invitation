import { config } from "./config";
import Cover from "./components/Cover";
import Greeting from "./components/Greeting";
import WeddingInfo from "./components/WeddingInfo";
import Calendar from "./components/Calendar";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import AccountSection from "./components/AccountSection";
import Location from "./components/Location";
import Share from "./components/Share";
import Guestbook from "./components/Guestbook";
import Rsvp from "./components/Rsvp";

function App() {
  const { groom, bride, date, venue, coverImage } = config;

  return (
    <main className="mx-auto max-w-md min-h-screen space-y-4 bg-rose-50 p-4">
      <Cover
        groomName={groom.person.name}
        brideName={bride.person.name}
        date={date}
        venueName={venue.name}
        image={coverImage}
      />
      <Greeting message={config.greeting} groom={groom} bride={bride} />
      <WeddingInfo date={config.date} />
      <Calendar date={date} />
      <Gallery images={config.gallery} />
      <Contact groom={groom} bride={bride} />
      <AccountSection groom={groom} bride={bride} />
      <Location venue={venue} />
      <Share
        title={`${groom.person.name} ♥ ${bride.person.name} 결혼합니다`}
        description="2026년 12월 25일 금요일 오후 12시 30분, OO웨딩홀"
      />
      <Guestbook />
      <Rsvp />
    </main>
  );
}

export default App;
