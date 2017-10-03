import { Student } from '../domain/Student';

export class SaveRemoveStudentsToFromSchoolYearVO {
    schoolYearId: number;
    oldSchoolYearStudents: Student[];
    newSchoolYearStudents: Student[];
}