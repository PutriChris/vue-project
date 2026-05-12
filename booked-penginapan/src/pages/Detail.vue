<template>
  <div class="container">
    <h1>Detail Penginapan</h1>

    <div v-if="property" class="detail">
      <img :src="property.image" alt="" />

      <div class="info">
        <h2>{{ property.name }}</h2>
        <p class="desc">{{ property.description }}</p>
        <p class="price">{{ formatHarga(property.price) }} / malam</p>

        <div class="form">
          <label>Nama Anda</label>
          <input type="text" placeholder="Masukkan nama" v-model="name" />

          <label>Check-in</label>
          <input type="date" v-model="checkIn" :min="todayDate" />

          <label>Check-out</label>
          <input type="date" v-model="checkOut" :min="minCheckOut" />

          <div v-if="totalMalam > 0" class="summary">
            <p>{{ totalMalam }} malam × {{ formatHarga(property.price) }}</p>
            <p class="total">Total: <strong>{{ formatHarga(totalHarga) }}</strong></p>
          </div>

          <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

          <button @click="handleBooking">Booking Sekarang</button>

          <p v-if="successMessage" class="success">{{ successMessage }}</p>
        </div>

        <div class="booking-list" v-if="bookings.length">
          <h3>Riwayat Booking</h3>
          <div v-for="(item, index) in bookings" :key="index" class="booking-item">
            <p><b>{{ item.name }}</b></p>
            <p>{{ item.checkIn }} → {{ item.checkOut }} ({{ item.totalMalam }} malam)</p>
            <p class="total-item">Total: {{ formatHarga(item.totalHarga) }}</p>
          </div>
        </div>
      </div>
    </div>

    <p v-else class="not-found">Penginapan tidak ditemukan.</p>
  </div>
</template>

<script>
import { store } from "../Store"

export default {
  data() {
    return {
      name: "",
      checkIn: "",
      checkOut: "",
      successMessage: "",
      errorMessage: ""
    }
  },

  computed: {
    property() {
      const id = parseInt(this.$route.params.id)
      return store.properties.find(item => item.id === id)
    },
    bookings() {
      return store.bookings.filter(b => b.property === this.property?.name)
    },
    todayDate() {
      return new Date().toISOString().split("T")[0]
    },
    minCheckOut() {
      if (!this.checkIn) return this.todayDate
      const next = new Date(this.checkIn)
      next.setDate(next.getDate() + 1)
      return next.toISOString().split("T")[0]
    },
    totalMalam() {
      if (!this.checkIn || !this.checkOut) return 0
      const diff = new Date(this.checkOut) - new Date(this.checkIn)
      return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)))
    },
    totalHarga() {
      if (!this.property || !this.totalMalam) return 0
      return this.property.price * this.totalMalam
    }
  },

  mounted() {
    if (store.properties.length === 0) {
      fetch("/properties.json")
        .then(res => res.json())
        .then(data => { store.properties = data })
    }
  },

  methods: {
    formatHarga(num) {
      return "Rp " + Number(num).toLocaleString("id-ID")
    },

    handleBooking() {
      this.errorMessage = ""

      if (!this.name || !this.checkIn || !this.checkOut) {
        this.errorMessage = "Harap isi semua data!"
        return
      }
      if (this.checkOut <= this.checkIn) {
        this.errorMessage = "Tanggal check-out harus setelah check-in!"
        return
      }

      store.bookings.push({
        name: this.name,
        checkIn: this.checkIn,
        checkOut: this.checkOut,
        property: this.property.name,
        totalMalam: this.totalMalam,
        totalHarga: this.totalHarga
      })

      this.successMessage = `Booking berhasil! Total ${this.totalMalam} malam.`
      setTimeout(() => { this.successMessage = "" }, 3000)

      this.name = ""
      this.checkIn = ""
      this.checkOut = ""
    }
  }
}
</script>

<style scoped>
.container {
  padding: 40px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.detail {
  display: flex;
  gap: 40px;
  align-items: flex-start;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.detail img {
  width: 400px;
  height: 250px;
  object-fit: cover;
  border-radius: 12px;
  flex-shrink: 0;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.info h2 {
  font-size: 28px;
  color: #2c3e50;
  margin: 0;
}

.desc {
  color: #666;
  font-size: 15px;
}

.price {
  font-size: 22px;
  font-weight: bold;
  color: #27ae60;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
}

label {
  font-size: 13px;
  font-weight: 600;
  color: #555;
}

input {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
}

.summary {
  background: #f0faf4;
  border: 1px solid #b7e4c7;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 14px;
  color: #333;
}

.total {
  font-size: 16px;
  margin-top: 4px;
}

button {
  width: 200px;
  padding: 12px;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 4px;
}

button:hover {
  background-color: #1a252f;
}

.error {
  color: #e74c3c;
  font-size: 13px;
}

.success {
  color: #27ae60;
  font-size: 14px;
}

.booking-list {
  margin-top: 20px;
  border-top: 1px solid #eee;
  padding-top: 15px;
}

.booking-list h3 {
  margin: 0 0 10px;
  color: #2c3e50;
}

.booking-item {
  background: #f5f7fa;
  border-radius: 8px;
  padding: 10px 14px;
  margin-bottom: 8px;
  font-size: 14px;
}

.total-item {
  color: #27ae60;
  font-weight: bold;
}

.not-found {
  color: #888;
  font-size: 16px;
}
</style>
