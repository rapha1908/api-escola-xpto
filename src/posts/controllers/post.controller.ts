import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes } from "@nestjs/common";
import { PostService } from "../services/post.service";
import z from "zod";
import { ZodValidationPipe } from "src/shared/pipe/zod-validation.pipe";

const createPostSchema = z.object({
  title: z.string(),
  author: z.string(),
  description: z.string(),
});
const updatePostSchema = z.object({
  title: z.string().optional(),
  author: z.string().optional(),
  description: z.string().optional(),
})

type CreatePost = z.infer<typeof createPostSchema>;
type UpdatePost = z.infer<typeof updatePostSchema>;

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

  @UsePipes(new ZodValidationPipe(createPostSchema))
  @Post()
  async createPost(@Body() { title, author, description }: CreatePost) {
    return this.postService.createPost({title, author, description});
  }

  @Put(':id')
  async updatePost(
    @Param("id") id: string,
    @Body(new ZodValidationPipe(updatePostSchema)) post: UpdatePost
  ) {
    return this.postService.updatePost(id, post);
  }
  
    @Delete(':id')
    deletePost(@Param('id') id: string) {
    return this.postService.deletePost(id);
  }
}