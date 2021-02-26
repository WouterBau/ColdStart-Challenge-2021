<script>
import getAuthUserDetails from '@/functions.js';

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
      this.authInfo = getAuthUserDetails();
    },
  },
};
</script>

<template>
  <div class="auth-link" @click="goAuth">Logout {{ authInfo }}</div>
</template>
