// import { Injectable } from '@nestjs/common';

// @Injectable()
export class FormService {
  private static readonly users = [{ id: 1, name: 'John Doe' }];

  static findAll() {
    return this.users;
  }
}
