<script setup lang="ts">
const { seo } = useAppConfig()

const { data: navigationDocs } = await useAsyncData('navigation-docs', () => queryCollectionNavigation('docs'))
const { data: navigationAyuda } = await useAsyncData('navigation-ayuda', () => queryCollectionNavigation('ayuda'))
const { data: navigationAdmin } = await useAsyncData('navigation-admin', () => queryCollectionNavigation('admin'))
const { data: navigationBienvenida } = await useAsyncData('navigation-bienvenida', () => queryCollectionNavigation('bienvenida'))

const { data: files } = useLazyAsyncData('search', async () => {
  const [docs, ayuda, admin, bienvenida] = await Promise.all([
    queryCollectionSearchSections('docs'),
    queryCollectionSearchSections('ayuda'),
    queryCollectionSearchSections('admin'),
    queryCollectionSearchSections('bienvenida')
  ])
  return [...docs, ...ayuda, ...admin, ...bienvenida]
}, {
  server: false
})

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  titleTemplate: `%s - ${seo?.siteName}`,
  ogSiteName: seo?.siteName,
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/docs-light.png',
  twitterCard: 'summary_large_image'
})

provide('navigation', {
  docs: navigationDocs,
  ayuda: navigationAyuda,
  admin: navigationAdmin,
  bienvenida: navigationBienvenida
})
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />

    <AppHeader />

    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>

    <AppFooter />

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="[
          ...(navigationDocs || []),
          ...(navigationAyuda || []),
          ...(navigationAdmin || []),
          ...(navigationBienvenida || [])
        ]"
      />
    </ClientOnly>
  </UApp>
</template>
