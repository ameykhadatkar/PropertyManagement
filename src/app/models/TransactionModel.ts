export class TransactionModel {
    id: number;
    PropertyId: number;
    TenantId: number;
    PaymentTypeId: number;
    AllPropertyExpense: boolean;
    Reimbursible: boolean;
    Personal: boolean;
    PaymentDatetime: string;
    Amount: number;
    Type: string;
}