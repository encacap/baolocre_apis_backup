import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
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
                const standardizedData = data?.toObject?.() || data;

                if (typeof standardizedData !== 'string') {
                    if ('_id' in standardizedData) {
                        standardizedData.id = standardizedData._id;
                        delete standardizedData._id;
                    }

                    if ('__v' in standardizedData) {
                        delete standardizedData.__v;
                    }
                }

                const response: Response<T> = {
                    statusCode,
                    errors: null,
                    message: 'Success',
                    data: standardizedData,
                };
                return response;
            }),
        );
    }
}
