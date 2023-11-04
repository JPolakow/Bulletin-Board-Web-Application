import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PostServiceService } from '../../services/post-service.service';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = new FormControl('');
  content = new FormControl('');
  departmentCode = new FormControl('');
  hasError = false;
  errorMessage = '';

  posts: any[] = [];

  constructor(
    public postService: PostServiceService,
    private router: Router,
    private auth: AuthServiceService
  ) {}

  // private postToDeleteId: string | null = null;
  // private postSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    if (!this.auth.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    this.postService.getPost_Service().subscribe({
      next: (v) => (this.posts = v as any),
      error: (e) => console.log(e)
    });
  }

  onAddPost(e: Event) {
    e.preventDefault();
    this.hasError = false;

    if (
      !this.title.value ||
      !this.content.value ||
      !this.departmentCode.value
    ) {
      this.hasError = true;
      this.errorMessage = 'Please fill out all fields';
      return;
    }

    this.postService
      .addPost_Service(
        this.title.value,
        this.content.value,
        this.departmentCode.value
      )
      .subscribe({
        next: (v) => {
          this.posts.push(v), this.title.setValue('');
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

  // ngOnDestroy() {
  //   this.postSubscription.unsubscribe();
  // }

  onDeletePost(id: string){
    this.postService.deletePost_Service(id).subscribe({next: (v)=> console.log(v), error: (e) => console.log(e)})
    const filtered = this.posts.filter((post) => post._id !== id)
    this.posts = filtered
  }
}
