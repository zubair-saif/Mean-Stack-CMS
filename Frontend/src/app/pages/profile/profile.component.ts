import { ApiService } from './../../shared/service/api.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/core/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user: any = {};
  profileForm: FormGroup;

  constructor(
    private auth: AuthService,
    private apise: ApiService,
    private fb: FormBuilder
  ) { }



  ngOnInit(): void {

    this.apise.getUser(this.auth.getUserId).subscribe(res => {
      this.user = res.user;
      console.log(res.user);
      this.user.id = this.auth.getUserId();
    });

    // Object.assign(this.user, this.apise.getUser(this.auth.getUserId));

  }

  profile() {
    this.profileForm = this.fb.group({

    });
  }

  logout() {
    this.auth.logout();
  }
}
