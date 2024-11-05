export interface Task {
  id: number;
  title: string;
  description: string;
  content: string;
  createdAt: Date;
  isActive: boolean;
}