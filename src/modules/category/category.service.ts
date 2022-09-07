import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { getSlugFromString } from 'src/core/utils/string';
import { Category, CategoryDocument } from 'src/models/category.model';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>) {}

  async getAllCategories(): Promise<CategoryDocument[]> {
    return this.categoryModel.find().populate('image');
  }

  async createCategory(category: Category): Promise<CategoryDocument> {
    const { slug, name } = category;
    if (!slug) {
      category.slug = getSlugFromString(name);
    }
    try {
      const newCategory = new this.categoryModel(category);
      const savedCategory = await newCategory.save();
      return savedCategory.populate('image');
    } catch (error) {
      throw new BadRequestException({
        errors: [
          {
            field: 'name',
            message: ['Tên danh mục đã tồn tại'],
          },
        ],
      });
    }
  }

  async updateCategoryById(id: string, category: Category): Promise<CategoryDocument> {
    const { slug, name } = category;
    if (!slug) {
      category.slug = getSlugFromString(name);
    }
    const updatedCategory = await this.categoryModel.findByIdAndUpdate(id, category, {
      new: true,
    });
    return updatedCategory.populate('image');
  }

  async deleteCategoryById(id: string): Promise<void> {
    await this.categoryModel.findByIdAndDelete(id);
  }
}
