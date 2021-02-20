<template>
	<v-app>
		<v-main>
			<header-component></header-component>
			
		</v-main>
	</v-app>
</template>

<script>	
import HeaderComponent from './components/HeaderComponent.vue';

export default {
	name: 'App',

	components: {
		HeaderComponent
	},

	data(){
		return{

		}
	},
};
</script>
