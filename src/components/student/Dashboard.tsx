import React, { useEffect, useState } from "react";
import { AdvisorModel } from "../models/advisor.model";
import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <div>
            <div className="container">
                <div className="list-group col-6">
                    <Link className="list-group-item list-group-item-action bg-dark text-light" to="/student/advisors">
                        Advisors
                    </Link>
                    <Link className="list-group-item list-group-item-action bg-warning" to="/student/advisors">
                        Request Pending
                    </Link>
                    <Link className="list-group-item list-group-item-action bg-priamry" to="/student/advisors">
                        Request Accepted
                    </Link>
                    <Link className="list-group-item list-group-item-action bg-danger" to="/student/advisors">
                        Request Reject
                    </Link>
                </div>
            </div>
        </div>
    );
}

export { Dashboard };