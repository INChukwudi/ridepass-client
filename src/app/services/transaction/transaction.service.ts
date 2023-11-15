import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import {ApiResponseModel} from "../../models/api-responses.model";
import {TransactionSummaryModel} from "../../models/user-models.model";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiBaseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUserTransactions(userId: string) {
    return this.http.get<ApiResponseModel<TransactionSummaryModel[]>>
    (`${this.apiBaseUrl}/transactions/getUserTransactions/${userId}`)
  }

  makeTransaction(details: {}) {
    return this.http.post<ApiResponseModel<any>>
    (`${this.apiBaseUrl}/transactions/makeTransaction`, details)
  }
}
