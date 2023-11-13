
<template>
<Header
  :carrito="store.totalCarrito"
  :guitarra="guitarra"
  @incrementar-cantidad = "store.incrementarCantidad"
  @decrementar-cantidad = "store.decrementarCantidad"
  @agregar-carrito = "store.agregarCarrito(guitarra)"
  @eliminar-producto="store.eliminarProducto"
  @vaciar-carrito = "store.vaciarCarrito"
></Header>
  <main class="container-xl mt-5">
      <h2 class="text-center">Nuestra Colección</h2>
      <div class="row mt-5">
        <Guitarra 
        v-for="guitarra in guitarras"
        :key="guitarra.id"
        :guitarra="guitarra"
        @agregar-carrito="store.agregarCarrito"
        />
      </div>
  </main>
  <Footer></Footer>
</template>

<script setup>
  import { ref, watch, onMounted} from 'vue';
  import {db} from './data/guitars'
  import Guitarra from './components/Guitarra.vue';
  import Header from './components/Header.vue';
  import Footer from './components/Footer.vue';
  import { useCarritoStore } from './stores/carrito';
  const guitarras = ref([]);
  const guitarra = ref({});
  const store = useCarritoStore();
  onMounted(() =>{
    guitarras.value = db;
    guitarra.value = db[3]
  })
</script>

<style scoped>

</style>

