import { Test, TestingModule } from '@nestjs/testing';
import { TeachersController } from './teachers.controller';
import { TeachersService } from './teachers.service';

describe('TeachersController', () => {
  let teachersController: TeachersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TeachersController],
      providers: [TeachersService],
    }).compile();

    teachersController = app.get<TeachersController>(TeachersController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(teachersController.getHello()).toBe('Hello World!');
    });
  });
});
