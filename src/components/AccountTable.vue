<template>
<v-container class="container">
  <v-card class="pa-4">
    <div class="d-flex align-center justify-space-between mb-4">
      <h1 class="text-h5">
        Управление учётными записями
      </h1>
      <v-btn icon color="primary">
        <v-icon>mdi-plus</v-icon>
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
        />
      </tbody>
    </v-table>
  </v-card>
</v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import AccountTableRow from './AccountTableRow.vue';

const tableItems = computed(() => {
  return [
    { id: 1, labelString: 'LDAP', type: 'LDAP', login: 'admin', password: '' },
    { id: 2, labelString: 'Локальная', type: 'Локальная', login: 'user', password: '123456' },
  ]
})
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
