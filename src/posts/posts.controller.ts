import {
  Get,
  Post,
  Put,
  Delete,
  Param,
  Controller,
  Body,
} from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts() {
    return this.postsService.getPosts();
  }

  @Get('/:postId')
  getSinglePost(@Param('postId') postId: string) {
    return this.postsService.getSinglePost(postId);
  }

  @Post()
  createPost(@Body() body) {
    return this.postsService.createPost(body);
  }

  @Put('/:postId')
  updatePost(@Param('postId') postId: string, @Body() body) {
    return this.postsService.updatePost(postId, body);
  }

  @Delete('/:postId')
  deletePost(@Param('postId') postId: string) {
    return this.postsService.deletePost(postId);
  }
}
