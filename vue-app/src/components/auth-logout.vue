<script>
import getUserInfo from '@/assets/js/userInfo';

export default {
  name: 'AuthLogout',
  data() {
    return {
      userDetails: '',
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
      const authInfo = await getUserInfo();
      if (!(authInfo === undefined || authInfo === null)) {
        this.userDetails = authInfo.userDetails;
      } else {
        this.userDetails = '';
      }
    },
  },
};
</script>

<template>
  <div class="auth-link" @click="goAuth">Logout {{ userDetails }}</div>
</template>
