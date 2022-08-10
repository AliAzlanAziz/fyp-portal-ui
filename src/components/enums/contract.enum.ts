export enum AcceptanceStatus {
    ACCEPTED = 1,
    REJECTED = -1,
    NOT_RESPONDED = 0
}

export const isValidStatus = (status: string): boolean => {
    for(const _status in AcceptanceStatus){
        if(_status === status){
            return true;
        }
    }
    return false;
}