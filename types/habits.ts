export interface Habits {
  id: number | null;
  userId: number | null;
  title: string;
  type: string;
  streak: number;
  updatedAt: string | null;
  createdAt: string | null;
}

export interface HabitRecords {
  id: number | null;
  habitId: number;
  date: string;
  status: boolean;
}

export interface NewHabit {
  title: string;
  start: Date;
}

export interface HabitFormState {
  errors?: {
    title?: string[];
    start?: string[];
    type?: string[];
  };
  message?: string | null;
}
