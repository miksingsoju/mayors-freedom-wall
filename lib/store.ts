// In-memory store: no database. Everything resets when the server restarts,
// which gives every demo a fresh start with the seeded posts below.
import { ballotCandidates } from "./content";
import type { Comment, ExhibitState, Station, VoteDir } from "./types";

const MIN = 60_000;

function seed(): ExhibitState {
  const now = Date.now();
  const c = (
    id: string,
    station: Station,
    parentId: string | null,
    author: string,
    body: string,
    up: number,
    down: number,
    minsAgo: number,
    choice?: string,
  ): Comment => ({ id, station, parentId, author, body, up, down, createdAt: now - minsAgo * MIN, choice });

  return {
    comments: [
      // Citizen's Voice: "Who should Manila's sidewalks belong to?"
      c("s1", "citizen", null, "lola cora's apo", "Lola ko nagtitinda sa Divisoria for 30 years. Dun niya kami pinag-aral lahat. Hindi lang \"obstruction\" yung nakikita niyo, pamilya yan.", 41, 5, 300),
      c("s1r1", "citizen", "s1", "Anonymous visitor", "naiyak ako dito 🥹", 7, 0, 290),
      c("s1r2", "citizen", "s1", "Commuter, Recto", "respect po sa lola niyo. pero pano naman yung mga nadadapa at muntik masagasaan sa kalsada kasi walang madaanan?", 12, 3, 270),
      c("s2", "citizen", null, "Mark (Tondo)", "Both. Lagyan ng guhit sa sidewalk kung hanggang saan lang yung tindahan, tapos 1 meter para sa tao. Simple lang yan.", 31, 4, 260),
      c("s2r1", "citizen", "s2", "j0mz_23", "simple daw 😂 sino magbabantay? yung barangay na tambay din?", 14, 3, 240),
      c("s2r2", "citizen", "s2r1", "Mark (Tondo)", "edi yung mga vendor mismo. pag di sumunod, tanggal pwesto. tapos.", 9, 2, 230),
      c("s3", "citizen", null, "Anonymous visitor", "PEDESTRIANS. sidewalk nga eh. SIDE. WALK. 🚶", 22, 17, 220),
      c("s3r1", "citizen", "s3", "tita ng divi", "edi wow. san ka bibili ng 3 for 100 na tshirt? sa mall? 🙄", 18, 6, 210),
      c("s3r2", "citizen", "s3r1", "Anonymous visitor", "hahahaha true", 5, 1, 205),
      c("s4", "citizen", null, "Commuter, Recto", "Araw-araw ako dumadaan sa Recto. Minsan 20 minutes para lang makalakad ng isang block. Hindi ito anti-poor, gusto lang namin makauwi.", 24, 11, 190),
      c("s5", "citizen", null, "ate shiela", "HOY YUNG MGA NAGSASABING TANGGALIN LAHAT NG VENDOR, NAKABILI NA BA KAYO NG SCHOOL SUPPLIES DUN?? DUN ANG MURA EH", 13, 9, 170),
      c("s6", "citizen", null, "Student, UST", "night market na lang!! umaga para sa tao at sasakyan, gabi para sa tindahan", 19, 5, 150),
      c("s6r1", "citizen", "s6", "kuya rod", "anong night market, pumunta ka muna ng Divi ng 7pm 😭 wala ka ngang madaanan", 6, 4, 140),
      c("s7", "citizen", null, "Anonymous visitor", "grabe yung amoy at basura pag gabi. ayusin muna yan bago mag-debate", 16, 2, 120),
      c("s8", "citizen", null, "Visitor from Pasig", "Sana may covered market na malapit lang talaga sa dating pwesto. Hindi yung tinapon sa malayo tapos walang bumibili.", 15, 1, 95),
      c("s9", "citizen", null, "divi kid", "vendors talaga. divi without vendors is just a road lol", 11, 13, 70),
      c("s10", "citizen", null, "Anonymous visitor", "both", 4, 1, 45),
      c("s11", "citizen", null, "pao", "parehas tayong taga-Maynila, bakit parang kalaban natin isa't isa 😔", 9, 0, 25),

      // Mayor's Dilemma: signed proclamations ("Mayor <name>") and replies.
      c("m1", "mayor", null, "Mayor Jem", "Relocate first. Kung lilinisin mo agad nang walang mapupuntahan, lilipat lang sila sa kabilang kanto.", 21, 4, 280, "relocate"),
      c("m1r1", "mayor", "m1", "kuya rod", "walang site na kasya lahat. pag hinintay mo yan, 10 years na wala pa ring nangyari", 10, 3, 250),
      c("m1r2", "mayor", "m1r1", "Mayor Jem", "mas okay na mabagal kaysa may pamilyang walang kakainin bukas", 8, 2, 235),
      c("m2", "mayor", null, "Mayor Ram", "CLEAR AGAD. bagong mayor ka, ngayon ka may lakas. pag pinatagal mo, balik lahat 💪", 17, 12, 200, "clear"),
      c("m2r1", "mayor", "m2", "tita ng divi", "easy for you to say, di ikaw yung mawawalan ng pwesto", 13, 3, 185),
      c("m3", "mayor", null, "Mayor Bea", "Vending hours lang, 5pm onwards. May linya sa kalsada na bawal lagpasan, may multa pag lumampas.", 23, 3, 160, "schedule"),
      c("m4", "mayor", null, "Mayor Carlo", "Kausapin muna yung vendor associations bago mag-utos. Walang may gusto na nililinis nang overnight.", 12, 2, 130, "other"),
      c("m5", "mayor", null, "Mayor X", "linis. tapos.", 6, 9, 90, "clear"),
      c("m5r1", "mayor", "m5", "Anonymous visitor", "ang lamig 🥶", 4, 0, 80),
      c("m6", "mayor", null, "Mayor Lyn", "gabi lang ang tinda, umaga daanan. fair sa lahat", 9, 1, 50, "schedule"),
    ],
    ballot: Object.fromEntries(ballotCandidates.map((m, i) => [m.id, [12, 7, 8, 5, 21, 6, 9, 5][i] ?? 0])),
  };
}

// Keep the store on globalThis so hot reloads in dev don't wipe it.
const g = globalThis as unknown as { __exhibit?: ExhibitState };
export const store: ExhibitState = (g.__exhibit ??= seed());

export function addComment(input: {
  station: Station;
  parentId: string | null;
  author: string;
  body: string;
  choice?: string;
}): Comment {
  const comment: Comment = {
    id: crypto.randomUUID(),
    station: input.station,
    parentId: input.parentId,
    author: input.author.trim() || "Anonymous visitor",
    body: input.body.trim(),
    choice: input.parentId ? undefined : input.choice,
    up: 0,
    down: 0,
    createdAt: Date.now(),
  };
  store.comments.push(comment);
  return comment;
}

// Applies a change from one vote state to another, e.g. up -> down undoes the
// upvote and adds a downvote. Each device remembers its own vote locally.
export function applyVote(id: string, from: VoteDir, to: VoteDir): Comment | undefined {
  const comment = store.comments.find((x) => x.id === id);
  if (!comment) return undefined;
  if (from === "up") comment.up = Math.max(0, comment.up - 1);
  if (from === "down") comment.down = Math.max(0, comment.down - 1);
  if (to === "up") comment.up += 1;
  if (to === "down") comment.down += 1;
  return comment;
}

export function castBallot(mayorId: string): boolean {
  if (!(mayorId in store.ballot)) return false;
  store.ballot[mayorId] += 1;
  return true;
}
