export interface Habits {
  id: number | null;
  userId: number | null;
  title: string;
  type: string;
  streak: number;
  updatedAt: string | null;
  createdAt: string | null;
}

export interface habitRecords {
  id: number | null;
  habitId: number;
  date: string;
  status: boolean;
}
