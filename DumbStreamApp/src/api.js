import axios from 'axios';

const URL = 'http://localhost:5000';


export default class API {
    
    static async getVideos() {
        try {
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

    static async getCategories() {
        try {
            const targetUrl = `${URL}/categories`;
            const { data } = await axios.get(targetUrl);
            data.map(category => {
                const {id, name} = category;
                category = {id, name}
            })
            return data;

        } catch (error) {
            console.log(error);
        }
    }

}