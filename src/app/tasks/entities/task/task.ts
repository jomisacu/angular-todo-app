import {Moment} from "moment/moment";
import * as moment from "moment";
import {TaskStatusEnum} from "./task-status-enum";

export class Task {
  constructor(
    private id:string,
    private title:string,
    private dueDate: Moment = moment(),
    private status: TaskStatusEnum = TaskStatusEnum.PENDING,
  ) {
  }

  getId(): string {
    return this.id;
  }

  getDueDate(): Moment {
    return this.dueDate;
  }

  isPending(): boolean {
    return this.status == TaskStatusEnum.PENDING;
  }

  isExpired(): boolean {
    return this.isPending() && this.dueDate.isBefore(moment(), 'day');
  }

  isCompleted(): boolean {
    return this.status == TaskStatusEnum.COMPLETED;
  }

  getTitle(): string {
    return this.title;
  }

  getStatus(): TaskStatusEnum {
    return this.status;
  }
}
