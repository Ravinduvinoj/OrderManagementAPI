import jwt, { SignOptions } from 'jsonwebtoken';

export const signToken = (id: string, userId: number, email: string) => {
    const options = {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    } as SignOptions;
    return jwt.sign({ id, userId, email }, process.env.JWT_SECRET as string, options);
};
