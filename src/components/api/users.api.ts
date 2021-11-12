import axios from "axios";

export async function getUsers(){
        try{
                const { data } = await axios.get("https://randomuser.me/api/?results=20");
                return [null,data];
        }catch(error){
                return [error];
        }
}