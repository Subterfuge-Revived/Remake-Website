<template>
    <b-card>this is a card
        <b-button variant="primary">Button</b-button>
        {{ $t('hello') }}
    </b-card>
</template>

<script>

// This is the default homepage component.
// Example usage: `<home/>`
export default {
    props: {
        // This is a test vuese comment.
        test: {
            type: String,
            default: "",
        }
    }
}
</script>

<style lang="scss">

</style>