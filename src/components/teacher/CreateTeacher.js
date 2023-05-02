import React, { useState, useEffect } from "react";
import DepartmentService from "../../services/departmentService";


function CreateTeacher() {
    const [state, setState] = useState({
        teacher: {},
        department: [],
        loading: false
    })

    useEffect(() => {
            try {
                setState({...state, loading: true})
                async function getData() {
                    let departmentRes = await DepartmentService.getDepartments();
                    setState({
                        ...state,
                        loading : false,
                        departmentRes : departmentRes.data
                    })
                }
                getData();
            } catch (error) {
                
            }
    }, [])
    
}
