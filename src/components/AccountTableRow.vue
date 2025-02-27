<template>
<tr>
  <td class="cell-td">
    <div class="field-wrapper">
      <v-text-field
        v-model="localAccount.labelString"
        label="Метка"
        variant="outlined"
        density="compact"
        hide-details
      />
    </div>
  </td>

  <td class="cell-td">
    <div class="field-wrapper">
      <v-select
        v-model="localAccount.type"
        :items="['LDAP', 'Локальная']"
        label="Тип"
        variant="outlined"
        density="compact"
        hide-details
      />
    </div>
  </td>

  <td
    v-if="localAccount.type === 'LDAP'"
    :colspan="2"
    class="cell-td"
  >
    <div class="field-wrapper">
      <v-text-field
        v-model="localAccount.login"
        label="Логин"
        variant="outlined"
        density="compact"
        hide-details
      />
    </div>
  </td>
  <td
    v-else
    class="cell-td"
  >
    <div class="field-wrapper">
      <v-text-field
        v-model="localAccount.login"
        label="Логин"
        variant="outlined"
        density="compact"
        hide-details
      />
    </div>
  </td>

  <td
    v-if="localAccount.type === 'Локальная'"
    class="cell-td"
  >
    <div class="field-wrapper">
      <v-text-field
        v-model="localAccount.password"
        label="Пароль"
        variant="outlined"
        density="compact"
        type="password"
        hide-details
      />
    </div>
  </td>
  <td class="cell-td text-end">
    <v-btn icon="mdi-delete" color="error" density="comfortable"/>
  </td>
</tr>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';

interface Account {
  id: number;
  labelString: string;
  type: 'LDAP' | 'Локальная';
  login: string;
  password: string | null;
}

const props = defineProps<{
  account: Account
}>();

const localAccount = ref({ ...props.account });
</script>

<style scoped>
.cell-td {
  vertical-align: middle;
}

.field-wrapper {
  padding: 8px 4px;
}
</style>
