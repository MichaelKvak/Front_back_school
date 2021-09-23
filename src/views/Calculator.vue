<template>
  <div>
    <div v-if="isLoading">loading...</div>
    <div v-if="hasError">error</div>
    <b-field label="Select credit" type="is-not-success">
      <b-input placeholder="Success"></b-input>
    </b-field>
    <b-field label="Success" type="is-not-success">
      <b-input placeholder="Success"></b-input>
    </b-field>
    <b-field label="Select bank">
      <b-select placeholder="Select a name">
        <option v-for="bank in getBankList" :key="bank._id">
          {{ bank.name }}
        </option>
      </b-select>
    </b-field>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Calculator",
  computed: {
    ...mapGetters(["getBankList", "isLoading", "hasError"]),
  },
  methods: {
    ...mapActions(["loadBank"]),
  },
  mounted() {
    this.loadBank();
  },
};
</script>
