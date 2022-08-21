// Libraris
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

// Database Configuration
import { MongoConfigService } from 'src/database/mongo/mongo-config.service';

// Environment
import environment from 'src/environment/environment';

// Schemas
import { Student, StudentSchema } from './models/mongo/student.schema';

// Services
import { StudentService } from './services/mongo/student.service';

// Controllers
import { StudentsController } from './packages/student/students.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [environment],
    }),
    MongooseModule.forRootAsync({
      useClass: MongoConfigService,
    }),
    MongooseModule.forFeature([
      {
        name: Student.name,
        schema: StudentSchema,
      },
    ]),
  ],
  controllers: [StudentsController],
  providers: [StudentService],
})
export class AppModule {}
