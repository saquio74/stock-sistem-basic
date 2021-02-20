<template>
    <v-card
    class="mx-auto overflow-hidden"
    height="100%"
    >
        <v-app-bar
        color="deep-purple"
        dark
        >
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

        <v-toolbar-title>Sistema de gestion de productos</v-toolbar-title>
        </v-app-bar>

        <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        >
        <v-list
            nav
            dense
        >
            <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
            >

                <v-list-item to="/">
                    <v-list-item-icon>
                    <v-icon>mdi-home</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Home</v-list-item-title>
                </v-list-item>
            

                <v-list-item to="/products">
                    <v-list-item-icon>
                        <v-icon>mdi-power-plug</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Productos</v-list-item-title>
                </v-list-item>
            
                <v-list-item to="/ventas">
                    <v-list-item-icon>
                        <v-icon>mdi-cash</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Ventas</v-list-item-title>
                </v-list-item>
            </v-list-item-group>
        </v-list>
        </v-navigation-drawer>
        <body-component />   
    </v-card>
</template>
<script>

import BodyComponent from './BodyComponent.vue'
export default {
    
    name: 'HeaderComponent',
    components:{
        BodyComponent
        
    },
    data: () => ({
        drawer: false,
        group: null,
    }),
}
</script>