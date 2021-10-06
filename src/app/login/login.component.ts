import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userForm = this.builder.group({
    userName:  ['', Validators.required],
    password: ['', Validators.required]
  })
  constructor(private builder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }
    loading = false;
    loadingOpacity = 1;
  ngOnInit(): void {
  }

  onSubmit() {
    // there can be no submittion if the form is not valid and there must be something in both

    let formControls = this.userForm.controls;
    this.loading = true;
    this.loadingOpacity = 0.3;
    this.authService.login(formControls.userName.value, formControls.password.value).subscribe(() => {
      this.loading = false;
      this.loadingOpacity = 1;
      this.authService.userLoggedIn(formControls.userName.value, true);
      this.router.navigate(['/home']);
    });
  }

}
