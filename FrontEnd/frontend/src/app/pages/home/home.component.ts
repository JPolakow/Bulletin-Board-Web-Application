import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostServiceService } from '../../services/post-service.service';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[A-Za-z0-9_()\[\]]*$/),
    Validators.minLength(3),
  ]);
  content = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[A-Za-z0-9_()\[\]]*$/),
    Validators.minLength(3),
  ]);
  departmentCode = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[A-Za-z0-9_()\[\]]*$/),
    Validators.minLength(3),
  ]);
  hasError = false;
  errorMessage = '';
  posts: any[] = [];

  constructor(
    private postService: PostServiceService,
    private router: Router,
    private auth: AuthServiceService
  ) {}

  ngOnInit(): void {
    if (!this.auth.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    this.postService.getPost_Service().subscribe({
      next: (v) => (this.posts = v as any),
      error: (e) => console.log(e),
    });
  }

  formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  }

  onDeletePost(id: string, author: string) {
    const currentUsername = this.auth.getUsername();

    if (currentUsername === author) {
      if (confirm('Are you sure you want to delete this post?')) {
        this.postService.deletePost_Service(id).subscribe({
          next: (v) => {
            console.log(v);

            const filtered = this.posts.filter((post) => post._id !== id);
            this.posts = filtered;
            console.log('Post deleted:', id);
          },
          error: (e) => console.log(e),
        });
      }
    } else {
      alert('You are not the author of this post and cannot delete it.');
    }
  }
}