import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostServiceService {
  // private postDisplay: {
  //   _id: string;
  //   title: string;
  //   content: string;
  //   datePosted: string;
  //   departmentCode: string;
  //   __v: number;
  // }[] = [];
  // private updatedPostDisplay = new Subject<
  //   {
  //     _id: string;
  //     title: string;
  //     content: string;
  //     datePosted: string;
  //     departmentCode: string;
  //     __v: number;
  //   }[]
  // >();

  constructor(private http: HttpClient) {}

  getPost_Service() {
    return this.http.get('https://localhost:3000/api/posts/')
  }

  addPost_Service(title: string, content: string, departmentCode: string) {
    return this.http.post('https://localhost:3000/api/posts/', {
         title: title,
         content: content,
         departmentCode: departmentCode,
       })
  }  

  deletePost_Service(postId: string) {
    return this.http.delete('https://localhost:3000/api/posts/'+ postId)
  }

  // getUpdateListener() {
  //   console.log('Emitting data:', this.postDisplay);
  //   return this.updatedPostDisplay.asObservable();
  // }
}
