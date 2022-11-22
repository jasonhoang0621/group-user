import { axiosClient } from ".";

const supplierAPI = {
  async getListSupplier() {
    const response = await axiosClient.get("/supplier");
    return response;
  },
  async create(data) {
    const response = await axiosClient.post("/supplier", data);
    return response;
  },
};

export default supplierAPI;
