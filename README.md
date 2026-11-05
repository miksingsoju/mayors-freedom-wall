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

## The five screens

| URL | Physical location in the exhibit | What the visitor does |
|---|---|---|
| `/citizen` | Laptop 1, at the "Citizen" chair | Answers the **prompt of the day** as a resident of Manila, then upvotes, downvotes and replies to other visitors. |
| `/mayor` | Laptop 2, at the Mayor's desk | Reads the **Divisoria Dilemma (2019)**, picks a decision, justifies it, then sees what Mayor Isko Moreno actually did and how other visitors chose. |
| `/ballot` | Laptop 2, after the dilemma | Taps to vote for the next mayor the exhibit features. The theme rotates every 3 days. |
| `/wall/a` | Projector A, beside the wall of mayors | Display only. Every Citizen's Voice post, live. |
| `/wall/b` | Projector B, beside the wall of mayors | Display only. The Mayor of the Day, how visitors decided on the dilemma, and every signed proclamation, live. |

## Demo tips

- **See the live sync:** open `/citizen` and `/wall/a` (or `/mayor` and `/wall/b`) in two windows side by side. When you post or vote in one, the projector updates within about 2 seconds. Both projectors can be sorted by Most voted / Controversial / Both sides / Newest. `/wall` links to both, for setup.
- **Use real devices:** run `npm run dev`, find your computer's IP address (on a Mac: System Settings → Wi-Fi → Details), then open `http://<that-ip>:3000/citizen` on a phone or second laptop on the same Wi-Fi.
- **Reset:** stop and restart the server. All posts reset to the seeded examples, because there is no database.
- **Votes:** each device remembers its own upvotes and downvotes. Tap the same arrow again to undo.

## Where to edit things

- `lib/content.ts`: the prompt of the day, the dilemma text, the historical reveal, and the ballot candidates
- `lib/store.ts`: the seeded example posts
- `app/globals.css`: colors and fonts (CSS variables at the top). The theme follows the Mayor's Office wall: cream panels, mahogany frames, teal map panels, and a dark wood desk.
- `components/Decor.tsx`: the framed portraits, the newspaper clipping, and the emblem

### Using real mayor portraits

To add or change a portrait, save the image to `public/mayors/` (for example `public/mayors/lacson.png`), then set `photo: "/mayors/lacson.png"` on that mayor in `lib/content.ts`. Mayors with no photo show their initials.

## Credits

- Street map of Metro Manila: © OpenStreetMap contributors (https://www.openstreetmap.org/copyright)
- "What Mayor Isko Moreno actually did" reveal: Rappler, "Vexed by trash, Isko Moreno evicts vendors from Divisoria main street" (Nov 11, 2019), https://www.rappler.com/philippines/244623-isko-moreno-evicts-vendors-divisoria-main-street-november-2019/
- Divisoria street photo (`public/divisoria.webp`): add its source to the project references.
- Mayor portraits in `public/mayors/`: list each photo's source in the project references.
