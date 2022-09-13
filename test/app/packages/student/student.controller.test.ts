// Libraries
import * as chai from 'chai';
import * as sinon from 'sinon';
import * as mocha from 'mocha';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { createResponse } from 'node-mocks-http';
import { Test, TestingModule } from '@nestjs/testing';

// App
import { StudentService } from '../../../../src/app/services/mongo/student.service';
import { StudentController } from '../../../../src/app/packages/student/student.controller';
import {
  Student,
  StudentDocument,
} from '../../../../src/app/models/mongo/student.schema';

mocha.describe('StudentController', () => {
  let controller: StudentController;
  let studentService: StudentService;
  let studentModel: Model<StudentDocument>;

  mocha.before(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [
        {
          provide: getModelToken(Student.name),
          useValue: Model<StudentDocument>,
        },
        StudentService,
      ],
    }).compile();
    const app = module.createNestApplication();
    studentModel = module.get<Model<StudentDocument>>(
      getModelToken(Student.name),
    );
    studentService = module.get<StudentService>(StudentService);
    controller = module.get<StudentController>(StudentController);
    await app.init();
  });

  mocha.it('studentService should be defined', () => {
    chai.assert.isDefined(studentService);
  });

  mocha.describe('List all students', () => {
    mocha.it('should return an array of students', async () => {
      // Arrange
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

      const mock = sinon.mock(studentModel);
      mock.expects('find').resolves(mockedUserList);

      const nodeResponse = createResponse();

      // Act
      // const actual = await controller.getAll(nodeResponse);
      await controller.getAll(nodeResponse);

      // Assert
      mock.verify();
      chai.assert.equal(nodeResponse._getData(), JSON.stringify(expected));
      // chai.assert.equal((actual as []).toString(), expected.toString());
    });
  });
});
