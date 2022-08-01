import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  message: string;
  data: T;
  errors: [] | null;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        const statusCode = context.switchToHttp().getResponse().statusCode;

        const response: Response<T> = {
          statusCode,
          errors: null,
          message: 'Success',
          data: this.standardizeResponseObject(data),
        };
        return response;
      }),
    );
  }

  private standardizeResponseObject(data) {
    if (!data || isEmpty(data)) {
      return data;
    }

    if (typeof data === 'string' || typeof data === 'number' || typeof data === 'boolean') {
      return data;
    }

    if ('toObject' in data) {
      data = data.toObject();
    }

    if ('_id' in data) {
      data.id = data._id;
      delete data._id;
    }

    if ('__v' in data) {
      delete data.__v;
    }

    const objectKeys = Object.keys(data);
    for (const key of objectKeys) {
      if (typeof data[key] === 'object' && !Array.isArray(data[key])) {
        data[key] = this.standardizeResponseObject(data[key]);
      }
    }

    return data;
  }
}
