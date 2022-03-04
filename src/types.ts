export interface FileJson {
  faculties: Faculty[];
}

export interface Faculty {
  id:              string;
  name:            string;
  "working-hours": WorkingHours;
  rooms:           Room[];
}

export interface Room {
  id:    string;
  name:  string;
  desks: Desk[];
}

export interface Desk {
  id:    string;
  order: number;
}

export interface WorkingHours {
  opens:  string;
  closes: string;
}
