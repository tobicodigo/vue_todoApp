<template>
  <!-- Toggle switch input -->
  <input
    id="toggle"
    class="toggle"
    type="checkbox"
    role="switch"
    name="toggle"
    value="on"
    :checked="checked"
    v-model="isDone"
    @change="$emit('setDone', isDone)"
  />
  <!-- Label for the toggle switch -->
  <label
    for="toggle"
    class="slot"
    v-bind:style="props.checkmark ? 'display: inline-block;' : 'display: none;'"
  >
    <!-- Checkmark display -->
    <span class="slot__label">&nbsp;</span>

    <span class="slot__label">✔︎</span>
  </label>
</template>

<script setup>
// Importing necessary Vue functions
import { ref } from "vue";

// Defining props and emits for the component
const props = defineProps(["checked", "checkmark"]); // Receiving 'checked' and 'checkmark' props
const emits = defineEmits(["setDone"]); // Emitting 'setDone' event
const isDone = ref(); // Reactive variable for the toggle switch state
</script>

<style scoped>
.toggle,
.toggle:before,
.slot__label,
.curtain {
  transition-property: background-color, transform, visibility;
  transition-duration: 0.25s;
  transition-timing-function: ease-in, cubic-bezier(0.6, 0.2, 0.4, 1.5), linear;
}
.toggle:before,
.slot,
.slot__label {
  display: inline-block;
}
.toggle:before,
.curtain {
  position: absolute;
}
.toggle:checked,
.curtain {
  background-color: rgb(0, 170, 88);
}
.toggle:focus {
  outline: transparent;
}

.toggle {
  border-radius: 0.75em;
  box-shadow: 0 0 0 0.1em inset;
  cursor: pointer;
  position: relative;
  margin-right: 0.25em;
  width: 3em;
  height: 1.5em;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-tap-highlight-color: transparent;
}
.toggle:before {
  background: currentColor;
  border-radius: 50%;
  content: "";
  top: 0.2em;
  left: 0.2em;
  width: 1.1em;
  height: 1.1em;
}
.toggle:checked:before {
  transform: translateX(1.5em);
}

.toggle:checked ~ .slot .slot__label:nth-child(2) {
  opacity: 1;
}

.toggle ~ .slot .slot__label:nth-child(2) {
  opacity: 0;
}

.slot {
  color: rgb(0, 170, 88);
  font-size: 2em;
  font-weight: bold;
  letter-spacing: 0.1em;
  line-height: 1;
  height: 1em;
  -webkit-text-stroke: 0.01em #fff;
}
</style>
