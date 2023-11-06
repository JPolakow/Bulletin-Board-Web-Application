import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VerificationService {
  constructor() {}

  validateAddPost(
    title: string,
    content: string,
    departmentCode: string
  ): string {
    if (title.length < 3 || content.length < 3 || departmentCode.length < 3) {
      return 'All fields has a min length of 3';
    }

    return 'good';
  }

}
