import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <div>
            <div className="container">
                <div className="list-group col-6">
                    <Link className="list-group-item list-group-item-action bg-warning" to="/admin/students">
                        Students List
                    </Link>
                    <Link className="list-group-item list-group-item-action bg-priamry" to="/admin/advisors">
                        Advisors List
                    </Link>
                    <Link className="list-group-item list-group-item-action bg-dark text-light" to="/admin/listforpanel">
                        List For Panel Selection
                    </Link>
                    <Link className="list-group-item list-group-item-action bg-success text-light" to="/admin/panels">
                        Panels List
                    </Link>
                </div>
            </div>
        </div>
    );
}

export { Dashboard };