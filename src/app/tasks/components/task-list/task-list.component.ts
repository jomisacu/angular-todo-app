import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Task} from "../../entities/task/task";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];

  @Output() editTaskRequest: EventEmitter<Task> = new EventEmitter();
  @Output() deleteTaskRequest: EventEmitter<Task> = new EventEmitter();

  onEditTaskButtonClick(task: Task) {
    this.editTaskRequest.emit(task);
  }

  onDeleteTaskButtonClick(task: Task) {
    this.deleteTaskRequest.emit(task);
  }
}
