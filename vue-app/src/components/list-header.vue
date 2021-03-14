<script>
export default {
  name: 'ListHeader',
  props: {
    title: {
      type: String,
      default: () => '',
    },
    routePath: {
      type: String,
      default: () => '',
    },
    showAdd: {
      type: Boolean,
      default: () => true,
    },
  },
  methods: {
    handleAdd() {
      this.$emit('add');
    },
    handleRefresh() {
      this.$emit('refresh');
    },
  },
};
</script>

<template>
  <div class="content-title-group">
    <h2 class="title" v-if="routePath === ''">{{ title }}</h2>
    <router-link :to="routePath" v-else>
      <h2 class="title">{{ title }}</h2>
    </router-link>
    <button
      class="button refresh-button"
      @click="handleRefresh"
      aria-label="refresh"
    >
      <i class="fas fa-sync" aria-hidden="true"></i>
    </button>
  </div>
</template>
