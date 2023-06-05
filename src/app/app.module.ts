import { Module } from '@nestjs/common';
import { StudentController } from 'src/student/student.controller';
import { TeacherController } from 'src/teacher/teacher.controller';
import { StudentTeacherController } from 'src/teacher/student.controller';
import { StudentService } from 'src/student/student.service';
import { TeacherService } from 'src/teacher/teacher.service';

// root of our whole application, here we need to tell our application about all of the controllers and providers
@Module({
  imports: [],
  controllers: [StudentController, TeacherController, StudentTeacherController],
  providers: [StudentService, TeacherService],
})
export class AppModule {}
