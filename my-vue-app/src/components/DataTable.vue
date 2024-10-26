<template>
<v-container>
    <v-data-table
        :headers="headers"
        :items="items"
        item-value="id"
        class="elevation-1"
        >
        <template #top>
        <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-btn @click="additem">Добавить элемент</v-btn>
        </v-toolbar>
        </template>
        <template #item.actions="{ item }">
            <v-icon small @click="edititem(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteitem(item)">mdi-delete/v-icon>
        </template>
    </v-data-table>

<v-progress-linear v-if="loading" indeterminate></v-progress-linear>
</v-container>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useDataStore } from '../stores/dataStore.js';