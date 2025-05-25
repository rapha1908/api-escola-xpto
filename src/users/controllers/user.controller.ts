import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors, UsePipes } from "@nestjs/common";
import { UserService } from "../services/user.service";
import z from "zod";
import { ZodValidationPipe } from "src/shared/pipe/zod-validation.pipe";
import { IUser } from "../schemas/models/user.interface";
import { AuthGuard } from "src/shared/guards/auth.guard";
import { LoggingInterceptor } from "src/shared/interceptor/logging.interceptor";

const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
});

type CreateUser = z.infer<typeof createUserSchema>;
type UpdateUser = z.infer<typeof updateUserSchema>;

@UseInterceptors(LoggingInterceptor)
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(@Query("limit") limit: number, @Query("page") page: number) {
    return this.userService.getAllUsers(limit, page);
  }

  @Get(':id')
  async getUserById(@Param("id") id: string) {
    return this.userService.getUserById(id);
  }

  @UsePipes(new ZodValidationPipe(createUserSchema))
  @Post()
  async createUser(@Body() { name, email, password }: CreateUser) {
    return this.userService.createUser({ name, email, password });
  }

  @Put(':id')
  async updateUser(
    @Param("id") id: string,
    @Body(new ZodValidationPipe(updateUserSchema)) user: UpdateUser
  ) {
    return this.userService.updateUser(id, user as Partial<IUser>);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}