import axios from './axios';

class UploadFilesService {
    upload(file, category, onUploadProgress) {
      let formData = new FormData();
  
      formData.append("file", file);
      formData.append("category", category);
      formData.append("username", localStorage.getItem("username"));
      return axios.post("/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': 'Bearer ' + localStorage.getItem("token"),
        }
      });
    }
  
    getFiles() {
      return axios.get("/files");
    }
  }
  
  export default new UploadFilesService();