<template>
    <div>
        <div id="bc" class="ab">adsfasdadsfasdfasdfasdffasdf</div>
    </div>
</template>

<script>
import Vue from "vue";
import less from "less";
Vue.use(less);
export default {
    name: 'BenlaaaLess',
    data() {
        return {
            
        };
    },
    mounted() {
        
    },
    methods: {
        
    },
};
</script>
<style lang="less" scoped>
    @wid:100px;@hei:100px;
    @bc:red;
    .ab{
        width: @wid;height: @hei;
        background-color: @bc;
    }
</style>