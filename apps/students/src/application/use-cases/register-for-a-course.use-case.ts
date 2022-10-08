// Repositories
import { IStudentRepository } from '../repositories/student.repository';

// Services
import { ICourseService } from '../services/course.service';

// Entities
import { StudentEntity } from '../../domain/entities/student.entity';
import { CourseEntity } from '../../domain/entities/course.entity';

export class RegisterForACourseUseCase<
  T extends StudentEntity,
  U extends CourseEntity,
> {
  // constructor(
  //   private readonly courseService: ICourseService<U>,
  //   private readonly studentRepository: IStudentRepository<T>,
  // ) {}
  // async execute(studentId: string, courseId: string): Promise<T> {
  //   const course = await this.courseService.findById(courseId);
  //   const student = new StudentEntity();
  //   student.uuid = studentId;
  //   student.registerForACourse(course);
  //   const studentUpdated = await this.studentRepository.update(student);
  //   // avisar que un estudiante se registró en un curso
  //   return studentUpdated;
  // }
}
