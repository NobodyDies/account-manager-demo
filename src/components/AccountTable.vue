<template>
<v-container class="container">
  <v-card class="pa-4">
    <div class="d-flex align-center justify-space-between mb-4">
      <h1 class="text-h5">
        Управление учётными записями
      </h1>
      <v-btn icon="mdi-plus" color="primary" @click="onAddAccount">
      </v-btn>
    </div>

    <v-alert
      type="info"
      variant="tonal"
      icon="mdi-information"
      class="mb-4"
    >
      <strong>Подсказка:</strong> вводите метки через <b>;</b>
    </v-alert>

    <form>
      <v-table class="my-table">
        <thead>
          <tr>
            <th style="width: 24%;">Метка</th>
            <th style="width: 17%;">Тип</th>
            <th style="width: 25%;">Логин</th>
            <th style="width: 25%;">Пароль</th>
            <th style="width: 60px;" class="text-end">Действия</th>
          </tr>
        </thead>

        <tbody>
          <AccountTableRow
            v-for="acc in tableItems"
            :key="acc.id"
            :account="acc"
            @remove="store.removeAccount"
            @updateAccount="store.updateAccount"
          />
        </tbody>
      </v-table>
    </form>
  </v-card>
</v-container>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import AccountTableRow from './AccountTableRow.vue';
import { type Account, type LabelItem, useAccountStore } from '@/store/accountStore.ts';

const store = useAccountStore()

onMounted(() => {
  store.initFromStorage()
})

const tableItems = computed(() => {
  return store.accounts.map((acc: Account) => ({
    ...acc,
    labelString: acc.labels.map((l: LabelItem) => l.text).join(';')
  }))
})

function onAddAccount() {
  store.addAccount()
}

</script>


<style scoped>
.container {
  min-width: 900px;
}
.my-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

th {
  text-align: left;
  font-weight: 500;
  border-bottom: 1px solid #ccc;
  padding-bottom: 8px;
  padding-top: 4px;
}

tr + tr td {
  border-top: 1px solid #eee;
}

.text-end {
  text-align: end;
}
</style>
