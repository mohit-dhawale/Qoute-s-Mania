import { toast } from 'react-toastify';
import axiosInstance from './axiosInstance';
import { log } from './logger';

async function handleRequest(requestFunction) {
    try {
        const response = await requestFunction();
        return response;
    } catch (ex) {
        log(ex);
        if (ex.code && ex.code === "ERR_NETWORK") {
            toast.warning("Can't connect to server at the moment! Please try again later.");
        } else {
            toast.error("Some error occurred! Please try again.");
        }
        // return null;
    }
}
const userId=sessionStorage.getItem('id');


//SIGN IN
export async function loginApi(email,password){
    const body ={email,password}
    return await handleRequest(()=>axiosInstance.post("/user/login",body))
}

//REGISTER
export async function registerApi(first_name,last_name,email,password,mobile,dob){
    const body ={first_name,last_name,email,password,mobile,dob}
    return await handleRequest(()=>axiosInstance.post("/user/register",body))
}

//USER DETAILS
export async function userDetailsApi(){
    return await handleRequest(()=>axiosInstance.get(`/user/${userId}`))
};

//UPDATE USER PROFILE
export async function userProfileUpdateApi(first_name,last_name,dob,mobile){
    console.log()
    const body={first_name,last_name,dob,mobile}
    console.log(body)
    return await handleRequest(()=>axiosInstance.put(`/user/update-profile/${userId}`,body));
}
//UPDATE QUOTE
export async function updateQuoteApi(title,author,quote,quoteId){
    const body ={userId,title,quote,author,quoteId}
    return await handleRequest(()=>axiosInstance.put("/quote/update-quote",body))
}

//ADD QUOTE
export async function addQuoteApi(title,author,quote){
    const body ={title,author,quote,userId}
    console.log(body)
    return await handleRequest(()=>axiosInstance.post("/quote/add-quote",body));
}

//GET ALL QUOTES WITH input userID
export async function getQuotesApi(userId){
    const body ={userId};
    console.log(body)
    return await handleRequest(()=>axiosInstance.get(`/quote/${userId}`))
}

//GET QUOTES BY ID
export async function getQuotesByUserIdApi(){
    return await handleRequest(()=>axiosInstance.get(`/quote/user/${userId}`))
}

//LIKE QUOTE
export async function likeQuoteApi(quoteId){
    console.log(`in liked api` + quoteId)
    const body ={userId,quoteId}
    return await handleRequest(()=>axiosInstance.post('/quote/like-quote',body))
}

//UNLIKE QUOTE
export async function unlikeQuoteApi(quoteId){
    const body ={userId,quoteId}
    return await handleRequest(()=>axiosInstance.post(`/quote/unlike-quote/${quoteId}/user/${userId}`))
}

//FAVOURITE QUOTES BY USER  /fav-quotes/:userId
export async function getFavouriteQuotesApi(){
    return await handleRequest(()=>axiosInstance.get(`/quote/fav-quotes/${userId}`))
}

//DELETE QUOTE
export async function deleteQuoteApi(quoteId){
    const body ={userId,quoteId}
    console.log(body)
    return await handleRequest(()=>axiosInstance.delete(`quote/remove-quote/${quoteId}/user/${userId}`,body))
}