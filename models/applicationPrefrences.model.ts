

class applicationPreferenceData {
    applicationId: number;
    programId: number;
    priority: number;
  
    constructor( applicationId: number, programId: number, priority: number) {
      this.applicationId = applicationId;
      this.programId = programId;
      this.priority = priority;
    }
  }
  
  export default applicationPreferenceData;
  