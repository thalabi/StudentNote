import { Note } from './Note';
import { Grade } from 'app/domain/Grade';
import { SchoolYear } from 'app/domain/SchoolYear';

export class Student {
    id: number;
    firstName: string;
    lastName: string;
    gradeUiDto: Grade;
    noteSet: Note[];
    schoolYear: SchoolYear;
    version: number;

    gradeSet: Grade[];
    schoolYearSet: SchoolYear[];
}