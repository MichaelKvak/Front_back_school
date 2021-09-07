<template>
  <div>
    <div v-if="isLoading">loading...</div>
    <div v-if="hasError">error</div>
    <div v-if="!isLoading && !hasError">
      <div v-for="school in getSchoolList" :key="school._id">
        <span>School subject - {{ school.subject }}</span> <br />
        <span>School teacher - {{ school.teacher }}</span> <br />
        <span>School class - {{ school.class }}</span> <br />
        <span>School timing - {{ school.time }}</span>
        <div><button @click="onDelete(school._id)">delete</button></div>
        <button @click="onEdit(school._id)">edit</button>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Home",
  computed: {
    ...mapGetters(["getSchoolList", "isLoading", "hasError"]),
  },
  methods: {
    ...mapActions(["loadSchool", "deleteSchoolCart"]),
    onDelete(id) {
      this.deleteSchoolCart(id);
    },
    onEdit(id) {
      this.$router.push({ name: "About", params: { id } });
    },
  },
  mounted() {
    this.loadSchool();
  },
};
</script>
