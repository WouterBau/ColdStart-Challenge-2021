<script>
import ButtonFooter from '@/components/button-footer.vue';

export default {
  name: 'CardContent',
  components: {
    ButtonFooter,
  },
  props: {
    id: {
      type: String,
      default: () => '',
    },
    name: {
      type: String,
      default: () => '',
    },
    description: {
      type: String,
      default: () => '',
    },
    imageurl: {
      type: String,
      default: () => '',
    },
    showOrderButton: {
      type: Boolean,
      default: () => false,
    },
  },
  methods: {
  },
};
</script>

<template>
  <div class="card-content">
    <header class="card-header">
      <p class="card-header-title">{{ name }}</p>
    </header>

    <div class="content">
      <div class="catalog-image">
        <img v-bind:src="imageurl" />
      </div>
      <p class="description">{{ description }}</p>
    </div>

    <ButtonFooter
      :label="'Pre-order'"
      :iconClasses="'shopping-cart'"
    />

  </div>
</template>
