import { NestMiddleware } from '@nestjs/common';
export declare class LoggingMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void): void;
}
