import axios from "axios";

export default axios.create({
  baseURL: "https://backend-hvz.herokuapp.com/api/v1",  
});