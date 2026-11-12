import "./App.css";
import { config } from "./config";

function App() {
  const { groom, bride } = config;
  return (
    <main className="mx-auto max-w-md p-6 text-center">
      <h1 className="text-3xl font-bold">
        {groom.person.name} ♥ {bride.person.name}
      </h1>
    </main>
  );
}

export default App;
