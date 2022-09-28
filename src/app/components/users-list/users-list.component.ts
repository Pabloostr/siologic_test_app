import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import { LoadingUsers } from 'src/app/shared/loading/loading-users';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  loadingUsers = new LoadingUsers();

  users: Array<any> = [];

  constructor(private http: UsersService) { }

  ngOnInit(): void {
    this.loadingUsers.startLoading();
    this.http.getUsers().pipe(
    take(1)
   ).subscribe(res => {
    this.loadingUsers.finishLoading();
    this.users = res;
    })
  }

  cityFilter(): void {
    this.users.sort((first, second) => first.address.city > second.address.city ? 1 : -1);
  }

  companyFilter(): void {
    this.users.sort((first, second) => first.company.name > second.company.name ? 1 : -1);
  }
}
