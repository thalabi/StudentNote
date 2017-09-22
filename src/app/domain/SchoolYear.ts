import { Student } from './Student';

export class SchoolYear {
    id: number;
    schoolYear: string;
    startDate: Date;
    endDate: Date;
    studentSet: Student[];
    version: number;
}