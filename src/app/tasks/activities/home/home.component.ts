import {Component} from '@angular/core';
import {Task} from "../../entities/task/task";
import {TaskRepositoryLocalStorage} from "../../entities/task/task-repository-local-storage";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  tasks: Task[] = [];
  editedTask: Task | null = null;
  isAdding = false;
  isEditing = false;

  constructor(private taskRepository: TaskRepositoryLocalStorage) {
    this.loadTasks();
  }

  private loadTasks() {
    this.tasks = this.taskRepository.findAll();
  }

  addTask() {
    this.editedTask = new Task(crypto.randomUUID(), '');
    this.isAdding = true;
  }

  editTask(task: Task) {
    this.editedTask = task;
    this.isEditing = true;
  }

  deleteTask(task: Task) {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    this.taskRepository.delete(task);
    this.loadTasks();
  }

  onTaskSavedEvent(task: Task) {
    this.closeEditor();
    this.loadTasks();
  }

  closeEditor() {
    this.isEditing = false;
    this.isAdding = false;
    this.editedTask = null;
  }
}
