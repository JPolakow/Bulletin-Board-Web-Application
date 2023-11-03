import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PostServiceService } from '../../services/post-service.service';
declare var angularComponent: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  posts: any[] = [];

  constructor(public postService: PostServiceService) {}

  private postToDeleteId: string | null = null;
  private postSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.postService.getPost_Service();

    this.postSubscription = this.postService
      .getUpdateListener()
      .subscribe((posts: any[]) => {
        console.log('Posts received:', posts);
        this.posts = posts; // Ensure the assignment is correct
      });
  }

  onAddPost(postform: NgForm) {
    if (postform.invalid) {
      alert('Invalid!');
      return;
    }
    alert(postform.value.enteredID + ':' + postform.value.enteredName);

    this.postService.addPost_Service(
      postform.value.enteredID,
      postform.value.enteredName
    );
    postform.resetForm();
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }

  showDeleteConfirmation(postid: string) {
    // Show the confirmation modal
    this.postToDeleteId = postid;
  }

  onDeleteConfirmed() {
    if (this.postToDeleteId) {
      // Call the deletePost_Service method with the post to delete
      this.postService.deletePost_Service(this.postToDeleteId);
      // Clear the post to delete
      this.postToDeleteId = null;
    }
  }
}
