export interface Entry {
  value: number;
  index: number;
}

export interface Frame {
  entries: Entry[];
  pivot?: number;
  interval?: [number, number];
}
