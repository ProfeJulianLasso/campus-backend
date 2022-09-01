// Libraries
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

// Database Configuration
import { MongoConfigService } from '../database/mongo/mongo-config.service';

// Schemas
import { Student, StudentSchema } from './models/mongo/student.schema';

// Services
import { StudentService } from './services/mongo/student.service';

// Controllers
import { StudentController } from './packages/student/student.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/environment/.env.${process.env.NODE_ENV}`,
      isGlobal: true,
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
