<script>
import getUserInfo from '@/assets/js/userinfo.js';

export default {
  name: 'AuthLogout',
  data() {
    return {
      authInfo: null,
    };
  },
  created() {
    this.getAuthInfo();
  },
  methods: {
    goAuth() {
      const { pathname } = window.location;
      const redirect = `post_logout_redirect_uri=${pathname}`;
      const url = `/.auth/logout?${redirect}`;
      window.location.href = url;
    },
    getAuthInfo() {
      this.authInfo = getUserInfo();
    },
  },
};
</script>

<template>
  <div class="auth-link" @click="goAuth">Logout {{ authInfo.userDetails }}</div>
</template>
