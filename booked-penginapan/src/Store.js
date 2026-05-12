import { reactive, watch } from "vue"

const savedBookings = JSON.parse(localStorage.getItem("bookings") || "[]")
const savedProperties = JSON.parse(localStorage.getItem("properties") || "null")

export const store = reactive({
  properties: savedProperties || [],
  bookings: savedBookings
})

// Simpan properties ke localStorage setiap kali berubah
watch(
  () => [...store.properties],
  (val) => {
    localStorage.setItem("properties", JSON.stringify(val))
  },
  { deep: true }
)

// Simpan bookings ke localStorage setiap kali berubah
watch(
  () => [...store.bookings],
  (val) => {
    localStorage.setItem("bookings", JSON.stringify(val))
  },
  { deep: true }
)
