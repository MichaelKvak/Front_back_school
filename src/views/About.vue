<template>
  <div>
    <div v-if="isLoading">loading...</div>
    <div v-if="hasError">error</div>
    <div>
      <label>
        school subject
        <input type="text" v-model="schoolSubject" />
      </label>
      <br />
      <label>
        school teacher
        <input type="text" v-model="schoolTeacher" />
      </label>
      <br />
      <label>
        school class
        <input type="text" v-model="schoolClass" />
      </label>
      <br />
      <label>
        school timing
        <input type="number" v-model.number="schoolTime" />
      </label>
      <div>
        <button @click="onSave" :disabled="!isDataValid">{{ saveBtn }}</button>
      </div>
      <div v-if="errorMessage">{{ errorMessage }}</div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "About",
  data() {
    return {
      schoolSubject: null,
      schoolTeacher: null,
      schoolClass: null,
      schoolTime: null,
      errorMessage: null,
    };
  },
  computed: {
    ...mapGetters(["isLoading", "hasError"]),
    isDataValid() {
      return (
        this.schoolSubject &&
        this.schoolTeacher &&
        this.schoolClass &&
        this.schoolTime
      );
    },
    isEditing() {
      return !!this.$route.params.id;
    },
    saveBtn() {
      return this.isEditing ? "save" : "create";
    },
  },
  methods: {
    ...mapActions(["createSchool", "getSchoolById", "updateSchool"]),
    async onSave() {
      this.errorMessage = "";
      try {
        if (this.isEditing) {
          await this.updateSchool({
            schoolSubject: this.schoolSubject,
            schoolTeacher: this.schoolTeacher,
            schoolClass: this.schoolClass,
            schoolTime: this.schoolTime,
          });
        } else {
          await this.createSchool({
            schoolSubject: this.schoolSubject,
            schoolTeacher: this.schoolTeacher,
            schoolClass: this.schoolClass,
            schoolTime: this.schoolTime,
          });
        }
        this.$router.push({ name: "Home" });
      } catch {
        this.errorMessage = "Saving error";
      }
    },
  },
  async mounted() {
    if (this.isEditing) {
      try {
        const editedObj = await this.getSchoolById(this.$route.params.id);
        this.schoolSubject = editedObj.subject;
        this.schoolTeacher = editedObj.teacher;
        this.schoolClass = editedObj.class;
        this.schoolTime = editedObj.time;
      } catch {
        this.errorMessage = "edited error";
      }
    }
  },
};
</script>
<style scoped></style>
