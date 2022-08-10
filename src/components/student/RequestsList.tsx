import React, { useEffect, useState } from "react";
import { axiosStudent } from "../../global/axios";
import { AcceptanceStatus } from "../enums/contract.enum";
import { AllContractsModel } from "../models/allContractsList.model";
import { ContractModel } from "../models/contract.model";
import { AdvisorRequestFormModal } from "./AdvisorRequestFormModal";

type RequestsListProps = {
    status: AcceptanceStatus
}

const RequestsList = ({...props}: RequestsListProps) => {
    const { status } = props;
    const [selectedContract, setSelectedContract] = useState<AllContractsModel>();
    const [contracts, setContracts] = useState<AllContractsModel[]>();
    const [show, setShow] = useState(false);

    const handleAdvisorSelection = (contract: AllContractsModel) => {
        setSelectedContract(contract);
        setShow(true);
    }

    const getContractsList = async () => {
        const res = await axiosStudent({
          method: 'GET',
          url: '/requests',
          params: {
            acceptance_status: status
          }
        })
    
        if(res.status === 200){
            setContracts(res.data.contracts);
        }
      }

    useEffect(() => {
        getContractsList()
    }, []);

    return (
        <div>
            <div className="container"> 
                <div className="row">
                    {contracts?.map((contract: AllContractsModel) => (
                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-subtitle mb-2 text-muted">Name: {contract?.advisor?.name} ~{contract?.advisor?.department}</h6>
                                    <h5 className="card-title">{contract?.project?.name}</h5>
                                    <p className="card-text">{contract?.project?.description}</p>
                                    <a className="card-link" onClick={() => handleAdvisorSelection(contract)}>Show details</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <RequestsList show={show} setShow={setShow} id={selectedContract?._id} />
        </div>
    )
}

export { RequestsList };