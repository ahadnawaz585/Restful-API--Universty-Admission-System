class PreviousEducationData {

    schoolName: string;
    schoolProgram: string;
    schoolMarks: number;
    collegeName: string;
    collegeProgram: string;
    collegeMarks: number;
    studentId: number;
  
    constructor(

      schoolName: string,
      schoolProgram: string,
      schoolMarks: number,
      collegeName: string,
      collegeProgram: string,
      collegeMarks: number,
      studentId: number
    ) {

      this.schoolName = schoolName;
      this.schoolProgram = schoolProgram;
      this.schoolMarks = schoolMarks;
      this.collegeName = collegeName;
      this.collegeProgram = collegeProgram;
      this.collegeMarks = collegeMarks;
      this.studentId = studentId;
    }
  }
  
  export default PreviousEducationData;
  