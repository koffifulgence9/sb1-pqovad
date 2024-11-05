import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-edit-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal fade show" [style.display]="visible ? 'block' : 'none'" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modifier la tâche</h5>
            <button type="button" class="btn-close" (click)="onCancel()"></button>
          </div>
          <div class="modal-body">
            <form #editForm="ngForm">
              <div class="mb-3">
                <label for="editTitle" class="form-label">Titre</label>
                <input
                  type="text"
                  class="form-control"
                  id="editTitle"
                  [(ngModel)]="editedTask.title"
                  name="title"
                  required
                >
              </div>
              <div class="mb-3">
                <label for="editDescription" class="form-label">Description</label>
                <input
                  type="text"
                  class="form-control"
                  id="editDescription"
                  [(ngModel)]="editedTask.description"
                  name="description"
                  required
                >
              </div>
              <div class="mb-3">
                <label for="editContent" class="form-label">Contenu</label>
                <textarea
                  class="form-control"
                  id="editContent"
                  [(ngModel)]="editedTask.content"
                  name="content"
                  rows="3"
                  required
                ></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" (click)="onCancel()">Annuler</button>
            <button 
              type="button" 
              class="btn btn-primary" 
              (click)="onSave()"
              [disabled]="!editForm.form.valid"
            >
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
    <div *ngIf="visible" class="modal-backdrop fade show"></div>
  `
})
export class EditModalComponent {
  @Input() visible = false;
  @Input() task?: Task;
  @Output() save = new EventEmitter<Task>();
  @Output() cancel = new EventEmitter<void>();

  editedTask: Partial<Task> = {};

  ngOnChanges() {
    if (this.task) {
      this.editedTask = { ...this.task };
    }
  }

  onSave() {
    if (this.task && this.editedTask.title && this.editedTask.description && this.editedTask.content) {
      this.save.emit({
        ...this.task,
        title: this.editedTask.title,
        description: this.editedTask.description,
        content: this.editedTask.content
      });
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}