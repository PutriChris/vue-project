<template>
  <div class="container">
    <h1>Booking History</h1>

    <div v-if="bookings.length">
      <div v-for="(item, index) in bookings" :key="index" class="item">
        <div class="item-info">
          <p><b>{{ item.name }}</b> booking {{ item.property }}</p>
          <p>{{ item.checkIn }} - {{ item.checkOut }}</p>
        </div>
        <button class="btn-hapus" @click="hapusBooking(index)">Hapus</button>
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
  },
  methods: {
    hapusBooking(index) {
      store.bookings.splice(index, 1)
      localStorage.setItem("bookings", JSON.stringify(store.bookings))
    }
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
  font-size: 16px;
}

.container h1 {
  font-size: 28px;
}

.item {
  background: #ecf0f1;
  margin-top: 10px;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-info {
  flex: 1;
}

.item-info p {
  margin: 2px 0;
  font-size: 16px;
}

.item-info p:first-child {
  font-size: 18px;
}

.btn-hapus {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 6px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  margin-left: 12px;
}

.btn-hapus:hover {
  background: #c0392b;
}
</style>
