<script setup lang="ts">
import type { NuxtError } from '#app'
import type { ContentNavigationItem } from '@nuxt/content'

defineProps<{
  error: NuxtError
}>()

useHead({
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  title: 'Page not found',
  description: 'We are sorry but this page could not be found.'
})

const navigations = inject<Record<string, Ref<ContentNavigationItem[]>>>('navigation')
const allNavigation = computed(() => [
  ...(navigations?.docs?.value || []),
  ...(navigations?.ayuda?.value || []),
  ...(navigations?.admin?.value || [])
])

const { data: files } = useLazyAsyncData('search', async () => {
  const [docs, ayuda, admin] = await Promise.all([
    queryCollectionSearchSections('docs'),
    queryCollectionSearchSections('ayuda'),
    queryCollectionSearchSections('admin')
  ])
  return [...docs, ...ayuda, ...admin]
}, {
  server: false
})
</script>

<template>
  <UApp>
    <AppHeader />

    <UError :error="error" />

    <AppFooter />

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="allNavigation"
      />
    </ClientOnly>
  </UApp>
</template>
