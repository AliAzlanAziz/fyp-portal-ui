import { AcceptanceStatus } from "../enums/contract.enum";

export class ContractDetailsModel  {
    id: string;
    advisor: {
        _id: string;
        name: string;
        department: string;
    };
    project: {
        name: string,
        description?: string
    };
    studentOne: {
        name: string,
        ID: string,
    };
    studentTwo: {
        name: string,
        ID: string,
    };
    acceptance: AcceptanceStatus;
    isClosed: Boolean;
}