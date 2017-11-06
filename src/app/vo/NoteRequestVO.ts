import { Note } from "app/domain/Note";

export class NoteRequestVo {
    studentId: number;
    studentVersion: number;
    noteUiDto: Note;
}