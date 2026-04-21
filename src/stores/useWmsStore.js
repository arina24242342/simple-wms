import { computed, reactive, watch } from "vue";
import { createDemoState, PLACEHOLDER_IMAGE } from "../data/mockData";

const STORAGE_KEYS = {
  categories: "wms_categories",
  cells: "wms_cells",
  products: "wms_products",
};

const defaultProductForm = () => ({
  name: "",
  categoryId: "",
  cellId: "",
  quantity: 1,
  image: "",
});

const defaultCellForm = () => ({
  row: "",
  number: "",
});

const readEntity = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return structuredClone(fallback);
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : structuredClone(fallback);
  } catch {
    return structuredClone(fallback);
  }
};

const getNextId = (items) =>
  items.length ? Math.max(...items.map((item) => item.id)) + 1 : 1;

let storeInstance;

export const useWmsStore = () => {
  if (storeInstance) {
    return storeInstance;
  }

  const demoState = createDemoState();

  const state = reactive({
    activeTab: "dashboard",
    searchQuery: "",
    isModalOpen: false,
    categories: [],
    cells: [],
    products: [],
    productForm: defaultProductForm(),
    newCategoryName: "",
    newCell: defaultCellForm(),
  });

  const hydrateFromStorage = () => {
    const fallback = createDemoState();
    state.categories = readEntity(STORAGE_KEYS.categories, fallback.categories);
    state.cells = readEntity(STORAGE_KEYS.cells, fallback.cells);
    state.products = readEntity(STORAGE_KEYS.products, fallback.products);
  };

  hydrateFromStorage();

  watch(
    () => state.categories,
    (categories) => {
      localStorage.setItem(STORAGE_KEYS.categories, JSON.stringify(categories));
    },
    { deep: true },
  );

  watch(
    () => state.cells,
    (cells) => {
      localStorage.setItem(STORAGE_KEYS.cells, JSON.stringify(cells));
    },
    { deep: true },
  );

  watch(
    () => state.products,
    (products) => {
      localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(products));
    },
    { deep: true },
  );

  const tabTitle = computed(() => {
    const titles = {
      dashboard: "Дашборд склада",
      products: "Товары",
      cells: "Складские ячейки",
      categories: "Категории",
    };

    return titles[state.activeTab] ?? "Simple WMS";
  });

  const filteredProducts = computed(() => {
    const query = state.searchQuery.trim().toLowerCase();

    if (!query) {
      return state.products;
    }

    return state.products.filter((product) => {
      const categoryName = getCategoryName(product.categoryId).toLowerCase();
      const cellName = getCellName(product.cellId).toLowerCase();

      return [product.name, categoryName, cellName]
        .join(" ")
        .toLowerCase()
        .includes(query);
    });
  });

  const cellsWithStatus = computed(() =>
    state.cells.map((cell) => ({
      ...cell,
      isOccupied: state.products.some((product) => product.cellId === cell.id),
    })),
  );

  const freeCellsCount = computed(
    () => cellsWithStatus.value.filter((cell) => !cell.isOccupied).length,
  );

  const occupiedCellsCount = computed(
    () => cellsWithStatus.value.filter((cell) => cell.isOccupied).length,
  );

  const totalQuantity = computed(() =>
    state.products.reduce(
      (sum, product) => sum + Number(product.quantity || 0),
      0,
    ),
  );

  const categoryDistribution = computed(() =>
    state.categories.map((category) => ({
      ...category,
      productsCount: state.products.filter(
        (product) => product.categoryId === category.id,
      ).length,
      quantity: state.products
        .filter((product) => product.categoryId === category.id)
        .reduce((sum, product) => sum + Number(product.quantity || 0), 0),
    })),
  );

  const recentProducts = computed(() =>
    [...state.products].sort((a, b) => b.id - a.id).slice(0, 4),
  );

  function getCategoryName(id) {
    return (
      state.categories.find((category) => category.id === id)?.name ??
      "Без категории"
    );
  }

  function getCellName(id) {
    const cell = state.cells.find((item) => item.id === id);
    return cell ? `Ряд ${cell.row}, ячейка ${cell.number}` : "Не назначено";
  }

  function getProductImage(image) {
    return image?.trim() ? image.trim() : PLACEHOLDER_IMAGE;
  }

  function openProductModal() {
    state.isModalOpen = true;
  }

  function closeProductModal() {
    state.isModalOpen = false;
    resetProductForm();
  }

  function resetProductForm() {
    state.productForm = defaultProductForm();
  }

  function addProduct() {
    const payload = {
      id: getNextId(state.products),
      name: state.productForm.name.trim(),
      categoryId: parseInt(state.productForm.categoryId, 10),
      cellId: parseInt(state.productForm.cellId, 10),
      quantity: parseInt(state.productForm.quantity, 10),
      image: state.productForm.image.trim(),
    };

    if (
      !payload.name ||
      Number.isNaN(payload.categoryId) ||
      Number.isNaN(payload.cellId)
    ) {
      window.alert("Заполните название, категорию и ячейку.");
      return false;
    }

    if (Number.isNaN(payload.quantity) || payload.quantity <= 0) {
      window.alert("Количество должно быть положительным числом.");
      return false;
    }

    state.products = [...state.products, payload];
    closeProductModal();
    return true;
  }

  function deleteProduct(id) {
    const product = state.products.find((item) => item.id === id);
    if (!product) {
      return;
    }

    if (window.confirm(`Удалить товар "${product.name}"?`)) {
      state.products = state.products.filter((item) => item.id !== id);
    }
  }

  function addCategory() {
    const name = state.newCategoryName.trim();

    if (!name) {
      window.alert("Введите название категории.");
      return false;
    }

    state.categories = [
      ...state.categories,
      {
        id: getNextId(state.categories),
        name,
      },
    ];
    state.newCategoryName = "";
    return true;
  }

  function deleteCategory(id) {
    const category = state.categories.find((item) => item.id === id);
    if (!category) {
      return;
    }

    const isInUse = state.products.some((product) => product.categoryId === id);
    if (isInUse) {
      window.alert("Нельзя удалить категорию, пока к ней привязаны товары.");
      return;
    }

    if (window.confirm(`Удалить категорию "${category.name}"?`)) {
      state.categories = state.categories.filter((item) => item.id !== id);
    }
  }

  function addCell() {
    const row = state.newCell.row.trim().toUpperCase();
    const number = parseInt(state.newCell.number, 10);

    if (!row || Number.isNaN(number) || number <= 0) {
      window.alert("Укажите ряд и корректный номер ячейки.");
      return false;
    }

    state.cells = [
      ...state.cells,
      {
        id: getNextId(state.cells),
        row,
        number,
      },
    ];
    state.newCell = defaultCellForm();
    return true;
  }

  function deleteCell(id) {
    const cell = state.cells.find((item) => item.id === id);
    if (!cell) {
      return;
    }

    const isInUse = state.products.some((product) => product.cellId === id);
    if (isInUse) {
      window.alert("Нельзя удалить ячейку, пока в ней хранится товар.");
      return;
    }

    if (window.confirm(`Удалить ячейку ${cell.row}-${cell.number}?`)) {
      state.cells = state.cells.filter((item) => item.id !== id);
    }
  }

  storeInstance = {
    state,
    tabTitle,
    filteredProducts,
    cellsWithStatus,
    freeCellsCount,
    occupiedCellsCount,
    totalQuantity,
    categoryDistribution,
    recentProducts,
    getCategoryName,
    getCellName,
    getProductImage,
    openProductModal,
    closeProductModal,
    addProduct,
    deleteProduct,
    addCategory,
    deleteCategory,
    addCell,
    deleteCell,
  };

  return storeInstance;
};
