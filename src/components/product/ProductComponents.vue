<template>
    <div>
        
        <v-simple-table
        class="cyan"
        dark 
        primary
        fixed-header
        
        >
            <template v-slot:default>
            <thead>
                <tr>
                    <th class="text-left">
                        Nombre
                    </th>
                    <th class="text-left">
                        Descripcion
                    </th>
                    <th class="text-left">
                        Costo
                    </th>
                    <th class="text-left">
                        Valor
                    </th>
                    <th class="text-left">
                        Stock
                    </th>
                    <th class="text-left">
                        opciones
                    </th>
                   
                </tr>
            </thead>
            <tbody>
                <tr
                v-for="item in productsFilter"
                :key="item.id"
                
                >
                    <td>{{ item.name }}</td>
                    <td>{{ item.description }}</td>
                    <td>{{ item.price_cost }}</td>
                    <td>{{ item.price_sell }}</td>
                    <td>{{ item.stock }}</td>
                    <td > 
                        <v-btn 
                        align="center"
                        color="primary" 
                        justify="center"
                        @click="setProduct(item,'update')"
                        >
                            <v-icon>mdi-lead-pencil</v-icon>
                            
                        </v-btn>
                        <v-btn 
                        align="center"
                        color="red" 
                        justify="center"
                        @click="deleteProduct(item.id)"
                        >
                            <v-icon danger>mdi-delete</v-icon>
                        </v-btn>
                        <v-btn 
                        align="center"
                        color="purple" 
                        justify="center"
                        @click="setProduct(item,'addStock')"
                        >
                            <v-icon danger>mdi-plus</v-icon>
                        </v-btn>
                       
                        <v-btn 
                        align="center"
                        color="orange" 
                        justify="center"
                        @click="barcode(`${item.id} ${item.name}`)"
                        >
                            <v-icon danger>mdi-barcode</v-icon>
                        </v-btn>
                    </td>
                </tr>
            </tbody>
            </template>
        </v-simple-table>
        <totals-component />
        <add-product />
        <barcode-component :barcodeValue="barcodeValue" :openBarcode="openBarcode" />
        <update-product :product="product" :abrir="open" :openUpdate="openUpdate" />
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
                @click="snackbar = open"
                >
                Close
                </v-btn>
            </template>
        </v-snackbar>
    </div>    
</template>
<script>
import {mapState, mapActions} from 'vuex'
import addProduct from './addProductComponent'
import updateProduct from './UpdateProductComponent'
import totalsComponent from './TotalsComponent'
import axios from 'axios'
import swal from 'sweetalert2'
import BarcodeComponent from '../Barcode/BarcodeComponent'


export default {
    name: 'ProductComponent',
    data:()=>{
        return{
            response:'',
            timeout: 2000,
            snackbar : false,
            product: {},
            open:'',
            barcodeValue: '',
            openBarcode: 0,
            openUpdate: 0,
        }
    },
    components:{
        addProduct,
        updateProduct,
        totalsComponent,
        BarcodeComponent,
    },
    created(){
        this.productsVerify()
    },
    methods:{
        ...mapActions(['getProducts','openModal']),
        productsVerify(){
            if(this.productsFilter.length==0){
                this.getProducts()
            }
        },
        async deleteProduct(id){

            try {
                const confirmation = await swal.fire({
                    title: 'estas seguro?',
                    text: "Esta accion no se puede revertir!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, borralo!'
                })
                if(confirmation.isConfirmed){

                    const response = await axios.delete(`productos/${id}`)
                    this.response = response.data.message
                    this.snackbar = true
                    this.getProducts();
                }
            } catch (error) {
                this.response = error
                this.snackbar = true
                
            }

        },
        setProduct(product,type){
            this.product = product
            this.open = type
            this.openUpdate = this.openUpdate == 0? 1:0
            
        },
        barcode(code){
            this.barcodeValue = code
            this.openBarcode = this.openBarcode == 0? 1:0
        }
    },
    computed:{
        ...mapState(['products']),
        productsFilter(){
            return this.products
        }
    }

}
</script>
