<template>
  <Toolbar>
    <template #start>
      <template v-for="(btn, index) in props.buttons">
        <Button
          v-if="!btn.hidden"
          :key="index"
          :label="typeof btn.label === 'string' ? btn.label : ''"
          :icon="btn.icon"
          :raised="activeBtn?.id === btn.id"
          :severity="activeBtn?.id === btn.id ? '' : 'secondary'"
          :text="activeBtn?.id !== btn.id"
          :asChild="btn.href !== undefined"
          v-slot="slotProps"
          class="mr-2"
          @click="onBtnClick(btn)"
        >
          <RouterLink
            v-if="btn.href !== undefined"
            :to="btn.href"
            :class="slotProps.class"
            class="mr-2"
          >
            <i :class="btn.icon"></i>
            {{ typeof btn.label === 'string' ? btn.label : '' }}
          </RouterLink>
        </Button>
      </template>
    </template>
  </Toolbar>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface GlobalTabbarButtonProps {
  id: string
  label: string
  icon: string
  hidden: boolean
  href?: string
  command?: (event?: Event) => void
}

export interface GlobalTabbarProps {
  buttons: GlobalTabbarButtonProps[]
  modelValue?: GlobalTabbarButtonProps
  defaultBtn?: GlobalTabbarButtonProps
}

const props = defineProps<GlobalTabbarProps>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: GlobalTabbarButtonProps): void
}>()

// 哪个按钮正激活状态
const activeBtn = computed<GlobalTabbarButtonProps | null>({
  get() {
    return props.modelValue ?? props.defaultBtn ?? props.buttons.find((btn) => !btn.hidden) ?? null
  },
  set(value) {
    if (value) emit('update:modelValue', value)
  },
})

// 按钮按下事件
const onBtnClick = (btn: GlobalTabbarButtonProps) => {
  activeBtn.value = btn
  btn.command?.()
}
</script>
