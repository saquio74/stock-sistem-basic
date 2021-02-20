<template>
    <div>
        <v-btn
        color= "orange"
        @click="vista = 1">
            lista de Ventas
        </v-btn>
        <v-btn
        color= "cyan"
        @click="vista = 0">
            Vender
        </v-btn>
        <div v-if="vista == 1">   

            <list-sell />
        </div>
        <div v-if="vista == 0">   
            <sell-form-component />
        
        </div>
    </div>
</template>
<script>
import listSell from './ListSellComponent'
import SellFormComponent from './SellFormComponent.vue'
export default {
    components:{
        listSell,
        SellFormComponent,
    },
    data:()=>{
        return{
            vista:0,
        }
    }
}
</script>