import { Component, OnInit, Input, HostListener } from '@angular/core';
import { CardViewPost } from '../model/cardViewPost.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-view-post',
  templateUrl: './card-view-post.component.html',
  styleUrls: ['./card-view-post.component.scss']
})
export class CardViewPostComponent implements OnInit {

  @Input() inputPost: CardViewPost;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  @HostListener('click') onclick() {
    const postID = this.inputPost._id;

    if (postID !== undefined && postID.length === 24) {
      this.router.navigate(['/view-post', postID]);
    }
  }

}
