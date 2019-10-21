import axios from "axios"

 let API_URL= `http://localhost:5000/api`

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // dev code
} else {
    // production code
    API_URL= "https://api-dot-lubi-ep.appspot.com/api"
}

/*
API_URL= "https://api-dot-lubi-ep.appspot.com/api"
*/

export const APIURL= API_URL

export default class DataSource {
    constructor(accessToken, storeId) {
        this.API_URL = `${API_URL}/store`
        this.storeId = storeId
        
        console.log(accessToken)

        this.axios = axios.create({
            headers: {
                "X-auth-license": accessToken
            }
        })
    }

    async getStoreCategories(filter) {
        let path;
        let query= filter.type?  `?type=${filter.type}` : "";
        let result = await this.axios.get(`${this.API_URL}/${this.storeId}/category${query}`)
        let arr= result.data.map( v => v.item );
        console.log(result)
        return arr;
    }

    async getStoreSections() {
        let result = await this.axios.get(`${this.API_URL}/${this.storeId}/section`)
       
        let arr= result.data.map( v => v.item );

        if(!arr[0]){
            arr= [];
        }
        return arr;
    }

    async getStoreCategory(id) {
        let result = await this.axios.get(`${this.API_URL}/${this.storeId}/category/${id}`)

        let arr= result.data.map( v => v.item );
        if(!arr[0]){
            arr= [];
        }
        return arr;
        
    }

    async getStoreTransactions(filter) {
        let queryString = ''

        let $1stElementPassed = false

        // element must be a path in the model of this type of data
        for (let element in filter) {
            if ($1stElementPassed) {
                queryString += `&${element}=${filter[element]}`
            } else {
                queryString += `?${element}=${filter[element]}`
                $1stElementPassed = true
            }
        }
        

        var result = await this.axios.get(`${this.API_URL}/${this.storeId}/transaction${queryString}`)
      
        var arr= result.data.map( v => v.item );

        if(!arr[0]){
            arr= [];
        }

        return arr.filter(v=> v==true);
    
    }

    async postStoreTransaction(data) {
        let transaction = await this.axios.post(`${this.API_URL}/${this.storeId}/transaction`, data)
        return transaction;
    }

    async postStoreCategory(data) {

        let result = await this.axios.post(`${this.API_URL}/${this.storeId}/category`, data)
        if (result) {
            return true
        } else {
            return false
        }
    }

    async updateStoreCategory(id, data) {
        let result = await this.axios.put(`${this.API_URL}/${this.storeId}/category/${id}`, data)
        if (result) {
            return true
        } else {
            return false
        }
    }

    async getStoreProducts() {
     
        let result = await this.axios.get(`${this.API_URL}/${this.storeId}/product`)

        let arr= result.data.map( v => v.item );
        if(!arr[0]){
            return [];
        }
        return arr;
    }

    async postStoreProduct(data) {
        let result = await this.axios.post(`${this.API_URL}/${this.storeId}/product`, data)
        if (result) {
            return true
        } else {
            return false
        }
    }

    async updateStoreProduct(id, data) {
        let result = await this.axios.put(`${this.API_URL}/${this.storeId}/product/${id}`, data)
        if (result) {
            return true
        } else {
            return false
        }
    }

    async getStoreCustomers() {
        let result = await this.axios.get(`${this.API_URL}/${this.storeId}/customer`)

        let arr= result.data.map( v => v.item );

        return arr;
    
    }

    async createEPCustomer(data) {
        let result = await this.axios.post(`${API_URL}/user`, data)
        if (result) {
            return result.data
        } else {
            return false
        }
    }

    async getUser(id) {
        let result = await this.axios.get(`${API_URL}/user/${id}`)
        if (result) {
            return result
        } else {
            return false
        }
    }

    async postStoreCustomer(data) {
        let result = await this.axios.post(`${this.API_URL}/${this.storeId}/customer`, data)
        console.log(result)
        if (result) {
            return result.data
        } else {
            return false
        }
    }

    async postStoreTransaction(data) {
        let result = await this.axios.post(`${this.API_URL}/${this.storeId}/transaction`, data)
        if (result) {
            return result
        } else {
            return false
        }
    }

    async deleteStoreTransaction(id) {
        let result = await this.axios.delete(`${this.API_URL}/${this.storeId}/transaction/${id}`)
        console.log(id)
        console.log(result)
        if (result) {
            return result.data
        } else {
            return false
        }
    }

    async deleteStoreCustomer(id) {
        let result = await this.axios.delete(`${this.API_URL}/${this.storeId}/customer/${id}`)

        if (result) {
            return result.data
        } else {
            return false
        }
    }

    async deleteStoreCategory(id) {
        let result = await this.axios.delete(`${this.API_URL}/${this.storeId}/category/${id}`)
        if (result) {
            return result.data
        } else {
            return false
        }
    }

    async deleteStoreProduct(id) {
        let result = await this.axios.delete(`${this.API_URL}/${this.storeId}/product/${id}`)

        return result
    }

    async createStore (id){
        let result= await this.axios.post(`${API_URL}/store`, {owner: id})
       
        return result
    }


}