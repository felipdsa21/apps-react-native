export type RootStackParamList = {
  Tasks: undefined;
  TaskEditor: { id: number } | undefined;
};

export interface TaskNoId {
  desc: string;
  timestamp: number;
  done: boolean;
}

export interface Task extends TaskNoId {
  id: number;
}
