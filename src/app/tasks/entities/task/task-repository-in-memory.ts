import {Task} from "./task";
import * as moment from "moment";
import {TaskRepositoryInterface} from "./task-repository-interface";

export class TaskRepositoryInMemory implements TaskRepositoryInterface {
  protected tasks: Task[] = [];

  save(task: Task) {
    if (this.tasks.find(t => t.getId() == task.getId())) {
      this.tasks = this.tasks.map(t => t.getId() == task.getId() ? task : t);
    } else {
      this.tasks.push(task);
    }
  }

  delete(task: Task): void {
    this.tasks = this.tasks.filter(t => t.getId() !== task.getId());
  }

  findAll(): Task[] {
    return this.tasks.sort((t1, t2) => {
      if (t1.getDueDate().isBefore(t2.getDueDate())) {
        return -1;
      }

      if (t1.getDueDate().isAfter(t2.getDueDate())) {
        return 1;
      }

      return 0;
    });
  }

  findById(id: string): Task | undefined {
    return this.tasks.find(t => t.getId() == id);
  }

  findByDate(date: string): Task[] {
    const dateFormat = 'YYYY-MM-DD';

    return this.tasks.filter(t => t.getDueDate().format(dateFormat) == moment(date).format(dateFormat));
  }
}
