import { Module } from '@nestjs/common';
import { PostsModule } from 'src/posts/posts.module';
import { StudentModule } from 'src/student/student.module';
import { TeacherModule } from 'src/teacher/teacher.module';
import { AppController } from './app.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

// json-server --watch src/db.json --port 3001
// root of our whole application, here we need to tell our application about all of the controllers, providers or modules
@Module({
  imports: [TeacherModule, StudentModule, PostsModule, AuthModule, UsersModule],
  controllers: [AppController],
})
export class AppModule {}
