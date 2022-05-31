import { Request, Response, NextFunction } from 'express';

export function globalMiddlewareAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.headers.authorization) {
    next();
  } else {
    return res.status(403).jsonp({ message: 'forbidden by server' });
  }
}
