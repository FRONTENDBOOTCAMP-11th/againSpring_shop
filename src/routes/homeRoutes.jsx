import Layout from "@components/layouts";
import Slider from "@pages/Slider";
import Login from "@pages/user/Login";
import Signup from "@pages/user/Signup";
import TermsOfService from "@pages/user/TermsOfService";
import Myorder from "@pages/user/Myorder";
import Myreview from "@pages/user/Myreview";
import Myquery from "@pages/user/Myquery";
import Shop from "@pages/Shop";
import Detail from "@pages/Detail";
import MainProducts from "@pages/MainProducts";
import ListPage from "@pages/notice/ListPage";
import NewPostPage from "@pages/notice/NewPostPage";
import EditPostPage from "@pages/notice/EditPostPage";
import PostDetailPage from "@pages/notice/PostDetailPage";

const homeRoutes = [
  {
    index: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <>
            {" "}
            <Slider /> <MainProducts />{" "}
          </>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "tos", element: <TermsOfService /> },
      { path: "order", element: <Myorder /> },
      { path: "review", element: <Myreview /> },
      { path: "query", element: <Myquery /> },
      { path: "shop", element: <Shop /> },
      { path: "detail/:id", element: <Detail /> },
      { path: "notice", element: <ListPage /> },
      { path: "notice/new", element: <NewPostPage /> },
      { path: "notice/edit", element: <EditPostPage /> },
      { path: "notice/detail", element: <PostDetailPage /> },
    ],
  },
];

export default homeRoutes;
