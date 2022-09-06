import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Category } from 'src/models/category.model';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategories() {
    return this.categoryService.getAllCategories();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createCategory(@Body() category: Category) {
    return this.categoryService.createCategory(category);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteCategory(@Param() { id }) {
    return this.categoryService.deleteCategoryById(id);
  }
}
