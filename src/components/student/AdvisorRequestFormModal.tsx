import React, { useEffect, useState } from 'react';
import { Modal, Button } from "react-bootstrap";
import { ContractModel } from '../models/contract.model';
import '../../styling/form.css'
import { AdvisorModel } from '../models/advisor.model';
import { axiosStudent } from '../../global/axios';

type AdvisorRequestFormModalProps = {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    advisor?: AdvisorModel;
}

const AdvisorRequestFormModal = ({...props}: AdvisorRequestFormModalProps) => {
    const {show, setShow, advisor} = props;
    const [form, setForm] = useState<ContractModel>();
  
    const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try{
            e.preventDefault();
            setForm({...form, advisor: advisor?._id})
            const res = await axiosStudent({
                method: 'POST',
                url: '/request/advisor',
                data: {
                    contract: form
                }
            })
    
            if(res.status === 200){
                setShow(false)
            }
        }catch(error){
            console.log(error)
        }
    }

    // useEffect(() => {
    // }, []);

    return (
        <Modal show={show} onHide={() => setShow(false)} size="xl" centered={true}>
            <Modal.Header closeButton>
                <Modal.Title>Advisor Request Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-container">
                    <form className="form-horizontal">
                        <div className="form-group">
                            <label>Advisor Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={advisor?.name}
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
                                placeholder="Enter Project Name"
                                onChange={ event => setForm({...form, project: { ...form?.project, name: event.target.value }}) }
                            >
                            </input>
                        </div>
                        <div className="form-group">
                            <label>Project Description</label>
                            <input 
                                type="text"
                                className="form-control" 
                                placeholder="Enter Project Description"
                                onChange={ event => setForm({...form, project: { ...form?.project, description: event.target.value }}) }
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
                                placeholder="Enter First Student Name"
                                onChange={ event => setForm({...form, studentOne: {...form?.studentOne, name: event.target.value }}) }
                            >
                            </input>
                        </div>
                        <div className="form-group">
                            <label>ID</label>
                            <input 
                                type="text"
                                className="form-control" 
                                placeholder="Enter First Student ID"
                                onChange={ event => setForm({...form, studentOne: {...form?.studentOne, ID: event.target.value }}) }
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
                                placeholder="Enter Second Student Name"
                                onChange={ event => setForm({...form, studentTwo: { ...form?.studentTwo, name: event.target.value }}) }
                            >
                            </input>
                        </div>
                        <div className="form-group">
                            <label>ID</label>
                            <input 
                                type="text"
                                className="form-control" 
                                placeholder="Enter Second Student ID"
                                onChange={ event => setForm({...form, studentTwo: { ...form?.studentTwo, ID: event.target.value }}) }
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
                <Button variant="primary" onClick={(e) => handleSave(e)}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export { AdvisorRequestFormModal };