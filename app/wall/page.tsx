import Link from "next/link";

// For setup: open each projector in its own window, full screen.
export default function WallPicker() {
  return (
    <div className="page narrow">
      <h1>Projector walls</h1>
      <p className="muted">Open each one in its own window and make it full screen on that projector.</p>
      <div className="stations">
        <Link href="/wall/a" className="station-card">
          <div className="where">Projector A · left of the wall of mayors</div>
          <h3>Citizen&apos;s Voice</h3>
          <p>Every answer to the prompt of the day, with live votes and replies.</p>
        </Link>
        <Link href="/wall/b" className="station-card">
          <div className="where">Projector B · right of the wall of mayors</div>
          <h3>Mayor of the Day · If I were the Mayor…</h3>
          <p>The featured mayor, how visitors decided on the dilemma, and every signed proclamation.</p>
        </Link>
      </div>
    </div>
  );
}
