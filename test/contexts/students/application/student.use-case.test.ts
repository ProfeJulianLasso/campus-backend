import * as chai from 'chai';
import * as sinon from 'sinon';
import * as mocha from 'mocha';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import {
  Student,
  StudentDocument,
} from '../../../../src/app/models/mongo/student.schema';
import { StudentService } from '../../../../src/app/services/mongo/student.service';
import { StudentUseCase } from '../../../../src/contexts/students/application/student.use-case';

mocha.describe('StudentUseCases', () => {
  let studentUseCase: StudentUseCase;
  let studentService: StudentService;
  let studentModel: Model<StudentDocument>;

  mocha.before(async () => {
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

  mocha.it('studentService should be defined', () => {
    chai.assert.isDefined(studentService);
  });

  mocha.describe('List all students', () => {
    mocha.it('should return an array of students', async () => {
      // arrange
      const student1 = new Student();
      student1.name = 'John';
      student1.lastName = 'Cage';
      student1.email = 'john@example.com';

      const student2 = new Student();
      student2.name = 'Julian';
      student2.lastName = 'Lasso';
      student2.email = 'julian@example.com';

      const mockedUserList = new Array<Student>();
      mockedUserList.push(student1);
      mockedUserList.push(student2);

      const expected = new Array<Student>();
      expected.push(student1);
      expected.push(student2);

      studentUseCase = new StudentUseCase(studentService);
      const mock = sinon.mock(studentModel);
      mock.expects('find').resolves(mockedUserList);

      // act
      const data = await studentUseCase.listAll();

      // assert
      mock.verify();
      chai.assert.equal(data.toString(), expected.toString());
    });
  });
});
