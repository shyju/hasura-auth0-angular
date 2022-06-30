import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  onSignUp() {
    const {email, password} = this.signUpForm.value;
    this.auth.signUp(email, password);
  }

}
