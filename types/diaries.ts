export interface Diary {
  id: number;
  userId: number;
  dateStr: string;
  done: string;
  learned: string;
  challenge: string;
  other: string;
}

export interface DiaryState {
  errors?: {
    date?: string[];
    dateStr?: string[];
    done?: string[];
    learned?: string[];
    challenge?: string[];
    other?: string[];
  };
  message?: string | null;
}
