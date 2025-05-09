import { RiddleCard } from "./components/RiddleCard";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col p-6 relative items-center justify-center">
      <div className="flex-1 flex items-center justify-center">
        <RiddleCard />
      </div>
    </div>
  );
}
