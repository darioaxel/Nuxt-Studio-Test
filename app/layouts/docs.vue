<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const route = useRoute()
const section = computed(() => route.params.section as string)

const navigations = inject<Record<string, Ref<ContentNavigationItem[]>>>('navigation')
const navigation = computed(() => navigations?.[section.value]?.value || [])
</script>

<template>
  <UContainer>
    <UPage>
      <template #left>
        <UPageAside>
          <UContentNavigation
            highlight
            :navigation="navigation"
          />
        </UPageAside>
      </template>

      <slot />
    </UPage>
  </UContainer>
</template>
