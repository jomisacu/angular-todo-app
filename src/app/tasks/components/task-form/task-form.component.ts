import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Task} from "../../entities/task/task";
import {TaskRepositoryLocalStorage} from "../../entities/task/task-repository-local-storage";
import {TaskStatusEnum} from "../../entities/task/task-status-enum";
import * as moment from "moment";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit, OnChanges {
  @Input() task!: Task;

  @Output() taskSaved: EventEmitter<Task> = new EventEmitter();
  @Output() closeFormRequest: EventEmitter<void> = new EventEmitter();

  taskForm: FormGroup = new FormGroup({});
  hasChanges = false;
  TaskStatusEnum = TaskStatusEnum;

  constructor(private taskRepository: TaskRepositoryLocalStorage) {
  }

  ngOnInit(): void {
    this.initTaskForm(this.task);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initTaskForm(this.task);
  }

  initTaskForm(task: Task) {
    this.taskForm = new FormGroup({
      id: new FormControl(task.getId(), [Validators.required]),
      title: new FormControl(task.getTitle(), [Validators.required]),
      dueDate: new FormControl(task.getDueDate().format('YYYY-MM-DD'), [Validators.required]),
      status: new FormControl(task.getStatus(), [Validators.required]),
    });

    const previousHash = JSON.stringify(this.taskForm.value);
    this.taskForm.valueChanges.subscribe(() => {
      const currentHash = JSON.stringify(this.taskForm.value);

      this.hasChanges = currentHash !== previousHash;
    });
  }

  saveTask() {
    if (this.taskForm.invalid) {
      return;
    }

    const task = new Task(
      this.taskForm.value.id,
      this.taskForm.value.title,
      moment(this.taskForm.value.dueDate),
      this.taskForm.value.status,
    );

    this.taskRepository.save(task);

    this.taskSaved.emit(task);
  }

  dispatchCloseFormRequest() {
    this.closeFormRequest.emit();
  }
}
