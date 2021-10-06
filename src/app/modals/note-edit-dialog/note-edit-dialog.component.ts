import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Note, NoteEvent } from 'src/app/models/note.model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-note-edit-dialog',
  templateUrl: './note-edit-dialog.component.html',
  styleUrls: ['./note-edit-dialog.component.scss']
})
export class NoteEditDialogComponent implements OnInit {
  localData: Note;
  editNoteForm = this.fb.group({
    authorName: ['', Validators.required],
    content: ['', Validators.required]
  })
  
  constructor(public dialogRef: MatDialogRef<NoteEditDialogComponent>,
    private fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Note) { 
      this.localData = {...data};
    }

  ngOnInit(): void {
    this.editNoteForm.patchValue({
      authorName: this.localData.authorName,
      content: this.localData.content
    })
  }

  get controls() {
    return this.editNoteForm.controls;
  }

  onUpdateClick(){
    this.dialogRef.close({
      note:{ authorName: this.controls.authorName.value,
             date: new Date(),
             content: this.controls.content.value,
             index: this.localData.index},
      event: NoteEvent.UPDATE
    })
  }

  onDeleteClick() {
    this.dialogRef.close({
      note:{ index: this.localData.index },
      event: NoteEvent.DELETE
    })
  }

}
