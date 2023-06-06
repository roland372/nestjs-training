import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';

@Injectable()
export class PostsService {
  constructor(private readonly httpService: HttpService) {}

  getPosts(): Observable<AxiosResponse> {
    return this.httpService
      .get('http://localhost:3001/posts')
      .pipe(map((response: AxiosResponse) => response.data));
  }

  getSinglePost(postId: string): Observable<AxiosResponse> {
    return this.httpService
      .get(`http://localhost:3001/posts/${postId}`)
      .pipe(map((response: AxiosResponse) => response.data));
  }

  createPost(postData: any): Observable<AxiosResponse> {
    return this.httpService
      .post('http://localhost:3001/posts', postData)
      .pipe(map((response: AxiosResponse) => response.data));
  }

  updatePost(postId: string, postData: any): Observable<AxiosResponse> {
    return this.httpService
      .put(`http://localhost:3001/posts/${postId}`, postData)
      .pipe(map((response: AxiosResponse) => response.data));
  }

  deletePost(postId: string): Observable<AxiosResponse> {
    return this.httpService
      .delete(`http://localhost:3001/posts/${postId}`)
      .pipe(map((response: AxiosResponse) => response.data));
  }
}
