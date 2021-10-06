import { Component, OnDestroy, OnInit } from '@angular/core';
import { StickyNotesService } from '../services/sticky-notes.service';
import { MatDialog } from '@angular/material/dialog';
import { StickNoteDialogComponent } from '../modals/stick-note-dialog/stick-note-dialog.component';
import { Note, NoteClass, NoteEvent } from "../models/note.model";
import { NoteEditDialogComponent } from '../modals/note-edit-dialog/note-edit-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  notes: Note[] = [];
  indexCounter = 0;
  constructor(private stickyService: StickyNotesService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.notes = this.stickyService.getCurrentUserNotes();
    // to not create multiple indexes notes and then deleting multiple
    // since i'm not using a backend i could belive this number cannot reach really high.
    if (this.notes.length > 0){
      this.indexCounter = this.findHighestIndex(this.notes) + 1;
    }
  }

  onPlusClick(){
    const dialogRef = this.dialog.open(StickNoteDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe( result => {
      if (result) { // in case of clicking outside the dialog to close it
        this.notes.push(new NoteClass(result.authorName, result.date, result.content, this.indexCounter++));
        this.sortNotesByDate(this.notes);
        this.storeNotes(this.notes);
      }
    })
  }

  clickOnNote(note: Note) {
    const dialogRef = this.dialog.open(NoteEditDialogComponent, {
      width: '300px',
      data: note
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {  // in case of clicking outside the dialog to close it
        if (result.event === NoteEvent.UPDATE) {
          this.notes[result.note] = result.note;
          this.notes = this.sortNotesByDate(this.notes);
        }
        if(result.event === NoteEvent.DELETE) {
          this.notes = this.notes.filter((note) => result.note.index !== note.index);
        }
        this.sortNotesByDate(this.notes);
        this.storeNotes(this.notes);
      }
    })
  }

  sortNotesByDate(notes: Note[]) {
    return notes.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  storeNotes(notes: Note[]) {
    this.stickyService.storeNotes(notes);
  }

  findHighestIndex(notes: Note[]) {
    let max = notes[0].index;
    for (let note of notes) {
      if (note.index > max ) {
        max = note.index;
      }
    }
    return max;
  }

  ngOnDestroy() {
    this.dialog.closeAll();
  }
}
