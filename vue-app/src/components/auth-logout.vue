<script>
import getUserInfo from '@/assets/js/userInfo';

export default {
  name: 'AuthLogout',
  data() {
    return {
      authInfo: null,
    };
  },
  async created() {
    await this.getAuthInfo();
  },
  methods: {
    goAuth() {
      const { pathname } = window.location;
      const redirect = `post_logout_redirect_uri=${pathname}`;
      const url = `/.auth/logout?${redirect}`;
      window.location.href = url;
    },
    async getAuthInfo() {
      this.authInfo = await getUserInfo();
    },
  },
};
</script>

<template>
  <div class="auth-link" @click="goAuth">Logout {{ authInfo.userDetails }}</div>
</template>
