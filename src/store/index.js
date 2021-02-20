import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import moment from 'moment'
axios.defaults.baseURL = 'http://localhost:8000/api/'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		products: [],
		sales: [],
		open: false,
	},
	mutations: {
		CHARGEPRODUCTS: (state,products) => {
			state.products = products
		},
		CHARGESALES: (state, sales)=>{
			state.sales = sales
		},
		SETOPEN: (state,open)=>{
			state.open = open
		},
	},
	actions: {
		async getProducts({commit}){
			const url  = 'productos'
			const response = await axios.get(url)
			const productos  = response.data
			return commit('CHARGEPRODUCTS', productos);
		},
		openModal({commit},open){
			return commit('SETOPEN',open);
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
