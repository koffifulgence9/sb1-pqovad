import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card mb-4">
      <div class="card-body">
        <h3 class="card-title mb-3">Nouvelle Tâche</h3>
        <form (ngSubmit)="onSubmit()" #taskForm="ngForm">
          <div class="mb-3">
            <label for="title" class="form-label">Titre</label>
            <input
              type="text"
              class="form-control"
              id="title"
              [(ngModel)]="task.title"
              name="title"
              required
            >
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <input
              type="text"
              class="form-control"
              id="description"
              [(ngModel)]="task.description"
              name="description"
              required
            >
          </div>
          <div class="mb-3">
            <label for="content" class="form-label">Contenu</label>
            <textarea
              class="form-control"
              id="content"
              [(ngModel)]="task.content"
              name="content"
              rows="3"
              required
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary" [disabled]="!taskForm.form.valid">
            Ajouter la tâche
          </button>
        </form>
      </div>
    </div>
  `
})
export class TaskFormComponent {
  @Output() taskAdded = new EventEmitter<Task>();

  task: Partial<Task> = {
    title: '',
    description: '',
    content: ''
  };

  onSubmit() {
    const newTask: Task = {
      id: Date.now(),
      title: this.task.title!,
      description: this.task.description!,
      content: this.task.content!,
      createdAt: new Date(),
      isActive: true
    };

    this.taskAdded.emit(newTask);
    this.resetForm();
  }

  private resetForm() {
    this.task = {
      title: '',
      description: '',
      content: ''
    };
  }
}