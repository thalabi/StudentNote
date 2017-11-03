import { Note } from "app/domain/Note";

export class NoteRequestVO {
    operation: string;
    studentId: number;
    studentVersion: number;
    noteUiDto: Note;
}