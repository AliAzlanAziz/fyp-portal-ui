import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosAdvisor } from "../../global/axios";
import { AllContractsModel } from "../models/allContractsList.model";
import { RequestDetailsModal } from "./RequestDetailsModal";

const RequestsList = () => {
    const { status } = useParams<'status'>()
    const [selectedContract, setSelectedContract] = useState<AllContractsModel>();
    const [contracts, setContracts] = useState<AllContractsModel[]>();
    const [closed, setClosed] = useState(false);
    const [show, setShow] = useState(false);

    const handleAdvisorSelection = (contract: AllContractsModel) => {
        setSelectedContract(contract);
        setShow(true);
    }

    const getContractsList = async () => {
        const res = await axiosAdvisor({
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

    if(show){
        return <RequestDetailsModal show={show} setShow={setShow} id={selectedContract?._id} />
    }

    return (
        <div>
            <div className="container">
                {status === '0' && <h3 className="text-center">Pending Requests</h3>}
                {status === '1' && <h3 className="text-center">Accepted Requests</h3>}
                {status === '-1' && <h3 className="text-center">Rejected Requests</h3>}
                <div className="btn-group mb-3">
                    <button type="button" className={closed ? "btn btn-outline-primary active" : "btn btn-outline-primary"} onClick={() => setClosed(true)}>Closed</button>
                    <button type="button" className={!closed ? "btn btn-outline-secondary active" : "btn btn-outline-secondary"} onClick={() => setClosed(false)}>Opened</button> 
                </div>
                <div className="row">
                    {contracts?.map((contract: AllContractsModel) => (
                        contract.isClosed === closed && (
                            <div className="col-lg-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h6 className="card-subtitle mb-2 text-muted">Name: {contract?.student?.name} ~ {contract?.student?.ID}</h6>
                                        <h5 className="card-title">{contract?.project?.name}</h5>
                                        <p className="card-text">{contract?.project?.description}</p>
                                        <a className="card-link" onClick={() => handleAdvisorSelection(contract)}>Show details</a>
                                    </div>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </div>
        </div>
    )
}

export { RequestsList };