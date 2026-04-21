<script setup>
import { computed } from 'vue';
import AppHeader from './components/AppHeader.vue';
import AppSidebar from './components/AppSidebar.vue';
import CategoriesView from './components/CategoriesView.vue';
import CellsView from './components/CellsView.vue';
import DashboardView from './components/DashboardView.vue';
import ProductModal from './components/ProductModal.vue';
import ProductsView from './components/ProductsView.vue';
import { useWmsStore } from './stores/useWmsStore';

const store = useWmsStore();

const currentView = computed(() => {
  const map = {
    dashboard: DashboardView,
    products: ProductsView,
    cells: CellsView,
    categories: CategoriesView,
  };

  return map[store.state.activeTab] ?? DashboardView;
});

const viewProps = computed(() => {
  switch (store.state.activeTab) {
    case 'products':
      return {
        products: store.filteredProducts.value,
        getCategoryName: store.getCategoryName,
        getCellName: store.getCellName,
        getProductImage: store.getProductImage,
      };
    case 'cells':
      return {
        cells: store.cellsWithStatus.value,
        freeCellsCount: store.freeCellsCount.value,
        form: store.state.newCell,
      };
    case 'categories':
      return {
        categories: store.state.categories,
        distribution: store.categoryDistribution.value,
        newCategoryName: store.state.newCategoryName,
      };
    default:
      return {
        categoriesCount: store.state.categories.length,
        cellsCount: store.state.cells.length,
        occupiedCellsCount: store.occupiedCellsCount.value,
        freeCellsCount: store.freeCellsCount.value,
        productsCount: store.state.products.length,
        totalQuantity: store.totalQuantity.value,
        recentProducts: store.recentProducts.value,
        categoryDistribution: store.categoryDistribution.value,
        getCategoryName: store.getCategoryName,
        getCellName: store.getCellName,
        getProductImage: store.getProductImage,
      };
  }
});

const viewEvents = computed(() => {
  switch (store.state.activeTab) {
    case 'products':
      return {
        create: store.openProductModal,
        delete: store.deleteProduct,
      };
    case 'cells':
      return {
        submit: store.addCell,
        delete: store.deleteCell,
      };
    case 'categories':
      return {
        'update:newCategoryName': (value) => {
          store.state.newCategoryName = value;
        },
        submit: store.addCategory,
        delete: store.deleteCategory,
      };
    default:
      return {};
  }
});
</script>

<template>
  <div class="min-h-screen p-4 md:p-5">
    <div class="mx-auto flex max-w-[1680px] flex-col gap-5 md:flex-row">
      <AppSidebar
        :active-tab="store.state.activeTab"
        @navigate="store.state.activeTab = $event"
      />

      <main class="flex-1 space-y-5">
        <AppHeader
          :title="store.tabTitle.value"
          :product-count="store.state.products.length"
          :search-query="store.state.searchQuery"
          :active-tab="store.state.activeTab"
          @update:search-query="store.state.searchQuery = $event"
        />

        <transition name="fade-slide" mode="out-in">
          <component
            :is="currentView"
            :key="store.state.activeTab"
            v-bind="viewProps"
            v-on="viewEvents"
          />
        </transition>
      </main>
    </div>

    <ProductModal
      :open="store.state.isModalOpen"
      :form="store.state.productForm"
      :categories="store.state.categories"
      :cells="store.state.cells"
      @close="store.closeProductModal"
      @submit="store.addProduct"
    />
  </div>
</template>
