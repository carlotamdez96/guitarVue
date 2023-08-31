
<template>
<Header
  :carrito="carrito"
  :guitarra="guitarra"
  @incrementar-cantidad = "incrementarCantidad"
  @decrementar-cantidad = "decrementarCantidad"
  @agregar-carrito = "agregarCarrito"
  @eliminar-producto="eliminarProducto"
  @vaciar-carrito = "vaciarCarrito"
></Header>
  <main class="container-xl mt-5">
      <h2 class="text-center">Nuestra Colección</h2>
      <div class="row mt-5">
        <Guitarra 
        v-for="guitarra in guitarras"
        :key="guitarra.id"
        :guitarra="guitarra"
        @agregar-carrito="agregarCarrito"
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

  const guitarras = ref([]);
  const carrito = ref([]);
  const guitarra = ref({});

  //Observa los cambios en un state(en carrito) y cuando detecte un cambio hará lo siguiente
  watch(carrito, () => {
    guardarLocalStorage();
  },{
    deep:true
  })
  //once the component is mounted it will do the following
  onMounted(() =>{
    guitarras.value = db;
    guitarra.value = db[3]

    const carritoStorage = localStorage.getItem('carrito');
    if(carritoStorage){
      carrito.value = JSON.parse(carritoStorage);
    }
  })

  const agregarCarrito = (guitarra) =>{
    const existeCarrito = carrito.value.findIndex(producto => producto.id === guitarra.id);
    if(existeCarrito >= 0){
      carrito.value[existeCarrito].cantidad ++;
    }else{
      guitarra.cantidad = 1;
      carrito.value.push(guitarra);
    }

  };

  const decrementarCantidad = (id) => {
    const index = carrito.value.findIndex(producto => producto.id === id);
    if(carrito.value[index].cantidad <= 1) return;
    carrito.value[index].cantidad--;

  }
  const incrementarCantidad = (id) => {
    const index = carrito.value.findIndex(producto => producto.id === id);
    if(carrito.value[index].cantidad >= 5) return;
    carrito.value[index].cantidad++;

  }
  
  const eliminarProducto = (id) => {
    carrito.value = carrito.value.filter(producto => producto.id !== id);

  }

  const vaciarCarrito = () => {
    carrito.value = [];
  }

  const guardarLocalStorage = () => {
    localStorage.setItem('carrito',JSON.stringify(carrito.value));
  }
</script>

<style scoped>

</style>

