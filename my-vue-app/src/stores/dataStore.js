import { defineStore } from 'pinia';

export const useDataStore = defineStore('data', {
    state: () => ({
        items:[]
    }),
    actions:{
        async loaditems(){
            try{
                this.items = await new Promise((resolve) => 
                    setTimeout(()=> resolve([{ id:1, name:'Элемент 1'}]), 1000)
            );
            } catch (error){ console.error('Ошибка загрузки данных', error);}
        },
        additem(item){
            this.item.push(item);
        },  
        updateItem(updateItem){
            const index = this.item.findIndex((item) => item.id === updateItem.id);
            if (index !== -1){
                this.item[index] = updateItem;
            }
        },
        deleteItem(itemId){
            this.items = this.items.filter((item) => item.id !== itemId);            
        }
    }
});