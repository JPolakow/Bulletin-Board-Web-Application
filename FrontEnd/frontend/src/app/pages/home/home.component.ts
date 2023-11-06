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

  onAddPost() {
    this.hasError = false;
    this.errorMessage = '';

    const titleValue = this.title.value;
    const contentValue = this.content.value;
    const departmentCodeValue = this.departmentCode.value;

    if (!titleValue || !contentValue || !departmentCodeValue) {
      this.hasError = true;
      this.errorMessage = 'Please fill in all inputs';
      return;
    }

    this.postService
      .addPost_Service(titleValue, contentValue, departmentCodeValue)
      .subscribe({
        next: (v) => {
          this.posts.push(v);
          this.title.setValue('');
          this.content.setValue('');
          this.departmentCode.setValue('');
        },
        error: (e) => {
          this.hasError = true;
          this.errorMessage = e.message;
          console.log(e);
        },
      });
  }

  onDeletePost(id: string) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost_Service(id).subscribe({
        next: (v) => console.log(v),
        error: (e) => console.log(e),
      });
      const filtered = this.posts.filter((post) => post._id !== id);
      this.posts = filtered;
      console.log('Post deleted:', id);
    }
  }
}
