import { axiosClient } from ".";

const categoryAPI = {
  async getListCategory() {
    const response = await axiosClient.get("/category");
    return response;
  },
};

export default categoryAPI;
