class ProgramData {
  programName: string;
  levelOfEducationId: number;
  academicCertificateId:number;
  programFee: number;
  minimumMarksRequired: number;

  constructor(
    programName: string,
    levelOfEducationId: number,
    academicCertificateId: number,
    programFee: number,
    minimumMarksRequired: number,
  ) {
    this.programName = programName;
    this.levelOfEducationId = levelOfEducationId;
    this.academicCertificateId = academicCertificateId;
    this.programFee = programFee;
    this.minimumMarksRequired = minimumMarksRequired;
  }
}

export default ProgramData;
