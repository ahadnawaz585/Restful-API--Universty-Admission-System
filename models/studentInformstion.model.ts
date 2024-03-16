class studentInformationData {
    phone: string;
    email: string;
    address: string;
    studentId: number;

    constructor(
        phone: string,
        email: string,
        address: string,
        studentId: number
    ) {

        this.phone = phone;
        this.email = email;
        this.address = address;
        this.studentId = studentId;
    }
}


export default studentInformationData;
