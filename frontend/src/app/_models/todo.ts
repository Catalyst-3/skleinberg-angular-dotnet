export interface Todo {
    id: number;
    title: string;
    created: Date | null;
    updated: Date | null;
    isComplete: boolean;
    isDeleted: boolean;
}
