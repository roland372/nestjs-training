import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  title: string;
  author: string;
}

export class UpdatePostDto extends CreatePostDto {}
