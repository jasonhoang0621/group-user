import { axiosClient } from ".";

const voucherAPI = {
  async getListVoucher() {
    const response = await axiosClient.get("/voucherAdmin");
    return response;
  },
  async create(data) {
    const response = await axiosClient.post("/voucher", data);
    return response;
  },
  async update(id, data) {
    const response = await axiosClient.put(`/voucher/${id}`, data);
    return response;
  },
  async delete(id) {
    const response = await axiosClient.patch(`/voucher/${id}/deleteVoucher`);
    return response;
  },
};

export default voucherAPI;
