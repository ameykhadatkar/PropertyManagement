import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
userDetails : any = []
  constructor() { }

  ngOnInit() {
    this.userDetails = {
      id:1,
      FirstName : 'Amey',
      LastName : 'k',
      Password: 'xyz',
      UserName: 'ameyk',
      Email :'test@test.com' ,
      SecurityQuestion :'What is your name?' ,
      Answer :'Amey' 
    }
  }
  UpdateProfile(){
    alert('Profile has been updated successfully')
  }

}
