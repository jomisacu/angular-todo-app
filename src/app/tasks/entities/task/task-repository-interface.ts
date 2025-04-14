import {Task} from "./task";

export interface TaskRepositoryInterface {
    save(task: Task): void;

    delete(task: Task): void;

    findAll(): Task[];

    findById(id: string): Task | undefined;

    findByDate(date: string): Task[];
}
