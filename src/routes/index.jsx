// 예: Product 관련 라우트 추가 시 
// routes/productRoutes.js를 추가하고, index.js에서 통합하면 됩니다.

import homeRoutes from "./homeRoutes";

const routes = [
  ...homeRoutes,
];

export default routes;