<template>
    <div>
        <v-btn
        class="orange"
        @click="dialog = true"
        >
            Abrir lector
        </v-btn>
        <v-dialog
            v-model="dialog"
            
            hide-overlay
            transition="dialog-bottom-transition"
        >
            <v-card height="500px" v-if="dialog">

                <v-quagga :onDetected="logIt" :readerSize="readerSize"></v-quagga>
            </v-card>
            <v-divider></v-divider>
                <v-card-actions class="text-rigth">
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="dialog = false"
                    >
                        Close
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        :loading="loading"
                    >
                        Seleccionar
                    </v-btn>
                </v-card-actions>
        </v-dialog>
    </div>
</template>
<script>
import Vue from 'vue'
import VueQuagga from 'vue-quaggajs';
import { mapState } from 'vuex';
Vue.use(VueQuagga);
export default {
    data () {
        return {
            readerSize: {
                width: 400,
                height: 400
            },
            detecteds: [],
            flag: false,
            dialog: false,
            loading: false,
        }
    },
    created(){
        
    },
    methods:{
        logIt (data) {
            console.log('detected', data.codeResult.code)
            let datos = data.codeResult.code.split(' ')
            let product  = this.products.find(e=> e.id == datos[0])
            console.log(product)
            this.$emit('productCodebar',product)
            this.dialog= false
        }
    },
    computed:{
        ...mapState(['products'])
    }
}
</script>