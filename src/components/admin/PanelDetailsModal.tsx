import React, { useEffect, useState } from "react";
import { Modal, Button, Toast } from "react-bootstrap";
import "../../styling/modalForm.css";
import { axiosAdmin } from "../../global/axios";
import { PanelPopulatedModel } from "../models/panelPopulated.model";
import { PanelListModel } from "../models/panelList.model";
import { UserRoles } from "../enums/roles.enum";

type PanelDetailsModalProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  id?: string;
};

const PanelDetailsModal = ({ ...props }: PanelDetailsModalProps) => {
  const { show, setShow, id } = props;
  const [panel, setPanel] = useState<PanelPopulatedModel>();
  const [showRes, setShowRes] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [res, setRes] = useState<String>("");

  const getPanelDetails = async () => {
    try {
      const res = await axiosAdmin({
        method: "GET",
        url: "/panel/" + id,
      });

      if (res.status === 200) {
        // console.log(res.data.contract)
        setPanel(res.data.panel);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeRequest = async () => {
    try {
      const members = panel?.members?.map(panelMember => panelMember._id)
      const res = await axiosAdmin({
        method: "POST",
        url: "/close/panel",
        data: {
          panel: {
            id: id,
            members: members
          }
        },
      });

      if (res.status === 200) {
        // console.log(res.data);
        setSuccess(true);
      } else {
        setSuccess(false);
      }
      setRes(res.data.message);
      setShowRes(true);
    } catch (error: any) {
      setSuccess(false);
      setRes(error?.response?.data?.message);
      setShowRes(true);
      console.log(error);
    }
  };

  useEffect(() => {
    getPanelDetails();
  }, []);

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        size="xl"
        centered={true}
      >
        <Modal.Header>
          <Modal.Title>Panel Details</Modal.Title>
          <div className="start-0 btn-group">
            <Button variant="primary" onClick={() => closeRequest()}>
              Close Panel
            </Button>
          </div>
        </Modal.Header>

        <div>
          <form className="form-horizontal">
            <h3 className="text-center text-dark form-group my-3">
              {panel?.name}
            </h3>
            {panel?.members?.map((panel: PanelListModel, index: number) => (
              <div
                className="form-group col-6 text-center mb-3"
                key={panel._id}
              >
                <h5>Member {index + 1}</h5>
                {panel?.role === UserRoles.ADVISOR && (
                  <h6>{`Advisor: ${panel?.name} ~${panel?.department}`}</h6>
                )}
                {panel?.role === UserRoles.PANEL && (
                  <h6>{`Staff: ${panel?.name} ${
                    panel?.department != undefined
                      ? " ~" + panel?.department
                      : ""
                  }`}</h6>
                )}
              </div>
            ))}
          </form>
        </div>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div
        className="toast-container position-absolute"
        style={{ top: "70px", right: "30px", zIndex: 200000 }}
      >
        <Toast
          onClose={() => setShowRes(false)}
          show={showRes}
          delay={3000}
          autohide
        >
          {success && (
            <Toast.Header className="bg-primary text-light">
              <strong className="me-auto">Success!</strong>
            </Toast.Header>
          )}

          {!success && (
            <Toast.Header className="bg-danger text-light">
              <strong className="me-auto">Error!</strong>
            </Toast.Header>
          )}

          <Toast.Body>{res}</Toast.Body>
        </Toast>
      </div>
    </>
  );
};

export { PanelDetailsModal };
