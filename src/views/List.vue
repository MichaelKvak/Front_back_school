<template>
  <div>
    <div v-if="isLoading">loading...</div>
    <div v-if="hasError">error</div>
    <div v-if="!isLoading && !hasError">
      <div v-for="bank in getBankList" :key="bank._id">
        <span>Bank name - {{ bank.name }}</span> <br />
        <span>Interest rate - {{ bank.rate }}</span> <br />
        <span>Maximum loan - {{ bank.credit }}</span> <br />
        <span>Minimum down payment - {{ bank.payment }}</span
        ><br />
        <span>Loan term - {{ bank.term }}</span>
        <div><button @click="onDelete(bank._id)">delete</button></div>
        <button @click="onEdit(bank._id)">edit</button>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "List",
  computed: {
    ...mapGetters(["getBankList", "isLoading", "hasError"]),
  },
  methods: {
    ...mapActions(["loadBank", "deleteBankCart"]),
    onDelete(id) {
      this.deleteBankCart(id);
    },
    onEdit(id) {
      this.$router.push({ name: "Create", params: { id } });
    },
  },
  mounted() {
    this.loadBank();
  },
};
</script>
