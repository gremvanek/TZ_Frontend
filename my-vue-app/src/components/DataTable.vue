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
            <v-icon small @click="deleteitem(item)">mdi-delete</v-icon>
        </template>
    </v-data-table>

<v-progress-linear v-if="loading" indeterminate></v-progress-linear>
</v-container>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useDataStore } from '../stores/dataStore.js';

export default{
    setup(){
        const store = useDataStore();
        const headers = ref([
            {text: 'ID', value:'id'},
            {text: 'Название', value: 'name'},
            {text: 'Действия', value: 'actions', sortable: false}
        ]);

        const loading = ref(true);
        const items = store.items;

        onMounted(async () => {
            await store.loaditems();
            loading.value = false;
        });

        const additem = () => {
            store.additem({id: Date.now(), name:'Новый элемент'});            
        };

        const edititem = (item) => {
            const Newname = prompt('Смена имени item', item.name);
            if(Newname !== null){
                store.updateitem({...item, name: Newname });
            }
        };

        const deleteitem = (item) =>{
            if(confirm('Вы точно хотите удалить item?')){
                store.deleteitem(item.id);
            }
        };
    return { headers, items, additem, edititem, deleteitem, loading };
    }
}
</script>