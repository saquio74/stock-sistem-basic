<template>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="sellProduct()"
    >
        <v-card
            class="mx-auto my-12"
        >
            <v-container>
                <v-row justify="space-between">
                    <v-col
                    cols="12"
                    md="4"
                    >
                    Nombre del Producto
                    <br>
                    {{product.name}}
                        
                    </v-col>
                    <v-col
                    cols="12"
                    md="4"
                    >
                        Precio del Producto
                        <br>
                        {{product.price_sell}}
                    </v-col>

                    <v-col
                    cols="12"
                    md="4"
                    >
                        <v-text-field
                            v-model="sale.units"
                            :rules="unitsRules"
                            label="Cantidad"
                            required
                            type='number'
                            @keyup="calculateAmount()"
                        ></v-text-field>
                    </v-col>

                    <v-col
                    cols="12"
                    md="4"
                    >
                        Total
                        <br>
                        {{(product.price_sell * sale.units).toFixed(2)}}
                    </v-col>
                    <v-col
                    cols="12"
                    md="6"
                    >
                        <v-btn color='cyan'
                        :loading ="loading"
                        :disabled="!valid"
                        @click="sellProduct()">
                            Vender
                        </v-btn>                        
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-form>
</template>
<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import swal from 'sweetalert2'
export default {
    props:['product'],
    data:()=>{
        return{
            valid:true,
            loading:false,
            disable: false,
            sale:{
                product_id: '',
                price_cost:'',
                amount: 0,
                units: '',
            },
        }
    },
    methods:{
        ...mapActions(['getSales','getProducts']),
        calculateAmount(){
            this.sale.amount = Number(this.sale.units)* Number(this.product.price_sell)
        },
        async sellProduct(){
            const url = 'ventas';
             
            if(this.$refs.form.validate()==false){
                return
            }
            this.sale.product_id = this.product.id
            this.sale.price_cost = this.product.price_cost
            try {
                this.loading = true
                const response = await axios.post(url,this.sale)
                this.getSales();
                this.getProducts();
                this.loading = false;
                this.sale.units=''

                swal.fire(
                'Operacion exitosa',
                response.data.message,
                'success'
                )
                
            } catch (error) {
                console.log(error)
                swal.fire(
                'Ocurrio un error',
                error.message,
                'error'
                )
                this.loading = false
            }
        }
    },
    watch:{
        product(){
            this.calculateAmount()
        }
    },
    computed:{
        unitsRules(){
            return [
                v=> !!v || 'Este campo es requerido',
                v=> v>0 || 'Las unidades no pueden ser menores a 1',
                v=> v <= Number (this.product.stock) || 'Las cantidad no puede ser mayor al stock'
            ]
        }
    }
}
</script>