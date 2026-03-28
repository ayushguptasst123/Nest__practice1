// import { Injectable } from '@nestjs/common';

// @Injectable()
export class FormService {
  private readonly users = [{ id: 1, name: 'John Doe' }];

  static findAll() {
    return new FormService().users;
  }
}
