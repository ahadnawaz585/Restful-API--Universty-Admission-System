
class applicationStatusHistoryData {

    applicationId: number;
    statusFrom: string;
    statusTo: string;
    dateOfChange: Date;
    adminId: number | null;
  
    constructor(
      applicationId: number,
      statusFrom: string,
      statusTo: string,
      dateOfChange: Date,
      adminId: number | null
    ) {

      this.applicationId = applicationId;
      this.statusFrom = statusFrom;
      this.statusTo = statusTo;
      this.dateOfChange = dateOfChange;
      this.adminId = adminId;
    }
  }
  
  export default applicationStatusHistoryData;
  