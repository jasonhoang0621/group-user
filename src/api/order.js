import { axiosClient } from ".";

const orderAPI = {
  async getListOrder() {
    const response = await axiosClient.get("/order");
    return response;
  },
  async update(code, data) {
    const response = await axiosClient.put(`/order/${code}`, data);
    return response;
  },
};

export default orderAPI;
