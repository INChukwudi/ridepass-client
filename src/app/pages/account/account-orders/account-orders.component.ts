import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs';
import { AccountListService } from './account-list.service';
import { DecimalPipe } from '@angular/common';

import { Table } from './account-list.model';
import { tableData } from './data';
import {AuthService} from "../../../services/auth/auth.service";
import {TransactionService} from "../../../services/transaction/transaction.service";
import {TransactionSummaryModel} from "../../../models/user-models.model";

@Component({
  selector: 'app-account-orders',
  templateUrl: './account-orders.component.html',
  styleUrls: ['./account-orders.component.scss'],
  providers: [AccountListService, DecimalPipe]
})

/**
 * Account Orders Component
 */
export class AccountOrdersComponent implements OnInit {

  tables$: Observable<Table[]>;
  total$: Observable<number>;
  public isCollapsed = true;
  protected transactionSummary?: TransactionSummaryModel[];

  constructor(public service: AccountListService, private modalService: NgbModal, private transactionService: TransactionService,
              private authService: AuthService) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }

  private getUserTransactions() {
    this.authService.currentUser$.subscribe({
      next: value => {
        if (value) {
          this.transactionService.getUserTransactions(value.userId).subscribe({
            next: response => {
              this.transactionSummary = response.data;
            }
          })
        }
      }
    })
  }

  ngOnInit(): void {
    this.getUserTransactions();
  }

  /**
   * Size Chart Modal
   * @param ordertDetailModal scroll modal data
   */
   orderModal(ordertDetailModal: any) {
    //this.modalService.open(ordertDetailModal, { size: 'lg', centered: true });
  }

}
