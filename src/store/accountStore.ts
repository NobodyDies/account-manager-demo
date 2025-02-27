import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface LabelItem {
  text: string
}

export type Types = 'LDAP' | 'Локальная'

export interface Account {
  id: string
  labels: LabelItem[]
  type: Types
  login: string
  password: string | null
}

const STORAGE_KEY = 'accountsData'

export const useAccountStore = defineStore('accountStore', () => {
  const accounts = ref<Account[]>([])

  function initFromStorage() {
    const jsonData = localStorage.getItem(STORAGE_KEY)
    if (jsonData) {
      try {
        accounts.value = JSON.parse(jsonData)
      } catch (err) {
        console.error('Ошибка чтения localStorage:', err)
      }
    }
  }

  function saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts.value))
  }

  function addAccount() {
    const newAccount: Account = {
      id: Date.now().toString(),
      labels: [],
      type: 'Локальная',
      login: '',
      password: '',
    }
    accounts.value.push(newAccount)
  }

  function removeAccount(id: string) {
    accounts.value = accounts.value.filter(acc => acc.id !== id)
    saveToStorage()
  }

  function updateAccount(updated: Account) {
    const index = accounts.value.findIndex(acc => acc.id === updated.id)
    if (index !== -1) {
      accounts.value[index] = { ...updated }
      saveToStorage()
    }
  }

  return {
    accounts,
    initFromStorage,
    addAccount,
    removeAccount,
    updateAccount,
  }
})
