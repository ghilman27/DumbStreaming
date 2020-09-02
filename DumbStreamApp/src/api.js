import axios from 'axios';
require('dotenv').config();

const URL = process.env.REACT_APP_API_URL;

export default class API {
    
    static async getVideos() {
        try {
            console.log(URL)
            const targetUrl = `${URL}/videos`;
            const { data: videos } = await axios.get(targetUrl);
            return videos;

        } catch (error) {
            console.log(error);
        }
    }

    static async addVideo(attributes) {
        try {
            const targetUrl = `${URL}/videos/add`;
            await axios.post(targetUrl, attributes);
        } catch (error) {
            console.log(error);
        }
    }

    static async editVideo(attributes, id) {
        try {
            const targetUrl = `${URL}/videos/update/${id}`;
            await axios.put(targetUrl, attributes);
        } catch (error) {
            console.log(error);
        }
    }

    static async deleteVideo(id) {
        try {
            const targetUrl = `${URL}/videos/delete/${id}`;
            await axios.delete(targetUrl);
        } catch (error) {
            console.log(error);
        }
    }

    static async getCategories() {
        try {
            const targetUrl = `${URL}/categories`;
            const { data } = await axios.get(targetUrl);
            data.forEach(category => {
                const {id, name} = category;
                category = {id, name}
            })
            return data;

        } catch (error) {
            console.log(error);
        }
    }

    static async addCategory(name) {
        try {
            const targetUrl = `${URL}/categories/add`;
            await axios.post(targetUrl, name);
        } catch (error) {
            console.log(error);
        }
    }

    static async editCategory(name, id) {
        try {
            const targetUrl = `${URL}/categories/update/${id}`;
            await axios.put(targetUrl, name);
        } catch (error) {
            console.log(error);
        }

    }

    static async deleteCategory(id) {
        try {
            const targetUrl = `${URL}/categories/delete/${id}`;
            await axios.delete(targetUrl);
        } catch (error) {
            console.log(error);
        }
    }

}