import { Component, OnInit } from '@angular/core';

// Sweet Alert
import Swal from 'sweetalert2';

// Data Get
import { wishlistData } from './data';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {TransactionService} from "../../../services/transaction/transaction.service";
import {AuthService} from "../../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-account-wishlist',
  templateUrl: './account-wishlist.component.html',
  styleUrls: ['./account-wishlist.component.scss']
})

/**
 * Account Wishlist Component
 */
export class AccountWishlistComponent implements OnInit {

  wishlistDatas:any;
  message?: string;
  public isCollapsed = true;
  protected transferForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    amount: ['', [Validators.required]],
    sender: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  constructor(private formBuilder: UntypedFormBuilder, private transactionService: TransactionService,
              protected authService: AuthService, private router: Router) {
    this.wishlistDatas = wishlistData;
  }

  makeTransfer() {
    this.authService.currentUser$.subscribe({
      next: value => {
        this.transferForm.controls['sender'].setValue(value?.userId);
      }
    })

    this.transactionService.makeTransaction(this.transferForm.value).subscribe({
      next: response => {
        if (response.status === "success") {
          this.transferForm.reset();
          setTimeout(() => {
            this.router.navigateByUrl('/account/transactions')
          }, 2000);
        }
        this.message = response.message;
      }
    })
  }

  ngOnInit(): void {
  }

  // Remove Data
  removeData(e:any){
    Swal.fire({
      title: 'Are you Sure ?',
      text: 'Are you Sure You want to Remove this Product ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: 'rgb(243, 78, 78)',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        Swal.fire({title: 'Deleted!', text:'Your file has been deleted.', confirmButtonColor: '#364574',icon: 'success',});
        e.target.closest('.border-bottom').remove();
      }
    });
  }

}
