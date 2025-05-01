import axios from "axios";
import { useParams } from "react-router-dom";

export interface Job {
  id: string;
  title: string;
  description: string;
  typeannonce: 'User'|'Entreprise';
 
}

export const jobsData= async(id: string)=>{
  
  
  const res=await axios.get("http://localhost:8090/api/annonce/getallannoncebyskills/"+id);
  let jobs=[...res.data];
  return jobs;
}
