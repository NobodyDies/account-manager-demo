<template>
<tr>
  <td class="cell-td">
    <div class="field-wrapper">
      <v-textarea
        v-model="label"
        label="Метка"
        variant="outlined"
        density="compact"
        hide-details
        rows="1"
        auto-grow
        :error="!!errors.label"
        @blur="handleBlur"
      />
    </div>
  </td>

  <td class="cell-td">
    <div class="field-wrapper">
      <v-select
        v-model="type"
        :items="['LDAP', 'Локальная']"
        label="Тип"
        variant="outlined"
        density="compact"
        hide-details
        :error="!!errors.type"
        @update:model-value="handleTypeChange"
      />
    </div>
  </td>

  <td
    :colspan="type === 'LDAP' ? 2 : 1"
    class="cell-td"
  >
    <div class="field-wrapper">
      <v-text-field
        v-model="login"
        label="Логин"
        variant="outlined"
        density="compact"
        hide-details
        :error="!!errors.login"
        @blur="handleBlur"
      />
    </div>
  </td>

  <td
    v-if="type === 'Локальная'"
    class="cell-td"
  >
    <div class="field-wrapper">
      <v-text-field
        v-model="password"
        label="Пароль"
        variant="outlined"
        density="compact"
        type="password"
        autocomplete="off"
        hide-details
        :error="!!errors.password"
        @blur="handleBlur"
      />
    </div>
  </td>

  <td class="cell-td text-end">
    <v-btn
      icon="mdi-delete"
      color="error"
      density="comfortable"
      @click="handleRemove"
    />
  </td>
</tr>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import type { Account, Types } from '@/store/accountStore.ts';

const props = defineProps<{
  account: Account
}>()

const emit = defineEmits<{
  (e: 'updateAccount', value: Account): void
  (e: 'remove', id: number): void
}>()


const validationSchema = yup.object({
  label: yup.string().max(50, 'Не более 50 символов'),
  type: yup.string().oneOf(['LDAP', 'Локальная']).required(),
  login: yup.string().required('Логин обязателен').max(100, 'Не более 100 символов'),
  password: yup.string()
    .when('type', (type: Types[], schema) => {
      return type[0] === 'Локальная'
        ? schema.required('Пароль обязателен').max(100, 'Не более 100 символов')
        : schema.notRequired()
    })
})


const { values, validate, errors, defineField } = useForm<Account>({
  validationSchema,
  initialValues: {
    label: props.account.labelString,
    type: props.account.type,
    login: props.account.login,
    password: props.account.password || ''
  }
})

const [ label ] = defineField('label');
const [ type ] = defineField<Types>('type');
const [ login ] = defineField('login');
const [ password ] = defineField('password');
const handleBlur = async () => {
  const { valid } = await validate()
  if (valid) emitUpdate()
}

const handleTypeChange = async () => {
  if (values.type === 'LDAP') {
    values.password = ''
  }
  const { valid } = await validate()
  if (valid) emitUpdate()
}

const handleRemove = () => {
  emit('remove', props.account.id)
}
const emitUpdate = () => {
  emit('updateAccount', {
    id: props.account.id,
    login: login.value,
    type: type.value,
    labels: parseLabels(label.value),
    password: type.value === 'LDAP' ? null : password.value
  })
}

function parseLabels(str: string) {
  return str
    .split(';')
    .map(s => s.trim())
    .filter(Boolean)
    .map(s => ({ text: s }))
}
</script>

<style scoped>
.cell-td {
  vertical-align: middle;
}

.field-wrapper {
  padding: 8px 4px;
}
</style>
