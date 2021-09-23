export default {
  banks: {
    readList: `${process.env.VUE_APP_API_URL}/bank`,
    create: `${process.env.VUE_APP_API_URL}/bank/add`,
    update: `${process.env.VUE_APP_API_URL}/bank/update`,
    delete: `${process.env.VUE_APP_API_URL}/bank`,
    getBankById: (bankId) => `${process.env.VUE_APP_API_URL}/bank/${bankId}`,
  },
};
