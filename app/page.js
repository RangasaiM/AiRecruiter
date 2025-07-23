import Image from "next/image"
import styles from "./page.module.css"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to AI Interview Scheduler</h1>
      <p>Your AI-powered interview scheduling solution</p>
      <div style={{ marginTop: '2rem' }}>
        <Button variant="default">
          Start Scheduling
        </Button>
        <Button variant="outline">
          Learn More
        </Button>
      </div>
    </div>
  );
}
