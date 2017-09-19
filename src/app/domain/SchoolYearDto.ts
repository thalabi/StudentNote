import { StudentDto } from './StudentDto';

export class SchoolYearDto {
    id: number;
    schoolYear: string;
    startDate: Date;
    endDate: Date;
    studentDtoSet: StudentDto[];
    version: number;
}