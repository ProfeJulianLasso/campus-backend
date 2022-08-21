import { StudentUseCase } from './student.use-case';
import { Model } from 'mongoose';
import {
  Student,
  StudentDocument,
} from '../../../app/models/mongo/student.schema';
import { StudentService } from '../../../app/services/mongo/student.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

describe('StudentUseCase', () => {
  let studentUseCase: StudentUseCase;
  let studentService: StudentService;
  let studentModel: Model<StudentDocument>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Student.name),
          useValue: Model,
        },
        StudentService,
      ],
    }).compile();
    studentModel = await module.get<Model<StudentDocument>>(
      getModelToken(Student.name),
    );
    studentService = await module.get<StudentService>(StudentService);
  });

  // it('should be defined', () => {
  //   expect(studentService).toBeDefined();
  // });

  // beforeEach(() => {
  //   studentModel = new Model<StudentDocument>();
  //   studentService = new StudentService(studentModel);
  //   studentUseCase = new StudentUseCase(studentService);
  // });

  describe('listAll', () => {
    it('should return an array of students', async () => {
      // arrange
      studentUseCase = new StudentUseCase(studentService);
      const student = new Student();
      student.name = 'Julian';
      student.lastName = 'Lasso';
      student.email = 'julian.lasso@gmail.com';
      student.status = false;
      const simulation = new Promise<Student[]>((resolve, reject) => {
        resolve([student]);
      });
      const expected = [student];

      // act
      const spy = jest.spyOn(studentModel, 'find').mockReturnThis();

      // assert
      expect(await studentUseCase.listAll()).toBe(expected);
    });
  });
});
