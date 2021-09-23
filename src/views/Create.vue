<template>
  <div>
    <div v-if="isLoading">loading...</div>
    <div v-if="hasError">error</div>
    <div>
      <label>
        Bank name
        <input type="text" v-model="bankName" />
      </label>
      <br />
      <label>
        Interest rate
        <input type="number" v-model.number="bankRate" />
      </label>
      <br />
      <label>
        Maximum loan
        <input type="number" v-model.number="bankCredit" />
      </label>
      <br />
      <label>
        Minimum down payment
        <input type="number" v-model.number="bankPayment" />
      </label>
      <br />
      <label>
        Loan term
        <input type="number" v-model.number="bankTerm" />
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
      bankName: null,
      bankRate: null,
      bankCredit: null,
      bankPayment: null,
      bankTerm: null,
      errorMessage: null,
    };
  },
  computed: {
    ...mapGetters(["isLoading", "hasError"]),
    isDataValid() {
      return (
        this.bankName &&
        this.bankRate &&
        this.bankCredit &&
        this.bankPayment &&
        this.bankTerm
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
    ...mapActions(["createBank", "getBankById", "updateBank"]),
    async onSave() {
      this.errorMessage = "";
      try {
        if (this.isEditing) {
          await this.updateBank({
            bankName: this.bankName,
            bankRate: this.bankRate,
            bankCredit: this.bankCredit,
            bankPayment: this.bankPayment,
            bankTerm: this.bankTerm,
          });
        } else {
          await this.createBank({
            bankName: this.bankName,
            bankRate: this.bankRate,
            bankCredit: this.bankCredit,
            bankPayment: this.bankPayment,
            bankTerm: this.bankTerm,
          });
        }
        this.$router.push({ name: "List" });
      } catch {
        this.errorMessage = "Saving error";
      }
    },
  },
  async mounted() {
    if (this.isEditing) {
      try {
        const editedObj = await this.getBankById(this.$route.params.id);
        this.bankName = editedObj.name;
        this.bankRate = editedObj.rate;
        this.bankCredit = editedObj.credit;
        this.bankPayment = editedObj.payment;
        this.bankTerm = editedObj.term;
      } catch {
        this.errorMessage = "edited error";
      }
    }
  },
};
</script>
<style scoped></style>
