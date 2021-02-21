<template>
    <div>
        <v-btn
        class="orange"
        @click="flag = !flag"
        >
            
            Abrir lector
        </v-btn>
        <div v-if="flag">
            <v-card>

                <v-quagga :onDetected="logIt" :readerSize="readerSize" :readerTypes="['ean_reader']"></v-quagga>
            </v-card>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import VueQuagga from 'vue-quaggajs';
Vue.use(VueQuagga);
export default {
    data () {
        return {
            readerSize: {
                width: 640,
                height: 480
            },
            detecteds: [],
            flag: false,
        }
    },
    created(){
        
    },
    methods:{
        logIt (data) {
      console.log('detected', data)
    }
    }
}
</script>