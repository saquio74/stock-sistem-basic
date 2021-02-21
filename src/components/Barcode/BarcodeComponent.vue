<template>
    <div>
        <v-dialog
            v-model="dialog"
            scrollable
            max-width="40%"
        >   
            <v-card class="text-center">
                <v-card-text style="height: 60%;">
                
                    <vue-bar v-bind:value="barcodeValue">
                        Show this if the rendering fails.
                    </vue-bar>
                </v-card-text>
                <v-divider></v-divider>
                    <v-card-actions>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="dialog = false"
                        >
                            Close
                        </v-btn>
                    </v-card-actions>
            </v-card>

        </v-dialog>

    </div>
</template>
<script>
import VueBarcode from 'vue-barcode';
export default {
    props:[
        'barcodeValue',
        'openBarcode'
    ],
    components:{
        'vue-bar': VueBarcode
    },
    data:()=>{
        return {
            dialog:false
        }
    },
    watch:{
        openBarcode(){
            this.dialog = true
        }
    }
}
</script>