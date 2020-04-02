import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/core/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authType = '';
  isSubmitted = false;
  authForm: FormGroup;
  title = '';

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
  ) {

    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {

    this.route.url.subscribe(data => {
      // get last piece of URl
      this.authType = data[data.length - 1].path;
      this.title = (this.authType === 'login') ? 'sigin' : 'signup';
      if (this.authType === 'register') {

        this.authForm.addControl('firstName', new FormControl('', [Validators.required]));
        this.authForm.addControl('lastName', new FormControl('', [Validators.required]));
        this.authForm.addControl('phone', new FormControl('', [Validators.required]));
      }

    });

  }

  get myForm() {
    return this.authForm.controls;
  }

  onSubmit() {

    this.isSubmitted = true;
    console.log(this.authForm.value);

    if (this.authType === 'register') {

      if (!this.authForm.valid) {
        return false;

      }
      return this.authService.register(this.authForm.value);


    } else {
      this.authService.login(this.authForm.value);
    }
  }
}
