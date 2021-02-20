<template>
    <div>
        <v-card-title>
        Ventas
        <br>
        total de ventas del dia {{todaySale}}
        <v-spacer></v-spacer>
        <v-row>
            <v-col
            cols=12
            md=6>

                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
            </v-col>
            <v-col
            cols=12
            md=6>

                <v-text-field
                    v-model="date"
                    append-icon="mdi-magnify"
                    label="Search"
                    type="date"
                    single-line
                    hide-details
                ></v-text-field>
            </v-col>
        </v-row>
        </v-card-title>
        <v-data-table
        :headers="headers"
        :items="filterSales"
        :footer-props="{
            'items-per-page-options': [todaySale,50, 60, 100, 200, 300]
        }"
        
        class="elevation-1">
        <template v-slot:[`item.actions`]="{ item }">
            <v-btn
            depressed
            color="error"
            @click="deleteItem(item)"
            >
            
                <v-icon
                    small
                    
                >
                    mdi-delete
                </v-icon>
            </v-btn>
        </template>
        </v-data-table>
        
        <sell-totals-component :sales="filterSales" />
    </div>
</template>
<script>
import moment from 'moment'
import { mapActions, mapState } from 'vuex'
import swal from 'sweetalert2'
import axios from 'axios'
import SellTotalsComponent from './SellTotalsComponent.vue'
export default {
    name:'listSell',
    components:{
        SellTotalsComponent
    },
    data:()=>{
        return {
            date:'',
            headers:[
                {text: 'producto',value: 'name',},
                {text: 'descripcion',value: 'description',},
                {text: '$ monto',value: 'amount',},
                {text: 'cantidad',value: 'units',},
                {text: 'Fecha',value: 'created_at',},
                {text: 'Actions', value: 'actions', sortable: false },
            ],
            search: '',
            todaySale: 0,
        }
    },
    created(){
        this.getSales();
        this.todaySales();
    },
    methods:{
        ...mapActions(['getSales','getProducts']),
        salesExist(){
            if(!this.sales){
                this.getSales();
            }
        },
        async deleteItem(item){
            const url = `ventas/${item.id}`
            console.log(url)
            try {
                const response = await axios.delete(url)
                this.getSales();
                this.getProducts();
                swal.fire(
                    'Se ha borrado correctamente',
                    response.data.message,
                    'success'
                )
            } catch (error) {
                swal.fire(
                    'Ocurrio un error',
                    error.response.message,
                    'error'
                )                
            }
        },
        todaySales(){
            this.sales.forEach(sale => {
                if(sale.created_at.includes(moment().format('L'))){
                    this.todaySale++
                }
            });
        }
    },
    computed:{
        ...mapState(['sales']),
        filterSales(){
            if(this.date.length>0){
                return this.sales.filter(sales=>{
                    return sales.created_at.includes(moment(this.date).format('L'))
                })
            }
            return this.sales.filter(sales=>{
                return sales.name.toUpperCase().includes(this.search.toUpperCase())
            })
        }
    },
    watch:{
        sales(){
            if(this.todaySale == 0){
                this.todaySales();

            }
        }
    }
}
</script>