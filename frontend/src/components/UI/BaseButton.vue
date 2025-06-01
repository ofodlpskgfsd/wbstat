<template>
  <button
      :class="buttonClass"
      :disabled="disabled"
      @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    variant: {
      type: String,
      default: 'primary', // 'primary' | 'secondary'
      validator: (val) => ['primary', 'secondary'].includes(val)
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    buttonClass() {
      return {
        'btn-primary': this.variant === 'primary' && !this.disabled,
        'btn-secondary': this.variant === 'secondary' && !this.disabled,
        'btn-secondary:disabled': this.disabled && this.variant === 'secondary',
        'btn-primary:disabled': this.disabled && this.variant === 'primary'
      };
    }
  }
};
</script>

<style scoped>
button {
  padding: 10px 18px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.25s ease;
  min-width: 140px;
}

.btn-primary {
  background-color: #7c5cff;
  color: #fff;
  box-shadow: 0 0 10px #7c5cffaa;
}

.btn-primary:hover:not(:disabled) {
  background-color: #6a4fff;
}

.btn-secondary {
  background-color: #55557d;
  color: #ccc;
}

.btn-secondary:disabled {
  background-color: #444466;
  cursor: not-allowed;
  color: #8888aa;
}

.btn-secondary:hover:not(:disabled) {
  background-color: #6a6aba;
  color: white;
}
</style>
