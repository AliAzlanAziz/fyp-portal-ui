import React, { useEffect, useState } from "react";
import { axiosAdmin } from "../../global/axios";
import { StudentModel } from "../models/student.model";

const StudentsList = () => {
    const [selectedStudent, setSelectedStudent] = useState<StudentModel>();
    const [students, setStudents] = useState<StudentModel[]>();

    const handleStudentSelection = (advisor: StudentModel) => {
        setSelectedStudent(advisor);
    }

    const getStudentsList = async () => {
        const res = await axiosAdmin({
          method: 'GET',
          url: '/students'
        })
    
        if(res.status === 200){
          setStudents(res.data.students);
        }
      }

    useEffect(() => {
        getStudentsList()
    }, []);

    return (
        <div>
            <div className="container"> 
                <div className="list-group col-6">
                    {students?.map((student: StudentModel, index: number) => (
                        <a 
                            className={ student._id === selectedStudent?._id ? "list-group-item list-group-item-action mb-1 active" : "list-group-item list-group-item-action mb-1" } 
                            onClick={() => handleStudentSelection(student)} key={index}>
                            Name: {student.name} ~{student.ID} 
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}

export { StudentsList };