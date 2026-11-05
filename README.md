# Mayor's Interactive Freedom Wall: Digital Tour Prototype

Group 1 · Manila Clock Tower, 5th Floor (Mayor's Office)

This is a local web prototype of the exhibit. It runs on one computer, and the other devices on the same Wi-Fi network connect to it. This is the same local-network setup the real exhibit would use.

## Setup (once)

Requires [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
```

## Run

```bash
npm run dev
```

Then open **http://localhost:3000**.

## The four screens

| URL | Physical location in the exhibit | What the visitor does |
|---|---|---|
| `/citizen` | Laptop 1, at the "Citizen" chair | Answers the **prompt of the day** as a resident of Manila, then upvotes, downvotes and replies to other visitors. |
| `/mayor` | Laptop 2, at the Mayor's desk | Reads the **Divisoria Dilemma (2019)**, picks a decision, justifies it, then sees what Mayor Isko Moreno actually did and how other visitors chose. |
| `/ballot` | Laptop 2, after the dilemma | Taps to vote for the next mayor the exhibit features. The theme rotates every 3 days. |
| `/wall` | The two side projectors | Display only. Shows both stations' posts live, with sorting: Most voted / Controversial / Both sides / Newest. |

## Demo tips

- **See the live sync:** open `/citizen` and `/wall` in two windows side by side. When you post or vote in one, the wall updates within about 2 seconds.
- **Use real devices:** run `npm run dev`, find your computer's IP address (on a Mac: System Settings → Wi-Fi → Details), then open `http://<that-ip>:3000/citizen` on a phone or second laptop on the same Wi-Fi.
- **Reset:** stop and restart the server. All posts reset to the seeded examples, because there is no database.
- **Votes:** each device remembers its own upvotes and downvotes. Tap the same arrow again to undo.

## Where to edit things

- `lib/content.ts`: the prompt of the day, the dilemma text, the historical reveal, and the ballot candidates
- `lib/store.ts`: the seeded example posts
- `app/globals.css`: colors and fonts (CSS variables at the top). The theme follows the Mayor's Office wall: cream panels, mahogany frames, teal map panels, and a dark wood desk.
- `components/Decor.tsx`: the painted placeholder portraits, newspapers, emblem, and the Mayor's chair-and-desk scene

### Using real mayor portraits

The portraits are drawn placeholders. To use real ones, save an image to `public/mayors/<id>.jpg` (for example `public/mayors/lacson.jpg`), then set `photo: "/mayors/lacson.jpg"` on that mayor in `wallOfMayors` in `lib/content.ts`.

## Credits

- Street map of Metro Manila: © OpenStreetMap contributors (https://www.openstreetmap.org/copyright)
- Divisoria street photo (`public/divisoria.webp`): add its source to the project references.
- Mayor portraits in `public/mayors/`: list each photo's source in the project references. Lacson and Bagatsing still use drawn placeholders.
