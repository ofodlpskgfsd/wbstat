<template>
  <input
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="disabled"
      @input="$emit('update:modelValue', $event.target.value)"
      class="base-input"
  />
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.base-input {
  padding: 8px 10px;
  border: 1px solid #55557d;
  border-radius: 6px;
  background-color: #3a3a57;
  color: #ffffff;
  min-width: 180px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
}

.base-input::placeholder {
  color: #a0a0c0;
}

.base-input:focus {
  outline: none;
  border-color: #7c5cff;
  box-shadow: 0 0 8px #7c5cff88;
  background-color: #404070;
  color: #ffffff;
}
</style>
