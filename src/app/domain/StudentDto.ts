import { NoteDto } from './NoteDto';

export class StudentDto {
    id: number;
    firstName: string;
    lastName: string;
    grade: string;
    version: number;

    noteDtoList: NoteDto[];
}