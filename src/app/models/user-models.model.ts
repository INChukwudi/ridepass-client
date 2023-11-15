export interface LoggedUserModel {
  userId: string,
  userType: number,
  email: string,
  token: string
}

export interface TransactionSummaryModel {
  id: string,
  date: string,
  total: number,
}
