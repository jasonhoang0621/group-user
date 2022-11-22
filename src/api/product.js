import { axiosClient } from ".";

const productAPI = {
  async getListProduct() {
    const response = await axiosClient.get("/product");
    return response;
  },
  async create(data) {
    const response = await axiosClient.post("/product", data);
    return response;
  },
  async update(id, data) {
    const response = await axiosClient.patch(`/product/${id}`, data);
    return response;
  },
  async delete(id) {
    const response = await axiosClient.patch(`/product/${id}/deleteProduct`);
    return response;
  },
};

export default productAPI;
