import { useAuth } from "../hooks/useAuth";
import NormalLoadingScreen from "../../interview/pages/NormalLoadingScreen";
import { Navigate } from "react-router";
const Protected = ({children})=>{
    const {loading , user} = useAuth();
    if(loading){
        return (<NormalLoadingScreen/>)
    }

    if(!user){
        return <Navigate to = {'/login'}/>
    }
    return children
}

export default Protected;