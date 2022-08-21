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

  it('studentService should be defined', () => {
    expect(studentService).toBeDefined();
  });

  describe('List all students', () => {
    it('should return an array of students', async () => {
      // arrange
      const mockedUserList = [
        {
          _id: new Types.ObjectId(),
          uuid: '23bcac0c-b464-459b-a99d-f31fcc1a23e0',
          name: 'Julian',
          lastName: 'Lasso',
          email: 'julian.lasso@sofka.com.co',
          status: 1,
          createdAt: new Date(),
        },
        {
          _id: new Types.ObjectId(),
          uuid: 'd0b06d12-6c0a-4177-902d-e81f33616954',
          name: 'Raúl',
          lastName: 'Alzate',
          email: 'raul.alzate@sofka.com.co',
          status: 0,
          createdAt: new Date(),
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
