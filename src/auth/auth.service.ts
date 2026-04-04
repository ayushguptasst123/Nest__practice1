import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}

  signIn(email: string, password: string) {
    console.log(email, password);
    return { email, password };
  }

  signUp(email: string, password: string) {
    console.log(email, password);
    return { email, password };
  }
}
