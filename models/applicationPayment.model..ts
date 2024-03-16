// applicationPayment.model.ts

class applicationPaymentData {
    applicationId: number;
    paymentDate: Date;
    bankName: string;
    amountPaid: number;
  
    constructor(
      applicationId: number,
      paymentDate: Date,
      bankName: string,
      amountPaid: number
    ) {
      this.applicationId = applicationId;
      this.paymentDate = paymentDate;
      this.bankName = bankName;
      this.amountPaid = amountPaid;
    }
  }
  
  export default applicationPaymentData;

  