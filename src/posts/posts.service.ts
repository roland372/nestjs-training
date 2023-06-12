import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { HttpService } from '@nestjs/axios';
import { catchError } from 'rxjs/operators';
import { Post } from 'src/types';

@Injectable()
export class PostsService {
  constructor(private readonly httpService: HttpService) {}

  // getPosts(): Observable<AxiosResponse<Post[]>> {
  //   return this.httpService
  //     .get<Post[]>('http://localhost:3001/posts')
  //     .pipe(map((response: AxiosResponse) => response.data));
  // }

  // getSinglePost(postId: string): Observable<AxiosResponse> {
  //   return this.httpService
  //     .get(`http://localhost:3001/posts/${postId}`)
  //     .pipe(map((response: AxiosResponse) => response.data));
  // }

  // createPost(postData: Post): Observable<AxiosResponse> {
  //   return this.httpService
  //     .post<Post>('http://localhost:3001/posts', postData)
  //     .pipe(map((response: AxiosResponse) => response.data));
  // }

  // updatePost(postId: string, postData: Post): Observable<AxiosResponse> {
  //   return this.httpService
  //     .put<Post>(`http://localhost:3001/posts/${postId}`, postData)
  //     .pipe(map((response: AxiosResponse) => response.data));
  // }

  // deletePost(postId: string): Observable<AxiosResponse> {
  //   return this.httpService
  //     .delete<Post>(`http://localhost:3001/posts/${postId}`)
  //     .pipe(map((response: AxiosResponse) => response.data));
  // }

  async getPosts(): Promise<Post[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<Post[]>('http://localhost:3001/posts').pipe(
        catchError((error: AxiosError) => {
          console.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );

    return data;
  }

  async getSinglePost(postId: string): Promise<Post> {
    const { data } = await firstValueFrom(
      this.httpService.get<Post>(`http://localhost:3001/posts/${postId}`).pipe(
        catchError((error: AxiosError) => {
          console.error('error', error);
          throw new NotFoundException('Post not found');
        }),
      ),
    );

    return data;
  }

  async createPost(postData: Post): Promise<Post> {
    const { data } = await firstValueFrom(
      this.httpService.post<Post>('http://localhost:3001/posts', postData).pipe(
        catchError(() => {
          throw new InternalServerErrorException('Server Error');
        }),
      ),
    );

    return data;
  }

  async updatePost(postId: string, postData: Post): Promise<Post> {
    const { data } = await firstValueFrom(
      this.httpService
        .put<Post>(`http://localhost:3001/posts/${postId}`, postData)
        .pipe(
          catchError(() => {
            throw new NotFoundException('Failed to update post');
          }),
        ),
    );

    return data;
  }

  async deletePost(postId: string): Promise<string> {
    await firstValueFrom(
      this.httpService.delete(`http://localhost:3001/posts/${postId}`).pipe(
        catchError(() => {
          throw new NotFoundException('Failed to delete post');
        }),
      ),
    );

    return 'Post deleted';
  }
}
