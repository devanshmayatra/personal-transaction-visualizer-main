export interface User{
  _id: string;
  name: string;
  email: string;
  budgets:[],
  transactions:[],
  provider:string
}