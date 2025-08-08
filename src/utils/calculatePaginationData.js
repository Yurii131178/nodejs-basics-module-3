/**Ми також винесли частину логіки, яка обраховує інформацію про пагінацію, в окрему утиліту, оскільки надалі вона може стати в пригоді при роботі з іншими ресурсами.

Функція ===calculatePaginationData=== повертає об'єкт з повною інформацією про пагінацію,
- включно з поточною сторінкою,
-кількістю елементів на сторінці,
-загальною кількістю елементів,
- загальною кількістю сторінок,
індикаторами наявності
-наступної та
-попередньої сторінок.

Це дозволяє клієнтській частині застосунку коректно управляти навігацією сторінок відповідно до наявних даних. */

// src/utils/calculatePaginationData.js

export const calculatePaginationData = (count, perPage, page) => {
  const totalPages = Math.ceil(count / perPage);
  const hasNextPage = Boolean(totalPages - page);
  const hasPreviousPage = page !== 1;

  return {
    page,
    perPage,
    totalItems: count,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };
};
