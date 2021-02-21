<template>
    <div>
        <template >
            <v-form>
                <v-card
                class="overflow-hidden"
                color="purple "
                dark
                
                >
                    <v-container >
                        <v-row>
                        <barcode-reader @productCodebar="productBar = $event" />
                            <v-col
                            cols="12"
                            md="4"
                            >
                            <v-text-field
                                
                                v-model="productName"
                                label="Nombre del producto"
                                required
                                class="text-input-blue"
                            ></v-text-field>
                            </v-col>
                            <v-col
                            cols="12"
                            md="8"
                            
                            >
                        
                                <v-simple-table height="160px" fixed-header class="purple lighten-2">
                                    <template>
                                        <thead class="cyan">
                                            <tr>
                                                <th class="text-left">
                                                    Nombre
                                                </th>
                                                <th class="text-left">
                                                    Descripcion
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr
                                            v-for="item in filterProducts"
                                            :key="item.id"
                                            @click="setProduct(item)"
                                            >
                                                <td>{{ item.name }}</td>
                                                <td>{{ item.description }}</td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-form>
        </template>
        <div v-if="productName.length>0">
            <sell-form :product="product"/>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import BarcodeReader from '../Barcode/BarcodeReader.vue'
import SellForm from './SellForm.vue'
export default {
    components: { SellForm, BarcodeReader },
    data:()=>{
        return{
            productName:'',
            value:'',
            productBar:{},
            product:{}
        }
    },
    created(){
        this.exist()
    },
    methods:{
        ...mapActions(['getProducts']),
        exist(){
            if(this.products.length<=0){
                this.getProducts();
            }
        },
        setProduct(product){
            this.productName = product.name
            this.product = product
        }
    },
    computed:{
        ...mapState(['products']),
        filterProducts(){
            return this.products.filter(valor => {
                return valor.name.toUpperCase().includes(this.productName.toUpperCase())
            });
        }
    },
    watch:{
        productBar(product){
            this.productName = product.name
            this.product = product
        }
    }
   
}
</script>
<style scoped>
.text-input-blue .v-text-field__slot input {
   color: #00f !important;
}
</style>