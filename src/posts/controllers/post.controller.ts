import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { PostService } from "../services/post.service";
import { async } from "rxjs";
import { IPost } from "../schemas/models/post.interface";

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}
 @Get()
  async getAllPosts(@Query("limit") limit: number, @Query("page") page: number) {
    return this.postService.getAllPosts(limit, page);
  }
  @Get(':id')
  async getPostById(@Param("id") id: string) {
    return this.postService.getPostById(id);
  }
  @Post()
  async createPost(@Body() post: IPost) {
    return this.postService.createPost(post);
  }
  @Put(':id')
  async updatePost(@Param("id") id: string,@Body() post: IPost) {
    return this.postService.updatePost(id, post);
  }
  
  @Delete(':id')
  deletePost(@Param() id: string) {
    return this.postService.deletePost(id);
  }
}