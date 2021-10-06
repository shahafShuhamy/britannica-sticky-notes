import { Injectable, PACKAGE_ROOT_URL } from '@angular/core';
import { Note } from '../models/note.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StickyNotesService {

  constructor(private authService: AuthService) { }

  getCurrentUserNotes() {
    let result = []
    const user = this.authService.currentLoggedInUser;
    let notes = localStorage.getItem(user);
    if (notes !== '' && notes != null) {
      result = JSON.parse(notes);
    }

    return result;
  }

  storeNotes(notes: Note[]){
    const user = this.authService.currentLoggedInUser;
    const notesJson = JSON.stringify(notes);
    localStorage.setItem(user, notesJson);
  }
}
