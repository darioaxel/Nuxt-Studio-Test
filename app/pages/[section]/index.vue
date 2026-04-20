<script setup lang="ts">
import type { Collections } from '@nuxt/content'

const route = useRoute()
const section = route.params.section as string

const { data: page } = await useAsyncData(`${section}-index`, () => queryCollection(section as keyof Collections).path(`/${section}`).first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const title = page.value.seo?.title || page.value.title
const description = page.value.seo?.description || page.value.description

useSeoMeta({
  titleTemplate: '',
  title,
  ogTitle: title,
  description,
  ogDescription: description
})
</script>

<template>
  <ContentRenderer
    v-if="page"
    :value="page"
    :prose="false"
  />
</template>
