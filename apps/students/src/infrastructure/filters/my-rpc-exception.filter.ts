import {
  Catch,
  RpcExceptionFilter,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(BadRequestException)
export class MyRpcExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    console.log('AQUI-------------', exception);
    console.log('AQUI-------------', host);
    return throwError(() => exception);
  }
}
