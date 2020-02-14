import axios from "axios";
import {baseURL} from './Config'

export default class SubscriptionService {
    
    getAllPlans() {
        return axios.get(`${baseURL}AllPlans`);
    }

    deletePlan(name) {
        return axios.post(`${baseURL}DeletePlan`, {name: name });
    }

    setNewPlan(name, price, services) {
        return axios.post(`${baseURL}NewPlan`,
        { name: name, price: price, services: services });
    }

    editPlan(oldName, name, price, services) {
        return axios.post(`${baseURL}EditPlan`, 
        { oldName: oldName, name: name, price: price, services: services });
    }

    setNewUser(email, password, name, surname) {
        return axios.post(`${baseURL}SignUpUser`,
        {  email: email, password: password, name: name, surname: surname });
    }

    findUser(email) {
        return axios.get(`${baseURL}FindUser`, {email: email});
    }

    setNewContract(email, target, plan){
        return axios.post(`${baseURL}NewContract`, { email:email, target:target, plan:plan});
    }

    deleteContract(email, target){
        return axios.post(`${baseURL}DeleteContract`, {email:email , target:target});
    }
}