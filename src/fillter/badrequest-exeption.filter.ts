import { ExceptionFilter, Catch, ArgumentsHost, HttpException, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter  {
  catch(exception: HttpException | any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();     

    console.log(exception.getResponse());
    

    response
      .status(status)
      .json({
        success : false,
        data : exception.getResponse()?.valueOf()?.message ? exception.getResponse()?.valueOf()?.message[0] : exception.getResponse()?.valueOf()?.data
      });
  }
}