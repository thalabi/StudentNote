import { Note } from './Note';
import { Grade } from 'app/dto/Grade';
import { SchoolYear } from 'app/dto/SchoolYear';

export class Student {
    id: number;
    firstName: string;
    lastName: string;
    grade: Grade;
    noteSet: Note[];
    schoolYear: SchoolYear;
    version: number;

    gradeSet: Grade[];
    schoolYearSet: SchoolYear[];
}