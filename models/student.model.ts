class studentData {
  name: string;
  fatherName: string;

  picture: string;
  age: number;
  dob: Date;
  citizen: string;
  religion: string;
  address: string;

  constructor(
    name: string,
    fatherName: string,

    picture: string,
    age: number,
    dob: Date,
    citizen: string,
    religion: string,
    address: string
  ) {
    this.name = name;
    this.fatherName = fatherName;

    this.picture = picture;
    this.age = age;
    this.dob = dob;
    this.citizen = citizen;
    this.religion = religion;
    this.address = address;
  }
}

export default studentData;
// export interface studentData{
//   name: string;
//  fatherName: string;
//  gender: string;
//  picture: string;
//  age: number;
//  dob: Date;
//  citizen: string;
//  religion: string;
//  address: string;
// }
