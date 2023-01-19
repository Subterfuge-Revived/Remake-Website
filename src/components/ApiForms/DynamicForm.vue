<template>
    <b-card style="color: black" :title="title">
        
        <b-form>
            <b-row>
                <b-col size="8">
                    <b-form-select v-model="selectedOption">
                        <b-form-select-option v-for="option in queryOptions" :key=option.name :value="option">
                            <div>
                                <h5>{{ option.name }}</h5><br/> - {{ option.description }}
                            </div>
                        </b-form-select-option>
                    </b-form-select>
                </b-col>

                <b-button variant="success" @click="AddFilter">Add Filter</b-button>
            </b-row>
        </b-form>
        
        <b-form class="m-5">
            <h5>Query Options:</h5>
            <b-row v-for="filter in currentQuery" :key="filter.name" class="m-2">
                <b-col cols="8">            
                    <b-form v-if="filter.type == 'text' || filter.type == 'number'">
                        <b-input-group :prepend="filter.name">
                            <b-form-input :type="filter.type" v-model="filter.value" :placeholder="filter.name"></b-form-input>
                        </b-input-group>
                    </b-form>
                    <b-form v-else-if="filter.type == 'select'">
                        <b-input-group :prepend="filter.name">
                            <b-form-select v-model="filter.value" :options="filter.options"></b-form-select>
                        </b-input-group>
                    </b-form>
                    <b-form v-else-if="filter.type == 'boolean'">
                        <b-form-checkbox v-model="filter.value">{{filter.name}}?</b-form-checkbox>
                    </b-form>
                </b-col>

                <b-col cols="4">
                    <b-button variant="danger" @click="RemoveFilter(filter)">Remove Filter</b-button>
                </b-col>
            </b-row>

            <b-button variant="success" @click="onQuery">Query</b-button>
        </b-form>
    </b-card>  
</template>

<script>
export default {
    props: {
        title: {
            type: String,
        },
        options: {
            type: Array,
            validator(values) {
                values.forEach((value, index, array) => {
                    if (value.name == undefined || value.name == null) {
                        return false;
                    }
                    if (!["text", "number", "select", "boolean"].includes(value.type)) {
                        return false
                    }
                    if(value.type == "select" && (value.options == undefined || value.options.length == 0)) {
                        return false;
                    }
                });
                return true;
            }
        }
    },
    data() {
        return {
            queryOptions: [...this.options],
            selectedOption: null,
            currentQuery: [],
            results: []
        };
    },
    methods: {
        AddFilter() {
            this.currentQuery.push(this.selectedOption);
            this.queryOptions = this.queryOptions.filter((item) => { return item !== this.selectedOption })
        },
        RemoveFilter(itemToRemove) {
            this.currentQuery = this.currentQuery.filter((item) => { return item !== itemToRemove })
            this.queryOptions.push(itemToRemove);
        },
        onQuery() {
            let map = {};
            this.currentQuery.forEach((value, index, array) => {
                map[value.name.replace(" ", "")] = value.value
            })
            console.info(map);
            this.$emit('query', map);
        },
    },
    mounted() {
        // props are exposed on `this`
        console.log(this.options)
    }
}
</script>

<style>

</style>