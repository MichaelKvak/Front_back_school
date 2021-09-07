import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    schoolList: [],
    editedObj: null,
    loading: false,
    error: null,
  },
  getters: {
    getSchoolList: (state) => state.schoolList,
    getEditedObj: (state) => state.editedObj,
    isLoading: (state) => state.loading,
    hasError: (state) => state.error,
  },
  mutations: {
    deleteSchool(state, schoolId) {
      state.schoolList = state.schoolList.filter(
        (item) => item._id !== schoolId
      );
    },
    setEditedObj(state, obj) {
      state.editedObj = obj;
    },
    setSchoolList(state, list) {
      state.schoolList = list;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    loadSchool({ commit }) {
      commit("setLoading", true);
      commit("setError", null);
      axios
        .get("http://localhost:3000/school")
        .then((res) => res.data)
        .then((resData) => {
          if (resData.success) commit("setSchoolList", resData.data);
          else throw new Error("Fetch failed!");
        })
        .catch((err) => {
          commit("setError", err);
        })
        .finally(() => commit("setLoading", false));
    },

    deleteSchoolCart({ commit }, schoolId) {
      commit("setLoading", true);
      commit("setError", null);

      axios
        .delete("http://localhost:3000/school", {
          schoolId,
        })
        .then((res) => res.data)
        .then((resData) => {
          if (resData.success) commit("deleteSchool", schoolId);
          else throw new Error("Fetch failed!");
        })
        .catch((err) => {
          commit("setError", err);
        })
        .finally(() => commit("setLoading", false));
    },

    createSchool(
      { commit },
      { schoolSubject, schoolTeacher, schoolClass, schoolTime }
    ) {
      commit("setLoading", true);
      commit("setError", null);
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:3000/school/add", {
            schoolSubject,
            schoolTeacher,
            schoolClass,
            schoolTime,
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

    getSchoolById({ commit }, schoolId) {
      commit("setLoading", true);
      commit("setError", null);
      return new Promise((resolve, reject) => {
        axios
          .get(`http://localhost:3000/school/${schoolId}`)
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

    updateSchool(
      { commit, state },
      { schoolSubject, schoolTeacher, schoolClass, schoolTime }
    ) {
      commit("setLoading", true);
      commit("setError", null);
      return new Promise((resolve, reject) => {
        axios
          .put("http://localhost:3000/school/update", {
            schoolId: state.editedObj._id,
            schoolSubject,
            schoolTeacher,
            schoolClass,
            schoolTime,
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
