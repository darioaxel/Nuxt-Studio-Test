<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import type { Collections } from '@nuxt/content'
import { findPageHeadline } from '@nuxt/content/utils'

definePageMeta({
  layout: 'docs'
})

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

const navigations = inject<Record<string, Ref<ContentNavigationItem[]>>>('navigation')
const navigation = computed(() => navigations?.[section]?.value || [])

const headline = computed(() => findPageHeadline(navigation.value, page.value?.path))
</script>

<template>
  <UPage v-if="page">
    <UPageHeader
      :title="page.title"
      :description="page.description"
      :headline="headline"
    />

    <UPageBody>
      <ContentRenderer
        v-if="page"
        :value="page"
      />
    </UPageBody>
  </UPage>
</template>
