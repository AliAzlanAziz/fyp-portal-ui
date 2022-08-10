import { AcceptanceStatus } from "../enums/contract.enum";

export class AllContractsModel  {
    _id?: String;
    student?: {
        _id: String;
        name: String;
        ID: String;
    };
    advisor?: {
        _id: String;
        name: String;
        department: String;
    };
    project?: {
        name?: String,
        description?: String
    };
    acceptance?: AcceptanceStatus;
    isClosed?: Boolean;
}