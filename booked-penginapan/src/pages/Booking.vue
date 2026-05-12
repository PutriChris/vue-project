<template>
  <div class="container">
    <h1>Booking History</h1>

    <div v-if="bookings.length">
      <div v-for="(item, index) in bookings" :key="index" class="item">
        <p><b>{{ item.name }}</b> booking {{ item.property }}</p>
        <p>{{ item.checkIn }} - {{ item.checkOut }}</p>
      </div>
    </div>

    <p v-else>Belum ada booking</p>
  </div>
</template>

<script>
import { store } from "../Store"

export default {
  name: "Booking",
  computed: {
    bookings() {
      return store.bookings
    }
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
}

.item {
  background: #ecf0f1;
  margin-top: 10px;
  padding: 10px;
  border-radius: 8px;
}
</style>
