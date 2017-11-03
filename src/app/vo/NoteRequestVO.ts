import { Note } from "app/domain/Note";

export class NoteRequestVo {
    operation: string;
    studentId: number;
    studentVersion: number;
    noteUiDto: Note;
}