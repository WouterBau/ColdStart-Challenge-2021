<script>
import ButtonFooter from '@/components/button-footer.vue';
import axios from 'axios';
import API from '@/store/config';

export default {
  name: 'CardContent',
  components: {
    ButtonFooter,
  },
  props: {
    id: {
      type: Number,
      default: () => 0,
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
    eventId: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      buttonLabel: 'Pre-order',
    };
  },
  methods: {
    async postPreOrder() {
      try {
        const response = await axios.post(`${API}/orders`, { id: this.id, eventId: this.eventId });
        if (response.status === 201) {
          this.buttonLabel = `Succesful Pre-order with ID: ${response.data}`;
        } else {
          this.buttonLabel = `Unexpected status: ${response.status}`;
        }
      } catch (err) {
        this.buttonLabel = `Failed status: ${err.response.status}`;
      }
    },
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
      :label="buttonLabel"
      :iconClasses="'shopping-cart'"
      @clicked="postPreOrder"
      v-if="showOrderButton"
    />

  </div>
</template>
