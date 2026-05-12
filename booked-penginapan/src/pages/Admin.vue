<template>
  <div class="container">
    <h1>Admin Panel</h1>

    <div class="form-card">
      <h2>{{ editId ? 'Edit Penginapan' : 'Tambah Penginapan' }}</h2>

      <div class="form">
        <input v-model="name" placeholder="Nama Penginapan" />
        <input v-model="price" placeholder="Harga (angka, contoh: 350000)" type="number" />
        <input v-model="description" placeholder="Deskripsi singkat" />
        <input v-model="image" placeholder="Nama gambar (contoh: hotel.jpg)" />
        <p v-if="formError" class="error">{{ formError }}</p>

        <div class="form-actions">
          <button @click="submitForm">{{ editId ? 'Simpan Perubahan' : 'Tambah' }}</button>
          <button v-if="editId" class="cancel" @click="cancelEdit">Batal</button>
        </div>
      </div>
    </div>

    <h2>Daftar Penginapan</h2>
    <div class="card-list">
      <div class="card" v-for="item in properties" :key="item.id">
        <img :src="item.image" />
        <div class="card-content">
          <h3>{{ item.name }}</h3>
          <p class="desc">{{ item.description }}</p>
          <p class="price">{{ formatHarga(item.price) }}</p>

          <div class="card-actions">
            <button class="edit" @click="editProperty(item)">Edit</button>
            <button class="delete" @click="deleteProperty(item.id)">Hapus</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "../Store"

export default {
  data() {
    return {
      editId: null,
      name: "",
      price: "",
      description: "",
      image: "",
      formError: ""
    }
  },

  computed: {
    properties() {
      return store.properties
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

    submitForm() {
      this.formError = ""

      if (!this.name.trim() || !this.price || !this.description.trim() || !this.image.trim()) {
        this.formError = "Semua field harus diisi!"
        return
      }

      if (this.editId) {
        const idx = store.properties.findIndex(p => p.id === this.editId)
        if (idx !== -1) {
          store.properties[idx] = {
            id: this.editId,
            name: this.name,
            price: Number(this.price),
            description: this.description,
            image: this.image.startsWith("http") ? this.image : "/Images/" + this.image
          }
        }
        this.cancelEdit()
      } else {
        store.properties.push({
          id: Date.now(),
          name: this.name,
          price: Number(this.price),
          description: this.description,
          image: this.image.startsWith("http") ? this.image : "/Images/" + this.image
        })
        this.name = ""
        this.price = ""
        this.description = ""
        this.image = ""
      }
    },

    editProperty(item) {
      this.editId = item.id
      this.name = item.name
      this.price = item.price
      this.description = item.description || ""
      this.image = item.image
      this.formError = ""
      window.scrollTo({ top: 0, behavior: "smooth" })
    },

    cancelEdit() {
      this.editId = null
      this.name = ""
      this.price = ""
      this.description = ""
      this.image = ""
      this.formError = ""
    },

    deleteProperty(id) {
      const item = store.properties.find(p => p.id === id)
      if (confirm(`Hapus "${item?.name}"? Tindakan ini tidak bisa dibatalkan.`)) {
        store.properties = store.properties.filter(item => item.id !== id)
      }
    }
  }
}
</script>

<style scoped>
.container {
  padding: 30px;
}

.form-card {
  background: white;
  border-radius: 12px;
  padding: 20px 24px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.08);
  margin-bottom: 30px;
  max-width: 400px;
}

.form-card h2 {
  margin: 0 0 14px;
  font-size: 18px;
  color: #2c3e50;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}

.form-actions {
  display: flex;
  gap: 10px;
}

button {
  padding: 10px 18px;
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: 0.2s;
}

button:hover {
  opacity: 0.85;
}

button.cancel {
  background: #95a5a6;
}

.error {
  color: #e74c3c;
  font-size: 13px;
}

.card-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 10px;
}

.card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  width: 220px;
}

.card img {
  width: 100%;
  height: 140px;
  object-fit: cover;
}

.card-content {
  padding: 12px;
}

.card-content h3 {
  margin: 0 0 4px;
  font-size: 15px;
  color: #2c3e50;
}

.desc {
  font-size: 12px;
  color: #888;
  margin-bottom: 6px;
}

.price {
  font-weight: bold;
  color: #27ae60;
  font-size: 14px;
  margin-bottom: 10px;
}

.card-actions {
  display: flex;
  gap: 8px;
}

button.edit {
  background: #2980b9;
  padding: 6px 12px;
  font-size: 13px;
}

button.delete {
  background: #e74c3c;
  padding: 6px 12px;
  font-size: 13px;
}
</style>
