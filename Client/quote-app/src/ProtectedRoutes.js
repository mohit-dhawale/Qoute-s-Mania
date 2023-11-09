import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ProtectedRoutes(props){

const{Component} = props;
const navigate = useNavigate();

useEffect(()=>{
    let login = sessionStorage.getItem("token");
    if(!login){navigate('/')}
});

return (
    <div>
        <Component/>
    </div>
)

}

export default ProtectedRoutes