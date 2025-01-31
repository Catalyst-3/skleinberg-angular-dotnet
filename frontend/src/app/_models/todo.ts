export interface Todo {
    id: number;
    title: string;
    created: Date;
    updated: Date | null;
    isComplete: boolean;
    isDeleted: boolean;
}
