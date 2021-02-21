import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import moment from 'moment'
axios.defaults.baseURL = 'http://192.168.1.36:8000/api/'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		products: [],
		sales: [],
	},
	mutations: {
		CHARGEPRODUCTS: (state,products) => {
			state.products = products
		},
		CHARGESALES: (state, sales)=>{
			state.sales = sales
		},
	},
	actions: {
		async getProducts({commit}){
			const url  = 'productos'
			const response = await axios.get(url)
			const productos  = response.data
			return commit('CHARGEPRODUCTS', productos);
		},
		async getSales({commit}){
			moment.locale('es');
			const url = 'ventas';
			const response = await axios.get(url);
			const sales = response.data
			sales.forEach(element => {
				element.created_at = moment(element.created_at).utcOffset('-03:00').format('L hh:mm:ss')
			});
			return commit('CHARGESALES',sales);

		}
		

	},
	modules: {
	}
})
