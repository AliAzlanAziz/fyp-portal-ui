import React, { useEffect, useState } from 'react';
import { Modal, Button } from "react-bootstrap";
import '../../styling/form.css'
import { axiosAdvisor } from '../../global/axios';
import { ContractDetailsModel } from '../models/contractDetails.model';

type RequestDetailsModalProps = {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    id?: String;
}

const RequestDetailsModal = ({...props}: RequestDetailsModalProps) => {
    const {show, setShow, id} = props;
    const [contract, setContract] = useState<ContractDetailsModel>({
        id: '',
        advisor: {
            _id: '',
            name: '',
            department: ''
        },
        student: {
            _id: '',
            name: '',
            ID: ''
        },
        project: {
            name: '',
            description: ''
        },
        studentOne: {
            name: '',
            ID: '',
        },
        studentTwo: {
            name: '',
            ID: '',
        },
        acceptance: 0,
        isClosed: false,
    });
  
    const getRequestDetails = async () => {
        try{
            const res = await axiosAdvisor({
                method: 'GET',
                url: '/request/' + id,
            })

            if(res.status === 200){
                // console.log(res.data.contract)
                setContract(res.data.contract)
            }
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getRequestDetails()
    }, []);

    return (
        <Modal show={show} onHide={() => setShow(false)} size="xl" centered={true}>
            <Modal.Header closeButton>
                <Modal.Title>Request Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-container">
                    <form className="form-horizontal">
                        <div className="form-group">
                            <label>Student Info</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={contract.student.name + ' ~' + contract.student.ID }
                                disabled={true} 
                            >
                            </input>
                        </div>
                        <div className="form-group">
                        </div>
                        <div className="form-group">
                            <label>Project Name</label>
                            <input 
                                type="text"
                                className="form-control" 
                                disabled={true} 
                                value={contract?.project.name}
                            >
                            </input>
                        </div>
                        <div className="form-group">
                            <label>Project Description</label>
                            <input 
                                type="text"
                                className="form-control" 
                                disabled={true} 
                                value={contract?.project?.description}
                            >
                            </input>
                        </div>
                        <div className="form-group">
                            <label>First Student</label>
                        </div>
                        <div className="form-group">
                        </div>
                        <div className="form-group">
                            <label>Name</label>
                            <input 
                                type="text"
                                className="form-control" 
                                disabled={true} 
                                value={contract.studentOne.name}
                            >
                            </input>
                        </div>
                        <div className="form-group">
                            <label>ID</label>
                            <input 
                                type="text"
                                className="form-control" 
                                disabled={true} 
                                value={contract.studentOne.ID}
                            >
                            </input>
                        </div>
                        <div className="form-group">
                            <label>Second Student</label>
                        </div>
                        <div className="form-group">
                        </div>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                className="form-control" 
                                disabled={true} 
                                value={contract.studentTwo.name}
                            >
                            </input>
                        </div>
                        <div className="form-group">
                            <label>ID</label>
                            <input 
                                type="text"
                                className="form-control" 
                                disabled={true} 
                                value={contract.studentTwo.name}
                            >
                            </input>
                        </div>
                    </form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export { RequestDetailsModal };