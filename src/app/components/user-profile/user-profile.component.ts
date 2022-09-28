import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userId: any;
  userForm: FormGroup;
  isDisabled = true;

  constructor(private formBuilder: FormBuilder, private activateRoute: ActivatedRoute, private http: UsersService) { }

  ngOnInit(): void {
    this.userId = this.activateRoute.snapshot.queryParams['id'];
    this.http.getUsers(this.userId).subscribe(user => {
      this.userForm = this.formBuilder.group({
        name: [user.name, Validators.required],
        username: [user.username, Validators.required],
        email: [user.email, [Validators.required, Validators.email]],
        street: [user.address.street, Validators.required],
        city: [user.address.city, Validators.required],
        zipcode: [user.address.zipcode, Validators.required],
        phone: [user.phone, Validators.required],
        website: [user.website, Validators.required],
        comment: ['']
      })
      this.userForm.disable();
    });
  }

  editForm(): void {
    this.userForm.enable();
    this.isDisabled = false;
  }

  onSubmit(): void {
    console.log(this.userForm.value)
  }
}
