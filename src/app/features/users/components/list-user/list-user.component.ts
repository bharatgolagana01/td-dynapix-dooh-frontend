  
  import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
  import { UserService } from '../../user.service';
  import { MatTableDataSource } from '@angular/material/table';
  import { MatPaginator, PageEvent } from '@angular/material/paginator';
  import { MatDialog } from '@angular/material/dialog';
  import { Subscription } from 'rxjs';
  import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
  import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
  import { NotificationService } from 'src/app/core/services/notification.service';
  
  export interface User {
    _id: any;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    createdAt: Date;
    updatedAt: Date; 
  }
  
  @Component({
    selector: 'app-list-user',
    templateUrl: './list-user.component.html',
    styleUrls: ['./list-user.component.scss']
  })
  export class ListUserComponent implements OnInit, OnDestroy {
    users: User[] = [];
    displayedColumns: string[] = ['userName', 'firstName', 'lastName', 'email', 'role', 'createdAt', 'updatedAt','edit','delete'];
    dataSource!: MatTableDataSource<User>;
    totalUsers: number = 0;
    pageIndex: number = 0;
    pageSize: number = 10;
    searchValue: string = '';
    pageSizeOptions: number[] = [5, 10, 25, 50, 100]; // Page size options
    userNotFoundMessage: string = '';
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
  
    private userCreatedSubscription: Subscription = new Subscription();
  
    constructor(private userService: UserService, private dialog: MatDialog, private notificationService: NotificationService) { }
  
    ngOnInit(): void {
      this.loadUsers();
    }
  
    loadUsers(pageIndex: number = 0): void {
      const actualPageIndex = pageIndex >= 0 ? pageIndex : 0; // Ensure pageIndex is non-negative
      const actualPageSize = this.pageSize > 0 ? this.pageSize : 0; // Ensure pageSize is positive
      
      this.userService.getUsers(actualPageIndex + 1, actualPageSize, this.searchValue)
        .subscribe((usersList: any) => {
          this.users = usersList.users;
          this.totalUsers = usersList.totalUsers;
          this.pageIndex = actualPageIndex; // Update pageIndex with the actual value used
          this.dataSource = new MatTableDataSource<User>(this.users);
          this.dataSource.paginator = this.paginator;
          
          // Check if users are found or not
          if (this.users.length === 0 && this.searchValue !== '') {
            this.userNotFoundMessage = 'User not found.';
          } else {
            this.userNotFoundMessage = '';
          }
        });
    }
    
    onPageChange(event: PageEvent): void {
      this.pageSize = event.pageSize;
      this.loadUsers(event.pageIndex);
    }
    
    onSearch(event: any): void {
      this.searchValue = event.target.value.trim().toLowerCase();
      this.loadUsers(); // Reload users with new search value
    }
    
    ngOnDestroy(): void {
      this.userCreatedSubscription.unsubscribe();
    }
  
    deleteUser(user: User): void {
      const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.userService.deleteUser(user).subscribe(() => {
            const index = this.users.findIndex(u => u.userName === user.userName);
            if (index !== -1) {
              this.notificationService.showNotification('User deleted successfully', 'success');
              this.users.splice(index, 1);
              this.dataSource = new MatTableDataSource<User>(this.users);
              this.dataSource.paginator = this.paginator;
            }
          });
        }
      });
    }
  
    editUser(user: User): void {
      const dialogRef = this.dialog.open(EditUserDialogComponent, {
        width: '400px',
        data: { user: user }
      });
    
      dialogRef.afterClosed().subscribe(updatedUser => {
        if (updatedUser) {
          this.userService.updateUser(updatedUser).subscribe(
            (response) => {
              const index = this.users.findIndex(u => u._id === updatedUser._id);
              if (index !== -1) {
                this.users[index] = response.user;
                this.dataSource.data = this.users;
                this.notificationService.showNotification('User updated successfully', 'success');
              }
            },
            (error) => {
              console.error('Error updating user:', error);
              this.notificationService.showNotification('Failed to update user', 'error');
            }
          );
        }
      });
    }
  }
  