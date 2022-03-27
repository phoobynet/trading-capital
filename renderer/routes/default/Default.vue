<template>
  <div
    class="mx-2 mt-2 flex flex-col space-y-3 overflow-hidden overscroll-none px-1"
  >
    <div class="flex flex-row space-x-2">
      <div class="w-1/2">
        <label for="capital" class="label">Capital</label>
        <input
          autofocus
          id="capital"
          type="text"
          v-model="capital"
          class="input input-bordered text-right w-full"
          v-numeric
          v-focus-on-select
        />
      </div>
      <div class="w-1/2">
        <label for="riskPercentage" class="label">Risk %</label>
        <select
          class="select select-bordered text-right w-full"
          v-model="riskPercentage"
          id="riskPercentage"
        >
          <option v-for="option in riskPercentageOptions" :value="option">
            {{ option }}%
          </option>
        </select>
      </div>
    </div>
    <div class="w-full">
      <div class="text-2xl font-bold tracking-wider text-center">
        <div>Trading Capital:</div>
        <div class="text-green-400">{{ tradingCapital }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import numeral from 'numeral'
import { range } from 'lodash'
import { useStorage } from '@vueuse/core'

const capital = useStorage<number>('capital', 1000)
const riskPercentage = useStorage<number>('riskPercentage', 2)

const riskPercentageFormatted = computed(() => {
  return numeral(riskPercentage.value / 100).format('0%')
})

const riskPercentageOptions = range(1, 101)

const tradingCapital = computed(() => {
  let result = 0
  if (capital.value && riskPercentage.value) {
    result = capital.value * (riskPercentage.value / 100)
  }

  return numeral(result).format('$0,0.00')
})
</script>
