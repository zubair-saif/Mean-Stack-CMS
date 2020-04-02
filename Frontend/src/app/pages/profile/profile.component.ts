
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/core/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostService, ApiService } from '@shared/service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user: any = {};
  profileForm: FormGroup;
  postList = [];

  constructor(
    private auth: AuthService,
    private apise: ApiService,
    private fb: FormBuilder,
    private postService: PostService
  ) { }



  ngOnInit(): void {

    this.apise.getUser(this.auth.getUserId).subscribe(res => {
      this.user = res.user;
      console.log(res.user);
      this.user.id = this.auth.getUserId();
    });

    // Object.assign(this.user, this.apise.getUser(this.auth.getUserId));
    this.myPost();
  }

  profile() {
    this.profileForm = this.fb.group({

    });
  }
  myPost() {
    this.postService.getpostByUserId(this.auth.getUserId).subscribe(res => {
      this.postList = res;
      console.log(res);
    });
  }
  logout() {
    this.auth.logout();
  }
}
