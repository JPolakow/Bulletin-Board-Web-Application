import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostServiceService {
  constructor(private http: HttpClient) {}

  //get posts from the backend
  getPost_Service() {
    return this.http.get('https://localhost:3000/api/posts/');
  }

  //add a new post
  addPost_Service(
    title: string,
    content: string,
    departmentCode: string,
    author: string
  ) {
    return this.http.post('https://localhost:3000/api/posts/', {
      title: title,
      content: content,
      departmentCode: departmentCode,
      author: author,
    });
  }

  //delete a post
  deletePost_Service(postId: string) {
    return this.http.delete('https://localhost:3000/api/posts/' + postId);
  }
}
