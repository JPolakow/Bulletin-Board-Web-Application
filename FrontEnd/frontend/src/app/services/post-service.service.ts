import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostServiceService {
  private postDisplay: {
    _id: string;
    title: string;
    content: string;
    datePosted: string;
    departmentCode: string;
    __v: number;
  }[] = [];
  private updatedPostDisplay = new Subject<
    {
      _id: string;
      title: string;
      content: string;
      datePosted: string;
      departmentCode: string;
      __v: number;
    }[]
  >();

  constructor(private http: HttpClient) {}

  getPost_Service() {
    this.http
      .get<{ message: string; post: any }>('https://localhost:3000/api/posts/')
      .subscribe((thepost) => {
        if (Array.isArray(thepost)) {
          this.postDisplay = thepost;
          this.updatedPostDisplay.next([...this.postDisplay]);
        } else {
          console.log('thepost is not an array');
        }
      });
  }

  addPost_Service(pid: string, pname: string) {
    this.http
      .post<{ message: string; post: any }>(
        'https://localhost:3000/api/posts/',
        { id: pid, name: pname }
      )
      .subscribe((thePost) => {
        this.postDisplay.push(thePost.post);
        this.updatedPostDisplay.next([...this.postDisplay]);
      });
  }

  deletePost_Service(postId: string) {
    this.http
      .delete('https://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        const updatedPostDelted = this.postDisplay.filter(
          (post) => post._id != postId
        );
        this.postDisplay = updatedPostDelted;
        this.updatedPostDisplay.next([...this.postDisplay]);
      });
  }

  getUpdateListener() {
    console.log('Emitting data:', this.postDisplay);
    return this.updatedPostDisplay.asObservable();
  }
}
