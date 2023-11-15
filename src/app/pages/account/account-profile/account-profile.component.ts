import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.scss']
})

/**
 * Account Profile Component
 */
export class AccountProfileComponent implements OnInit {

  NPasswordType!: boolean;
  CPasswordType!: boolean;
  public isCollapsed = true;
  
  constructor() { }

  ngOnInit(): void {
  }

  /**
   * New Password Hide/Show
   */
   toggleNewPassword() {
    this.NPasswordType = !this.NPasswordType;
  }

  /**
   * Confirm Password Hide/Show
   */
   toggleConfirmPassword() {
    this.CPasswordType = !this.CPasswordType;
  }

  // File Upload
  imageURL: string | undefined;
  fileChange(event:any) {
    let fileList: any = (event.target as HTMLInputElement);
    let file: File = fileList.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
      document.querySelectorAll('#user_profile').forEach((element:any) => {
        element.src = this.imageURL;
      });
    }
    reader.readAsDataURL(file)
  }

}
