import { Test, TestingModule } from '@nestjs/testing';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';

describe('StudentsController', () => {
  let studentsController: StudentsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StudentsController],
      providers: [StudentsService],
    }).compile();

    studentsController = app.get<StudentsController>(StudentsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(studentsController.getHello()).toBe('Hello World!');
    });
  });
});
