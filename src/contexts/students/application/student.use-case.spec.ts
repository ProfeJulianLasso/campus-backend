import { StudentUseCase } from './student.use-case';
import { Model, Types } from 'mongoose';
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
          useValue: Model<StudentDocument>,
        },
        StudentService,
      ],
    }).compile();
    studentModel = module.get<Model<StudentDocument>>(
      getModelToken(Student.name),
    );
    studentService = module.get<StudentService>(StudentService);
  });

  it('should be defined', () => {
    expect(studentService).toBeDefined();
  });

  describe('listAll', () => {
    it('should return an array of students', async () => {
      // arrange
      const mockedUserList = [
        {
          _id: new Types.ObjectId(),
          lastName: 'John',
          email: 'john@gmail.com',
          name: 'John',
        },
        {
          _id: new Types.ObjectId(),
          lastName: 'Smith',
          email: 'smith@gmail.com',
          name: 'Smith',
        },
      ];
      const expected = [...mockedUserList];

      studentUseCase = new StudentUseCase(studentService);
      jest.spyOn(studentModel, 'find').mockResolvedValue(mockedUserList);

      // act
      const data = await studentUseCase.listAll();

      // assert
      expect(data.toString()).toBe(expected.toString());
    });
  });
});
