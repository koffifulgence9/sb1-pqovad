import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../models/task.model';
import { ConfirmModalComponent } from '../shared/confirm-modal/confirm-modal.component';
import { EditModalComponent } from '../shared/edit-modal/edit-modal.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, ConfirmModalComponent, EditModalComponent],
  template: `
    <div class="row">
      <div class="col-12">
        <h3 class="mb-3">Liste des tâches</h3>
        <div class="row">
          <div class="col-md-6 mb-3" *ngFor="let task of tasks">
            <div class="card task-card" [class.bg-light]="!task.isActive">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-start">
                  <h5 class="card-title" [class.completed]="!task.isActive">{{ task.title }}</h5>
                  <div class="form-check form-switch">
                    <input 
                      class="form-check-input" 
                      type="checkbox" 
                      [checked]="task.isActive"
                      (change)="showToggleModal(task)"
                    >
                  </div>
                </div>
                <h6 class="card-subtitle mb-2 text-muted">{{ task.description }}</h6>
                <p class="card-text">{{ task.content }}</p>
                <p class="card-text"><small class="text-muted">Créée le: {{ task.createdAt | date:'dd/MM/yyyy HH:mm' }}</small></p>
                <div class="btn-group">
                  <button class="btn btn-outline-primary btn-sm" (click)="showEditModal(task)">
                    Modifier
                  </button>
                  <button class="btn btn-outline-danger btn-sm" (click)="showDeleteModal(task)">
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de confirmation pour activer/désactiver -->
    <app-confirm-modal
      [visible]="toggleModalVisible"
      [title]="'Confirmation'"
      [message]="toggleModalMessage"
      (confirm)="confirmToggle()"
      (cancel)="cancelModal()"
    ></app-confirm-modal>

    <!-- Modal de confirmation pour supprimer -->
    <app-confirm-modal
      [visible]="deleteModalVisible"
      [title]="'Confirmation de suppression'"
      [message]="deleteModalMessage"
      (confirm)="confirmDelete()"
      (cancel)="cancelModal()"
    ></app-confirm-modal>

    <!-- Modal de modification -->
    <app-edit-modal
      [visible]="editModalVisible"
      [task]="selectedTask"
      (save)="confirmEdit($event)"
      (cancel)="cancelModal()"
    ></app-edit-modal>
  `
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() taskToggled = new EventEmitter<Task>();
  @Output() taskEdited = new EventEmitter<Task>();
  @Output() taskDeleted = new EventEmitter<Task>();

  toggleModalVisible = false;
  deleteModalVisible = false;
  editModalVisible = false;
  toggleModalMessage = '';
  deleteModalMessage = '';
  selectedTask?: Task;

  showToggleModal(task: Task) {
    this.selectedTask = task;
    this.toggleModalMessage = `Voulez-vous ${task.isActive ? 'désactiver' : 'activer'} la tâche "${task.title}" ?\n\nDescription: ${task.description}`;
    this.toggleModalVisible = true;
  }

  showDeleteModal(task: Task) {
    this.selectedTask = task;
    this.deleteModalMessage = `Êtes-vous sûr de vouloir supprimer la tâche "${task.title}" ?`;
    this.deleteModalVisible = true;
  }

  showEditModal(task: Task) {
    this.selectedTask = task;
    this.editModalVisible = true;
  }

  confirmToggle() {
    if (this.selectedTask) {
      this.taskToggled.emit(this.selectedTask);
    }
    this.cancelModal();
  }

  confirmDelete() {
    if (this.selectedTask) {
      this.taskDeleted.emit(this.selectedTask);
    }
    this.cancelModal();
  }

  confirmEdit(updatedTask: Task) {
    this.taskEdited.emit(updatedTask);
    this.cancelModal();
  }

  cancelModal() {
    this.toggleModalVisible = false;
    this.deleteModalVisible = false;
    this.editModalVisible = false;
    this.selectedTask = undefined;
  }
}