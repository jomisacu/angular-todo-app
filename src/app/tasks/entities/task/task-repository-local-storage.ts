import {Task} from "./task";
import {TaskRepositoryInMemory} from "./task-repository-in-memory";
import {Injectable} from "@angular/core";
import * as moment from "moment";

@Injectable({
  providedIn: "root",
})
export class TaskRepositoryLocalStorage extends TaskRepositoryInMemory {
  constructor() {
    super();

    // you could probably think that constructor shouldn't be used for this,
    // but it's local storage man, give me a breath
    this.loadTasksFromStorage();
  }

  private loadTasksFromStorage() {
    const tasksJson = window.localStorage.getItem('tasks');
    const items = tasksJson ? JSON.parse(tasksJson) : [];

    for (let item of items) {
      const task = new Task(
        item.id,
        item.title,
        moment(item.dueDate),
        item.status,
      );
      this.tasks.push(task)
    }
  }

  private flush() {
    window.localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  override save(task: Task): void {
    super.save(task);

    this.flush();
  }

  override delete(task: Task): void {
    super.delete(task);

    this.flush();
  }
}
