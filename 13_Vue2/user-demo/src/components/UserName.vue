<template>
  <div class="user-name">
    <span v-if="status === 'loading'">loading...</span>
    <template v-else-if="status === 'login'">
      <router-link to="/user">{{ user.name }}</router-link>
      <a href="" @click.prevent="handleLogout">退出</a>
    </template>
    <router-link v-else to="/login" exact-path>Login</router-link>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState("loginUser", ["user"]),
    ...mapGetters("loginUser", ["status"]),
  },
  methods: {
    async handleLogout() {
      await this.$store.dispatch("loginUser/logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="less" scoped>
.user-name {
  display: inline-block;

  a,
  span {
    margin: 5px;
  }
}
</style>