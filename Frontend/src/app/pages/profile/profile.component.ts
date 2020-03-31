import { ApiService } from './../../shared/service/api.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/core/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public user: any = {};
  constructor(private auth: AuthService, private apise: ApiService) { }

  ngOnInit(): void {
    console.log(this.auth.getUserId);
    this.apise.getUser(this.auth.getUserId).subscribe(res => {
      this.user = res.user;
      console.log(res.user);
      this.user.id = this.auth.getUserId();
    });
  }

  logout() {
    this.auth.logout();
  }
}
