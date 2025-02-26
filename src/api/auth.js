import axios from "axios";

export const getCurrentUser = async (token) => {
    const res = await axios.get('http://localhost:8000/user/profile', {
        headers: { Authorization: `Bearer ${token}` }
    })

    return res.data
}