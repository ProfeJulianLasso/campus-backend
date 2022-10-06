import {
  Catch,
  RpcExceptionFilter,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';
import { Request, Response } from 'express';

@Catch()
export class MyRpcExceptionFilter implements RpcExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost): Observable<any> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.json({
      statusCode: 'NO ME JODAN!!!',
      timestamp: new Date().toISOString(),
      path: request.url,
    });

    console.log('AQUI 2-------------', exception);
    return throwError(() => exception);
  }
}
