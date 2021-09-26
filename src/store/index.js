import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import apiEndpoints from "../constants/apiEndpoints.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bankList: [],
    editedObj: null,
    loading: false,
    error: null,
  },
  getters: {
    getBankList: (state) => state.bankList,
    getEditedObj: (state) => state.editedObj,
    isLoading: (state) => state.loading,
    hasError: (state) => state.error,
  },
  mutations: {
    deleteBank(state, bankId) {
      state.bankList = state.bankList.filter((item) => item._id !== bankId);
    },
    setEditedObj(state, obj) {
      state.editedObj = obj;
    },
    setBankList(state, list) {
      state.bankList = list;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    loadBank({ commit }) {
      commit("setLoading", true);
      commit("setError", null);
      axios
        .get(apiEndpoints.banks.readList)
        .then((res) => res.data)
        .then((resData) => {
          if (resData.success) commit("setBankList", resData.data);
          else throw new Error("Fetch failed!");
        })
        .catch((err) => {
          commit("setError", err);
        })
        .finally(() => commit("setLoading", false));
    },
    createBank(
      { commit },
      { bankName, bankRate, bankCredit, bankPayment, bankTerm }
    ) {
      commit("setLoading", true);
      commit("setError", null);
      return new Promise((resolve, reject) => {
        axios
          .post(apiEndpoints.banks.create, {
            bankName,
            bankRate,
            bankCredit,
            bankPayment,
            bankTerm,
          })
          .then((res) => res.data)
          .then((resData) => {
            if (resData.success) resolve(true);
            else throw new Error("Fetch failed!");
          })
          .catch((err) => {
            commit("setError", err);
            reject(err);
          })
          .finally(() => commit("setLoading", false));
      });
    },

    getBankById({ commit }, bankId) {
      commit("setLoading", true);
      commit("setError", null);
      return new Promise((resolve, reject) => {
        axios
          .get(apiEndpoints.banks.getBankById(bankId))
          .then((res) => res.data)
          .then((resData) => {
            if (resData.success) {
              commit("setEditedObj", resData.data);
              resolve(resData.data);
            } else throw new Error("Fetch failed!");
          })
          .catch((err) => {
            commit("setError", err);
            reject(err);
          })
          .finally(() => commit("setLoading", false));
      });
    },
    deleteBankCart({ commit }, bankId) {
      commit("setLoading", true);
      commit("setError", null);

      axios
        .delete(apiEndpoints.banks.delete, {
          bankId,
        })
        .then((res) => res.data)
        .then((resData) => {
          if (resData.success) commit("deleteBank", bankId);
          else throw new Error("Fetch failed!");
        })
        .catch((err) => {
          commit("setError", err);
        })
        .finally(() => commit("setLoading", false));
    },
    findBankById({ commit }, bankId) {
      commit("setLoading", true);
      commit("setError", null);
      return new Promise((resolve, reject) => {
        axios
          .get(apiEndpoints.banks.findBankById(bankId))
          .then((res) => res.data)
          .then((resData) => {
            if (resData.success) resolve(resData.data);
          })
          .catch((err) => {
            commit("hasError", err);
            reject(err);
          })
          .finally(() => commit("setLoading", false));
      });
    },

    updateBank(
      { commit, state },
      { bankName, bankRate, bankCredit, bankPayment, bankTerm }
    ) {
      commit("setLoading", true);
      commit("setError", null);
      return new Promise((resolve, reject) => {
        axios
          .put(apiEndpoints.banks.update, {
            bankId: state.editedObj._id,
            bankName,
            bankRate,
            bankCredit,
            bankPayment,
            bankTerm,
          })
          .then((res) => res.data)
          .then((resData) => {
            if (resData.success) resolve(true);
            else throw new Error("Fetch failed!");
          })
          .catch((err) => {
            commit("setError", err);
            reject(err);
          })
          .finally(() => commit("setLoading", false));
      });
    },
  },
  modules: {},
});
