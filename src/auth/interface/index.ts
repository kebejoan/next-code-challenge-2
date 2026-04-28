import { Request } from 'express';

export interface Payload {
  sub: string;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  user: Payload;
}
