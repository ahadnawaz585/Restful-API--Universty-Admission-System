class applicationData { 
    studentId: number;
    applicationDate: Date;
    applicationFee: number;
    status: string;
  
    constructor(
      studentId: number,
      applicationDate: Date,
      applicationFee: number,
      status: string
    ) {
      this.studentId = studentId;
      this.applicationDate = applicationDate;
      this.applicationFee = applicationFee;
      this.status = status;
    }
  }
  
  export default applicationData;
  