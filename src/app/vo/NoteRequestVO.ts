import { Note } from "app/dto/Note";

export class NoteRequestVo {
    studentId: number;
    studentVersion: number;
    noteDto: Note;
}