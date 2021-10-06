import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Note } from 'src/app/models/note.model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-stick-note-dialog',
  templateUrl: './stick-note-dialog.component.html',
  styleUrls: ['./stick-note-dialog.component.scss']
})
export class StickNoteDialogComponent implements OnInit {
  localData: Note;
  stickyNoteForm = this.fb.group({
    authorName: ['', Validators.required],
    content: ['', Validators.required]
  })

  constructor(public dialogRef: MatDialogRef<StickNoteDialogComponent>,
    private fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Note) { 
      this.localData = {...data};
    }
    

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  submit() {
    let formControls = this.stickyNoteForm.controls;
    this.dialogRef.close({authorName: formControls.authorName.value,date: new Date(), content: formControls.content.value})
  }
}
