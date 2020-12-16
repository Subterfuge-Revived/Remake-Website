<template>
    <b-jumbotron class="no-vertical">
        <div class="text-center">
            <p class="appNameHeader"><slot name="title"></slot></p>
            <p class="headerText"><slot name="header"></slot></p>
        </div>

        <b-container class="text-center wide-40"><p class="descriptionText"><slot name="description"></slot></p></b-container>
        <slot></slot>
    </b-jumbotron>
</template>

<style>
.appNameHeader {
    font-size: 70px;
    color: white;
}

.headerText {
    font-size: 45px;
    color: rgb(204, 204, 204)
}

.descriptionText {
    font-size: 20px;
}

.wide-40 {
    width: 40%;
}

.no-vertical {
    margin-bottom: 0px;
    margin-top: 0px;
}
</style>