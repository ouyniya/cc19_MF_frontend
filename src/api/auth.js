import axios from "axios";

export const getCurrentUser = async (token) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`, {
        headers: { Authorization: `Bearer ${token}` }
    })

    return res.data
}