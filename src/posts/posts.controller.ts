import {
  Get,
  Post,
  Put,
  Delete,
  Param,
  Controller,
  Body,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto, UpdatePostDto } from './dto/posts.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/users/roles/role.enum';
import { Roles } from 'src/users/roles/roles.decorator';

@Controller('/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @Roles(Role.Admin)
  getPosts() {
    return this.postsService.getPosts();
  }

  @Get('/:postId')
  getSinglePost(@Param('postId') postId: string) {
    return this.postsService.getSinglePost(postId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(createPostDto);
  }

  @Put('/:postId')
  updatePost(
    @Param('postId') postId: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.updatePost(postId, updatePostDto);
  }

  @Delete('/:postId')
  deletePost(@Param('postId') postId: string) {
    return this.postsService.deletePost(postId);
  }
}
