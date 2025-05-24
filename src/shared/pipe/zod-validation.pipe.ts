import { PipeTransform, BadRequestException } from "@nestjs/common";
import { ZodSchema } from "zod";

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  async transform(value: any) {
    try {
      const ParsedValue = this.schema.parse(value);
      return ParsedValue;
    } catch (error) {
      throw new BadRequestException('Validation failed', error.errors);
    }
  }
}