<template>
  <div>
    <div v-if="isLoading">loading...</div>
    <div v-if="hasError">error</div>
    <b-field label="Initial loan" type="is-not-success">
      <b-input
        placeholder="Enter initial loan"
        v-model.number="initialLoan"
      ></b-input>
    </b-field>
    <b-field label="Down payment" type="is-not-success">
      <b-input
        placeholder="Enter down payment"
        v-model.number="downPayment"
      ></b-input>
    </b-field>
    <b-field label="Select bank">
      <b-select placeholder="Select bank" v-model="selectedBank">
        <option v-for="item in getBankList" :key="item.id" :value="item._id">
          {{ item.name }}
        </option>
      </b-select>
    </b-field>

    <b-field label="Number of monthly payments" type="is-not-success">
      <b-input
        placeholder="Enter number of monthly payments"
        v-model.number="Monthpayment"
      ></b-input>
    </b-field>
    <b-button rounded @click="onCalculate">Calculate</b-button>
    <hr />
    <span> result - {{ monthPay }}</span>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Calculator",
  data() {
    return {
      initialLoan: null,
      Monthpayment: null,
      downPayment: null,

      monthPay: null,

      selectedBank: null,
      bankName: null,
      bankRate: null,
      bankCredit: null,
      bankPayment: null,
      bankTerm: null,
      error: null,
    };
  },
  computed: {
    ...mapGetters(["getBankList", "isLoading", "hasError"]),
  },
  methods: {
    ...mapActions(["loadBank", "getBankById", "findBankById"]),
    async onCalculate() {
      if (this.selectedBank) {
        const resData = await this.getBankById(this.selectedBank);
        this.bankName = resData.bankName;
        this.bankRate = resData.bankRate;
        this.bankCredit = resData.bankCredit;
        this.bankPayment = resData.bankPayment;
        this.bankTerm = resData.bankTerm;
      }

      // this.monthPay = this.initialLoan + this.downPayment + this.payment;
      this.monthPay = (
        (this.initialLoan *
          (this.bankRate / 12) *
          Math.pow(1 + this.bankRate / 12, this.bankPayment)) /
        (Math.pow(1 + this.bankRate / 12, this.bankPayment) - 1)
      ).toFixed(2);
    },
  },
  mounted() {
    this.loadBank();
  },
};
</script>
