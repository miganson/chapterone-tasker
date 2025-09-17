export type TaskId = string;

export interface Task {
  id: TaskId;
  text: string;
  completed: boolean;
  createdAt: number;
}
