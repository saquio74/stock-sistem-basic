<template>
    <div>
        <template>
            <v-form>
                <v-card>
                    <v-container>
                        <v-row>
                            <v-col
                            cols="12"
                            md="4"
                            >
                            <v-text-field
                                
                                v-model="productName"
                                label="Nombre del producto"
                                required
                            ></v-text-field>
                            </v-col>
                            <v-col
                            cols="12"
                            md="8"
                            
                            >
                        
                                <v-simple-table height="150px" fixed-header>
                                    <template>
                                        <thead>
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
import SellForm from './SellForm.vue'
export default {
    components: { SellForm },
    data:()=>{
        return{
            productName:'',
            value:'',
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
    }
}
</script>