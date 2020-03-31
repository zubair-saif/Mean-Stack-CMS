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

  isSubmitted = false;
  authForm: FormGroup;
  // errors: Errors = { errors: {} };

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
  ) {

    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  ngOnInit(): void {

  }

  onSubmit() {
    this.isSubmitted = true;
    console.log(this.authForm.value);
    this.authService.login(this.authForm.value);
  }
}
