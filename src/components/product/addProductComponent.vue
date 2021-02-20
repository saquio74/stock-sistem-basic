<template>
    <div>
        <br>
        <v-row justify="center" >
            <v-dialog
            v-model="dialog"
            scrollable
            max-width="80%"
            >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                color="primary"
                dark
                large
                elevation="2"
                v-bind="attrs"
                v-on="on"
                >
                    Agregar Producto
                </v-btn>
            </template>
            <v-card>
                <v-card-title>Crear Producto</v-card-title>
                <v-divider></v-divider>
                <v-card-text style="height: 60%;">
                    <v-container>
                        <v-row>
                            <v-col md="4" sm="12" cols="12">

                                <v-text-field
                                label="Nombre"
                                :rules="rules"
                                hide-details="auto"
                                v-model="product.name"
                                ></v-text-field>
                            </v-col>
                            <v-col md="8" sm="12" cols="12">

                                <v-text-field
                                label="Descripcion"
                                :rules="rules"
                                hide-details="auto"
                                v-model="product.description"
                                ></v-text-field>
                            </v-col>
                            <v-col md="4" sm="12" cols="12">

                                <v-text-field
                                label="Precio"
                                :rules="rulesNumber"
                                hide-details="auto"
                                v-model="product.price_cost"
                                type="number"
                                ></v-text-field>
                            </v-col>
                            <v-col md="4" sm="12" cols="12">
                                Sugerido {{(product.price_cost * 1.4).toFixed(2)}}
                            </v-col>
                            <v-col md="4" sm="12" cols="12">

                                <v-text-field
                                label="Precio"
                                :rules="rulesSell"
                                hide-details="auto"
                                v-model="product.price_sell"
                                type="number"
                                ></v-text-field>
                            </v-col>
                            <v-col md="4" sm="12" cols="12">

                                <v-text-field
                                label="Cantidad"
                                hide-details="auto"
                                v-model="product.stock"
                                type="number"
                                ></v-text-field>
                            </v-col>
                             <v-col md="4" sm="12" cols="12">
                                Costo {{(product.price_cost * product.stock).toFixed(2)}}
                            </v-col>
                             <v-col md="4" sm="12" cols="12">
                                Posible Ganancia {{((product.price_sell * product.stock)-(product.price_cost * product.stock)).toFixed(2)}}
                            </v-col>
                        </v-row>
                    </v-container>
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
                <v-btn
                    color="blue darken-1"
                    text
                    @click="saveProduct()"
                >
                    Guardar
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
        </v-row>
        <v-snackbar
            v-model="snackbar"
            :timeout="timeout"
            >
            {{ response }}

            <template v-slot:action="{ attrs }">
                <v-btn
                color="blue"
                text
                v-bind="attrs"
                @click="snackbar = false"
                >
                Close
                </v-btn>
            </template>
        </v-snackbar>
    </div>
    
</template>
<script>
import axios from 'axios'
import { mapActions } from 'vuex'
export default {
    name: 'addProduct',
    data: ()=>{
        return{
            product:{
                name:'',
                description: '',
                price_cost: '',
                price_sell: '',
                stock: '',
            },
            precio: 0,
            dialogm1: '',
            dialog: false,
            rules: [
                value => !!value || 'Requerido.',
                value => (value && value.length >= 3) || 'Min 3 caracteres',
            ],
             rulesNumber:[
                value => !!value || 'Requerido.',
                value => value>0 || 'El valor debe ser mayor a 0' 
            ],
            response:'',
            snackbar: false,
            timeout: 2000,
        }
    },
    methods:{
        ...mapActions(['getProducts']),
        async saveProduct(){
            try {
                
                const response = await axios.post('productos',this.product)
                this.dialog = false
                this.response = response.data.message
                this.snackbar = true
                this.getProducts();
            } catch (error) {
                this.snackbar = true
                this.response = error
            }
            
        }

    },
    computed:{
        rulesSell(){
            return [
                value => !!value || 'Requerido.',
                value => value - this.product.price_cost > 0 || 'El valor debe ser mayor al costo' 
            ]
        }
    },
    watch:{
        
    }
}
</script>