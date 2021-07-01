export class TransactionModel {
    id: number;
    PropertyId: number;
    tenantId: number;
    PaymentTypeId: number;
    allPropertyExpense: boolean;
    reimbursible: boolean;
    Personal: boolean;
    PaymentDatetime: string;
    Amount: number;
    Type: string;
    transactionMode:string;
    fileName:string;
    base64String:string
}