import axios from "axios";
import toast from "react-hot-toast";

// const serverUrl = "http://localhost:5000/api"
const serverUrl = "https://merror-server.onrender.com/api"

export const api = axios.create({
    baseURL: serverUrl,
    headers: {
        userId: localStorage.getItem("userId")
    }
})

api.interceptors.response.use(
    (res) => {
        if (res?.data?.message) {
            toast.success(res?.data?.message)
        }
        return res;
    },
    async (err) => {
        toast.error(err?.response?.data?.message ?? "somethings went wrong")
        return Promise.reject(err);
    }
);

// get

export const getConsultant = async (params = {}) => {
    try {
        const { data } = await api.get('/get-consultant', {
            params
        })
        return data
    } catch (error) {
        console.log("error", error)
        return null
    }
}


export const getCategory = async (params = {}) => {

    try {
        const { data } = await api.get('/get-category', {
            params
        })
        return data
    } catch (error) {
        console.log("error", error)
        return null
    }
}



export const getAssignment = async (params = {}) => {
    try {
        const { data } = await api.get('/get-assignment', {
            params
        })
        console.log("dd", data)
        return data
    } catch (error) {
        console.log("error", error)
        return null
    }
}


export const getAppointment = async (params = {}) => {
    try {
        const { data } = await api.get('/get-appointment', {
            params
        })
        return data
    } catch (error) {
        console.log("error", error)
        return null
    }
}



export const getUser = async (params = {}) => {
    try {
        const { data } = await api.get('/get-user', {
            params
        })
        return data
    } catch (error) {
        console.log("error", error)
        return null
    }
}



export const getFeedback = async (params = {}) => {
    try {
        const { data } = await api.get('/get-feedback', {
            params
        })
        return data
    } catch (error) {
        console.log("error", error)
        return null
    }
}




export const getBlog = async (params = {}) => {
    try {
        const { data } = await api.get('/get-blog', {
            params
        })
        return data
    } catch (error) {
        console.log("error", error)
        return null
    }
}

export const getReview = async (params = {}) => {
    try {
        const { data } = await api.get('/get-review', {
            params
        })
        return data
    } catch (error) {
        console.log("error", error)
        return null
    }
}



export const getDashboard = async (params = {}) => {
    try {
        const { data } = await api.get('/dashboard', {
            params
        })
        return data
    } catch (error) {
        console.log("error", error)
        return null
    }
}



export const getResult = async (params = {}) => {
    try {
        const { data } = await api.get('/get-result', {
            params
        })
        return data
    } catch (error) {
        console.log("error", error)
        return null
    }
}


// Ctrate

export const createConsultant = async (value) => {
    try {
        await api.post('/create-consultants', value)
    } catch (error) {
        console.log("error", error)
    }
}


export const createAssignment = async (value) => {
    try {
        await api.post('/create-assignment', value)
    } catch (error) {
        console.log("error", error)
    }
}


export const createCategory = async (value) => {
    try {
        await api.post('/create-category', value)
    } catch (error) {
        console.log("error", error)
    }
}


export const createBlog = (value) => {
    try {
        return api.post('/create-blogs', value)
    } catch (error) {
        console.log("error", error)
        return null
    }
}


export const loginUser = (value) => {
    try {
        return api.post('/login-user', value)
    } catch (error) {
        console.log("error", error)
        return null
    }
}


// Details

export const consultantDetail = async (param) => {
    try {
        const { data } = await api.get(`/consultant-detail/${param}`)
        return data.result
    } catch (error) {
        console.log("error", error)
        return null
    }
}


export const assignmentDetail = async (param) => {
    try {
        const { data } = await api.get(`/assignment-detail/${param}`)
        return data.result
    } catch (error) {
        console.log("error", error)
        return null
    }
}


export const categoryDetail = async (param) => {
    try {
        const { data } = await api.get(`/category-detail/${param}`)
        return data.result
    } catch (error) {
        console.log("error", error)
        return null
    }
}


export const appointmentDetail = async (param) => {
    try {
        const { data } = await api.get(`/appointment-detail/${param}`)
        return data.result
    } catch (error) {
        console.log("error", error)
        return null
    }
}


export const blogDetail = async (param) => {
    try {
        const { data } = await api.get(`/blog-detail/${param}`)
        return data.result
    } catch (error) {
        console.log("error", error)
        return null
    }
}



export const userDetail = async (param) => {
    try {
        const { data } = await api.get(`/user-detail/${param}`)
        return data.result
    } catch (error) {
        console.log("error", error)
        return null
    }
}


// update

export const updateConsultant = async (param, value) => {
    try {
        await api.post(`/update-consultant/${param}`, value)
    } catch (error) {
        console.log("error", error)
    }
}


export const updateAssignment = async (param, value) => {
    try {
        await api.post(`/update-assignment/${param}`, value)
    } catch (error) {
        console.log("error", error)
    }
}


export const updateCategory = async (param, value) => {
    try {
        await api.post(`/update-category/${param}`, value)
    } catch (error) {
        console.log("error", error)
    }
}



export const updateBlog = async (param, value) => {
    try {
        await api.post(`/update-blog/${param}`, value)
    } catch (error) {
        console.log("error", error)
    }
}


// delete

export const deleteConsultant = async (id) => {
    try {
        await api.post(`/delete-consultant/${id}`)
    } catch (error) {
        console.log("error", error)
    }
}


export const deleteAssignment = async (id) => {
    try {
        await api.post(`/delete-assignment/${id}`)
    } catch (error) {
        console.log("error", error)
    }
}


export const deleteCategory = async (id) => {
    try {
        await api.post(`/delete-category/${id}`)
    } catch (error) {
        console.log("error", error)
    }
}


export const deleteAppointment = async (id) => {
    try {
        await api.post(`/delete-appointment/${id}`)
    } catch (error) {
        console.log("error", error)
    }
}




export const deleteUser = async (id) => {
    try {
        await api.post(`/delete-user/${id}`)
    } catch (error) {
        console.log("error", error)
    }
}




export const deleteFeedback = async (id) => {
    try {
        await api.post(`/delete-feedback/${id}`)
    } catch (error) {
        console.log("error", error)
    }
}




export const deleteBlog = async (id) => {
    try {
        await api.post(`/delete-blog/${id}`)
    } catch (error) {
        console.log("error", error)
    }
}


export const deleteReview = async (id) => {
    try {
        await api.post(`/delete-review/${id}`)
    } catch (error) {
        console.log("error", error)
    }
}