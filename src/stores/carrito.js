import { defineStore } from 'pinia';

export const useCarritoStore = defineStore('carrito', {
  state: () => ({
    carrito: []
  }),
  actions: {
    agregarCarrito(guitarra) {
      const existeCarrito = this.carrito.findIndex(producto => producto.id === guitarra.id);
      if (existeCarrito >= 0) {
        this.carrito[existeCarrito].cantidad++;
      } else {
        guitarra.cantidad = 1;
        this.carrito.push(guitarra);
      }
    },
    vaciarCarrito() {
      this.carrito = [];
    },
    eliminarProducto(id) {
      this.carrito = this.carrito.filter(producto => producto.id !== id);
    },
    decrementarCantidad  (id) {
      const index = this.carrito.findIndex(producto => producto.id === id);
      if(this.carrito[index].cantidad <= 1) return;
      this.carrito[index].cantidad--;
    },
    incrementarCantidad (id) {
      const index = this.carrito.findIndex(producto => producto.id === id);
      if(this.carrito[index].cantidad >= 5) return;
      this.carrito[index].cantidad++;
    }
  },
  getters: {
    totalCarrito() {
      return this.carrito;
    }
  }
});
