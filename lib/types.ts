export type Station = "citizen" | "mayor";

export type Comment = {
  id: string;
  station: Station;
  parentId: string | null; // null = top-level post, otherwise a reply
  author: string;
  body: string;
  choice?: string; // Mayor's Dilemma choice id, top-level posts only
  up: number;
  down: number;
  createdAt: number;
};

export type ExhibitState = {
  comments: Comment[];
  ballot: Record<string, number>;
};

export type VoteDir = "up" | "down" | null;
