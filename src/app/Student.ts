import { Note } from './Note';

export class Student {
    id: number;
    firstName: string;
    lastName: string;
    grade: string;
    version: number;

    noteList: Note[];
}