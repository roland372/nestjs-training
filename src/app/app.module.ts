import { Module } from '@nestjs/common';
import { StudentModule } from 'src/student/student.module';
import { TeacherModule } from 'src/teacher/teacher.module';

// root of our whole application, here we need to tell our application about all of the controllers, providers or modules
@Module({
  imports: [TeacherModule, StudentModule],
})
export class AppModule {}
