import React, { useEffect, useState, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import "../../styling/modalForm.css";
import { axiosAdvisor } from "../../global/axios";
import { ContractModel } from "../models/contract.model";
import ReactToPrint from "react-to-print";
import { PrintAdvisorFormModal } from "../common/PrintAdvisorForm";

type AdvisorFormModalProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  id?: String;
};

const AdvisorFormModal = ({ ...props }: AdvisorFormModalProps) => {
  let componentRef = useRef<HTMLDivElement>(null);
  const { show, setShow, id } = props;
  const [contract, setContract] = useState<ContractModel>();

  const getAdvisorForm = async () => {
    try {
      const res = await axiosAdvisor({
        method: "GET",
        url: "/form/" + id,
      });

      if (res.status === 200) {
        // console.log(res.data.contract);
        setContract(res.data.contract);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAdvisorForm();
  }, []);

  return (
    <Modal show={show} onHide={() => setShow(false)} size="xl" centered={true}>
      <Modal.Header>
        <Modal.Title>Advisor Form</Modal.Title>
      </Modal.Header>
      <div className="form-container">
        <div className="d-flex justify-content-center mb-4">
          <img src="https://i.imgur.com/lepfdsC.png" />
        </div>
        <h4 className="text-center">Final Year Project</h4>
        <form className="form-horizontal">
          <div className="form-group">
            <label>Advisor Name</label>
            <input
              type="text"
              className="form-control"
              value={contract?.advisorForm?.advisorName}
              disabled={true}
            ></input>
          </div>
          <div className="form-group"></div>
          <div className="form-group">
            <label>Designation</label>
            <input
              type="text"
              className="form-control"
              value={contract?.advisorForm?.designation}
              disabled={true}
            ></input>
          </div>
          <div className="form-group">
            <label>Department</label>
            <input
              type="text"
              className="form-control"
              value={contract?.advisorForm?.department}
              disabled={true}
            ></input>
          </div>
          <div className="form-group">
            <label>Highest Qualification</label>
            <input
              type="text"
              className="form-control"
              value={contract?.advisorForm?.qualification!}
              disabled={true}
            ></input>
          </div>
          <div className="form-group">
            <label>Area of Specialization</label>
            <input
              type="text"
              className="form-control"
              value={contract?.advisorForm?.specialization}
              disabled={true}
            ></input>
          </div>
          <div className="form-group">
            <label>Contact</label>
            <input
              type="text"
              className="form-control"
              value={contract?.advisorForm?.contact}
              disabled={true}
            ></input>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              className="form-control"
              value={contract?.advisorForm?.email}
              disabled={true}
            ></input>
          </div>
          <div className="form-group">
            <label>Semester</label>
            <input
              type="text"
              className="form-control"
              value={contract?.advisorForm?.semester}
              disabled={true}
            ></input>
          </div>
          <div className="form-group">
            <label>Year</label>
            <input
              type="text"
              className="form-control"
              value={contract?.advisorForm?.year}
              disabled={true}
            ></input>
          </div>
          <div className="form-group">
            <label>Program</label>
            <input
              type="text"
              className="form-control"
              value={contract?.advisorForm?.semester}
              disabled={true}
            ></input>
          </div>
          <div className="form-group">
            <label>Credit Hours</label>
            <input
              type="text"
              className="form-control"
              value={contract?.advisorForm?.year}
              disabled={true}
            ></input>
          </div>
          <div className="form-group">
            <label>Compensation Offered Per Project</label>
            <input
              type="text"
              className="form-control"
              value={contract?.advisorForm?.compensation}
              disabled={true}
            ></input>
          </div>
          <div className="form-group"></div>
          <div className="form-group">
            <label>Project Title</label>
            <input
              type="text"
              className="form-control"
              value={contract?.advisorForm?.project?.name}
              disabled={true}
            ></input>
          </div>
          <div className="form-group"></div>
          <div className="form-group">
            <label>Project Description</label>
            <input
              type="text"
              className="form-control"
              value={contract?.advisorForm?.project?.description}
              disabled={true}
            ></input>
          </div>
          <div className="form-group"></div>
          <div className="form-group">
            <label>Hardware Tools Required</label>
            <input
              type="text"
              className="form-control"
              value={contract?.advisorForm?.tools?.hardware}
              disabled={true}
            ></input>
          </div>
          <div className="form-group"></div>
          <div className="form-group">
            <label>Software Tools Required</label>
            <input
              type="text"
              className="form-control"
              value={contract?.advisorForm?.tools?.software}
              disabled={true}
            ></input>
          </div>
          <div className="form-group"></div>
          <div className="form-group">
            <label>Approximate Cost of the Project</label>
            <input
              type="text"
              className="form-control"
              value={contract?.advisorForm?.tools?.software}
              disabled={true}
            ></input>
          </div>
          <div className="form-group"></div>
          <div className="form-group">
            <label>First Student</label>
          </div>
          <div className="form-group"></div>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              disabled={true}
              value={contract?.advisorForm?.studentOne?.name}
            ></input>
          </div>
          <div className="form-group">
            <label>ID</label>
            <input
              type="text"
              className="form-control"
              disabled={true}
              value={contract?.advisorForm?.studentOne?.ID}
            ></input>
          </div>
          <div className="form-group">
            <label>Second Student</label>
          </div>
          <div className="form-group"></div>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              disabled={true}
              value={contract?.advisorForm?.studentTwo?.name}
            ></input>
          </div>
          <div className="form-group">
            <label>ID</label>
            <input
              type="text"
              className="form-control"
              disabled={true}
              value={contract?.advisorForm?.studentTwo?.ID}
            ></input>
          </div>
          <div className="form-group">
            <label>Reference No.</label>
            <input
              type="text"
              className="form-control"
              value={contract?.advisorForm?.referenceNo}
              disabled={true}
            ></input>
          </div>
        </form>
      </div>
      <Modal.Footer>
        {/* <ReactToPrint
          trigger={() => <Button variant="warning">Print</Button>}
          content={() => componentRef.current}
        />
        <div style={{ display: "none" }}>
            <PrintAdvisorFormModal ref={componentRef} contract={contract} />
        </div> */}

        <Button variant="secondary" onClick={() => setShow(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { AdvisorFormModal };
