<template>
  <div>
    <div v-if="isLoading">loading...</div>
    <div v-if="hasError">error</div>
    <b-field label="Initial loan" type="is-not-success">
      <b-input placeholder="Enter initial loan" v-model.number="p"></b-input>
    </b-field>
    <b-field label="Down payment" type="is-not-success">
      <b-input
        placeholder="Enter down payment"
        v-model.number="downPay"
      ></b-input>
    </b-field>
    <b-field label="Select bank">
      <b-select placeholder="Select bank">
        <option v-for="bank in getBankList" :key="bank._id">
          {{ bank.name }}
        </option>
      </b-select>
    </b-field>

    <b-field label="Number of monthly payments" type="is-not-success">
      <b-input
        placeholder="Enter number of monthly payments"
        v-model.number="n"
      ></b-input>
    </b-field>
    <b-button rounded @click="calculate">Calculate</b-button>
    <hr />
    <div>monthly payment - {{ monthPay }}</div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Calculator",
  data() {
    return {
      p: null,
      n: null,
      downPay: null,
      monthPay: null,
      selectBank: [],
    };
  },
  computed: {
    ...mapGetters(["getBankList", "isLoading", "hasError"]),
  },
  methods: {
    ...mapActions(["loadBank", "getBankById"]),
    calculate() {
      return (this.monthPay =
        (this.p *
          (this.bank.rate / 12) *
          Math.pow(1 + this.rate / 12, this.n)) /
        (Math.pow(1 + this.rate / 12, this.n) - 1));
    },
  },
  mounted() {
    this.loadBank();
  },
};
</script>
