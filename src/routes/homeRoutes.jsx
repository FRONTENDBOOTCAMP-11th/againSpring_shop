import Layout from "@components/layouts"
import Slider from "@components/Slider"
import Login from "@pages/user/Login";
import Myreview from "@pages/user/Myreview";
import Myquery from "@pages/user/Myquery";
import Shop from "@pages/Shop";
import Detail from "@pages/Detail";
import MainProducts from "@pages/MainProducts";

const homeRoutes = [
  {
    index: "/",
    element: <Layout />,
    children: [
      { index: true, element: (<> <Slider /> <MainProducts /> </>), },
      { path: "login", element: <Login /> },
      { path: "review", element: <Myreview /> },
      { path: "query", element: <Myquery /> },
      { path: "shop", element: <Shop /> },
      { path: "detail", element: <Detail /> },
    ],
  },
];

export default homeRoutes;
