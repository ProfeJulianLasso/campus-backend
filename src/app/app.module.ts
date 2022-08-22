// Libraris
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

// Database Configuration
import { MongoConfigService } from '../database/mongo/mongo-config.service';

// Environment
import environment from '../environment/environment';

// Schemas
import { Student, StudentSchema } from './models/mongo/student.schema';

// Services
import { StudentService } from './services/mongo/student.service';

// Controllers
import { StudentController } from './packages/student/student.controller';

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
  controllers: [StudentController],
  providers: [StudentService],
})
export class AppModule {}
