export interface Habits {
  id: number;
  userId: number;
  title: string;
  type: string;
  updatedAt: string;
  createdAt: string;
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
