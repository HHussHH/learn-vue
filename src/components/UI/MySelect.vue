<template>
    <select v-model="localValue" @change="changeOption">
        <option disabled value="">Выберите из списка</option>
        <option v-for="option in options" :key="option.value" :value="option.value">
            {{ option.name }}
        </option>
    </select>
</template>
<script>
export default {
    name: 'my-select',
    props: {
        modelValue: {
            type: String
        },
        options: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            localValue: this.modelValue
        }
    },
    watch: {
        modelValue(newValue) {
            this.localValue = newValue;
        }
    },
    methods: {
        changeOption(event) {
            this.localValue = event.target.value;
            this.$emit('update:modelValue', this.localValue);
        }
    }
}
</script>
<style scoped></style>