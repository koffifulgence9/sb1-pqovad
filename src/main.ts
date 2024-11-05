import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from './app/task-form/task-form.component';
import { TaskListComponent } from './app/task-list/task-list.component';
import { Task } from './app/models/task.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TaskFormComponent, TaskListComponent],
  template: `
    <div class="container py-4">
      <h1 class="text-center mb-4">Gestionnaire de Tâches</h1>
      <div class="row">
        <div class="col-md-12">
          <app-task-form (taskAdded)="onTaskAdded($event)"></app-task-form>
          <app-task-list
            [tasks]="tasks"
            (taskToggled)="onTaskToggled($event)"
            (taskEdited)="onTaskEdited($event)"
            (taskDeleted)="onTaskDeleted($event)"
          ></app-task-list>
        </div>
      </div>
    </div>
  `
})
export class App {
  tasks: Task[] = [];

  onTaskAdded(task: Task) {
    this.tasks = [...this.tasks, task];
  }

  onTaskToggled(task: Task) {
    this.tasks = this.tasks.map(t => 
      t.id === task.id ? { ...t, isActive: !t.isActive } : t
    );
  }

  onTaskEdited(task: Task) {
    this.tasks = this.tasks.map(t =>
      t.id === task.id ? task : t
    );
  }

  onTaskDeleted(task: Task) {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
  }
}

bootstrapApplication(App);