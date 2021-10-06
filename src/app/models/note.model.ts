export interface Note {
    authorName: string;
    date: Date;
    content: string;
    index: number;
  }

  export class NoteClass implements Note {
      authorName: string;
      date: Date;
      content: string;
      index: number;
   constructor(authorName: string, date: Date, content: string, index: number){
    this.authorName = authorName;
    this.date = date;
    this.content = content;
    this.index = index;
   }
  }

  export enum NoteEvent {
      UPDATE,
      DELETE
  }