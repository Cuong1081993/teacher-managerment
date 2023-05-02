import React,{useState,useEffect}from "react";
import TeacherService from "../../services/teacherService";
import DepartmentService from "../../services/departmentService";

function TeacherList() {
    const[state, setState] = useState({
        teachers :[],
        departments :[],
        loading : false
    })
    useEffect(()=>{
        try {
            setState({...state,loading : true});
            async function getData(){
                let teacherRes = await TeacherService.getTeacher();
                let departmentRes = await DepartmentService.getDepartments();
                setState({
                    ...state,
                    teacherRes : teacherRes.data,
                    departmentRes : departmentRes.data,
                    loading : false
                })
            }
            getData();
        } catch (error) {
            
        }
    },[])
    
    const handleInput = async (e) =>{
        let teacherRes = await TeacherService.getTeachers();
        let result = teacherRes.data;

        if(e.target.value){
            result = result.filter((item) => item.name.toLowerCase().includes(e.target.value.toLowerCase()));
        }
        setState({
            ...state,
            teachers :result
        })
    }
    return (
        <>
            <section className="create-teacher-area">
                <div className="container d-flex align-items-center justify-content-between">
                    <div className="d-flex flex-colum">
                        <h3 className="fw-bolder">Teachers</h3>
                        <p className="fst-italic text-muted"> Teacher information</p>
                    </div>
                    <div className="w-25">
                        <form className="d-flex">
                            <input type="search" className="form-control" 
                            onInput={handleInput}/>
                            <button>Search</button>
                        </form>
                    </div>
                </div>
                {/* <Link className="btn btn-primary btn-add">
                    <i className="fa fa-user-plus me-2"></i>
                    New Teacher
                </Link> */}
            </section>
        </>
    )
}
export default TeacherList;