<template>
    <div>
        <br>
        <v-row justify="center" >
            <v-dialog
            v-model="open"
            scrollable
            max-width="80%"
            >
                <v-card v-if="abrir == 'update'">
                    <v-card-title>Modificar Producto</v-card-title>
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
                        @click="open = false"
                    >
                        Close
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        :loading ="loading"
                        @click="saveProduct(product)"
                    >
                        Guardar
                    </v-btn>
                    </v-card-actions>
                </v-card>
                <v-card v-if="abrir == 'addStock'">
                    <v-card-title>Agregar Stock</v-card-title>
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
                                    label="Cantidad"
                                    hide-details="auto"
                                    v-model="newUnits"
                                    type="number"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="open = false"
                        >
                            Close
                        </v-btn>
                        <v-btn
                            color="blue darken-1"
                            text
                            :loading="loading"
                            @click="addStock(product,newUnits)"
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
    props:[

        'product',
        'abrir',
        'openUpdate'

    ]
    ,
    data:()=>{
        return{
            dialog: false,
            snackbar: false,
            timeout: 2000,
            response: '',
            loading: false,
            open: false,
            newUnits: 0,
            rules: [
                value => !!value || 'Requerido.',
                value => (value && value.length >= 3) || 'Min 3 caracteres',
            ],
             rulesNumber:[
                value => !!value || 'Requerido.',
                value => value>0 || 'El valor debe ser mayor a 0' 
            ],
        }
    },
    methods:{
        ...mapActions(['getProducts']),
 
        async saveProduct(product){
            this.loading = true
            try {
                let response  = await axios.put('productos',product)
                
                this.response = response.data.message
                this.getProducts();
                this.open = false;
                this.snackbar = true
                this.loading = false
            } catch (error) {
                this.response = error
                this.snackbar = true
                this.loading = false
                
            }
            
        },
        async addStock(product,newUnits){
            product.stock = Number(newUnits) + Number(product.stock);
            try {
                this.loading = true
                let response  = await axios.put('productos',product)
                
                this.response = response.data.message
                this.getProducts();
                this.open = false;
                this.newUnits = 0
                this.snackbar = true
                this.loading = false
            } catch (error) {
                this.response = error
                this.snackbar = true
                this.loading = false
                
            }
        }
    },
    computed:{
        rulesSell(){
            return [
                value => !!value || 'Requerido.',
                value => value - this.product.price_cost > 0 || 'El valor debe ser mayor al costo' 
            ]
        },
    },
    watch:{
        openUpdate(){
            this.open = true
        }
    }
}
</script>