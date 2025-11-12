export interface Diary {
  id: number | null;
  userId: number | null;
  done: string;
  learned: string;
  challenge: string;
  other: string;
  date: string;
  createdAt: string | null;
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

export type DiaryColumns = {
  id: number | null;
  userId: number | null;
  done: string;
  learned: string;
  challenge: string;
  other: string;
  date: string;
};

export type DateRangeStr = {
  from: string;
  to: string;
};
