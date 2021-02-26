<script>
import HeaderBarBrand from '@/components/header-bar-brand.vue';
import AuthLogin from '@/components/auth-login.vue';
import AuthLogout from '@/components/auth-logout.vue';
import getUserInfo from '@/assets/js/userinfo.js';

export default {
  name: 'HeaderBar',
  components: {
    HeaderBarBrand,
    AuthLogin,
    AuthLogout,
  },
  data() {
    return {
      isAuthenticated: false,
    };
  },
  created() {
    this.getAuthInfo();
  },
  methods: {
    getAuthInfo() {
      this.isAuthenticated = getUserInfo() !== null;
    },
  },
};
</script>

<template>
  <header>
    <nav class="navbar is-white" role="navigation" aria-label="main navigation">
      <HeaderBarBrand></HeaderBarBrand>
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item nav-home" to="/">Home</router-link>
          <router-link class="navbar-item nav-home" to="/" v-if="!isAuthenticated">
            <AuthLogin provider="github" />
          </router-link>
          <router-link class="navbar-item nav-home" to="/" v-if="!isAuthenticated">
            <AuthLogin provider="twitter" />
          </router-link>
          <router-link class="navbar-item nav-home" to="/" v-if="!isAuthenticated">
            <AuthLogin provider="facebook" />
          </router-link>
          <router-link class="navbar-item nav-home" to="/" v-if="isAuthenticated">
            <AuthLogout />
          </router-link>
          {{ authInfo }}
        </div>
      </div>
    </nav>
  </header>
</template>
