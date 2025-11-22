export interface Habits {
  id: number | null;
  userId: number | null;
  title: string;
  type: string;
  streak: number;
  updatedAt: string | null;
  createdAt: string | null;
}

export interface NewHabit {
  title: string;
  start: Date;
}

export interface HabitFormState {
  success: boolean | null;
  errors?: {
    title?: string[];
    start?: string[];
    type?: string[];
  };
  message?: string | null;
}
