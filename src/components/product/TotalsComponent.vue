<template>
    <div>
        <v-bottom-sheet
      v-model="sheet"
      inset
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="orange"
          dark
          v-bind="attrs"
          v-on="on"
          @click="totals()"
        >
          Ver estimados Totales
        </v-btn>
      </template>
      <v-sheet
        class="text-center"
        height="200px"
      >
        <v-btn
          class="mt-6"
          text
          color="error"
          @click="sheet = !sheet"
        >
          close
        </v-btn>
        <div class="my-3">
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">
                                Costo Total
                            </th>
                            <th class="text-left">
                                Valor estimado total
                            </th>
                            <th class="text-left">
                                Ganancia Total
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                $ {{totalCost}}
                            </td>
                            <td>
                                $ {{totalSell}}
                            </td>
                            <td>
                                $ {{total}}
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </div>
      </v-sheet>
    </v-bottom-sheet>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
    name: 'totalComponent',
    data:()=>{
        return{
            sheet: false,
            totalCost: 0,
            totalSell: 0,
            total: 0
        }
    },
    methods:{
        ...mapActions(['getProducts']),
        totals(){
            this.products.forEach(element => {
                this.totalCost += Number(element.price_cost * element.stock)
                this.totalSell += Number(element.price_sell * element.stock)
            });
            this.total = this.totalSell - this.totalCost;
        },
        close(){
            this.totalCost = 0;
            this.totalSell = 0;
            this.total = 0;
        }
    },
    computed:{
        ...mapState(['products'])
    },
    watch:{
        sheet(e){
            if(e == false){
                this.close()
            }
        }
    }
   
}
</script>