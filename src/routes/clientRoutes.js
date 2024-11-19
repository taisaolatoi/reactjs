import { createBrowserRouter } from 'react-router-dom';
import Content from '../component/content';
import LayOut from '../containers/homepage/Layout';
import ProductList from '../containers/productpage/productpage';
import ProductDetail from '../containers/productdetail/productdetail';
import LayOutAccount from '../containers/accountpage/Layoutaccount';
import AccountPageIn4 from '../component/account-in4';
import AccountPageOrder from '../component/account-order';
import Cart from '../containers/cart/cart';
import Province from '../containers/province/province.jsx';
import Search from '../containers/searchpage/search.jsx';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LayOut />,
        children: [
            {
                path: "/",
                element: <Content />
            },
            {
                path: "/product",
                element: <ProductList />
            },
            {
                path: "/product_detail",
                element: <ProductDetail />
            },
            {
                path: "/cart",
                element: <Cart />
            },
            {
                path: "/province",
                element: <Province />
            },
            {
                path: "/search",
                element: <Search />
            },
            {
                path: "/account",
                element: <LayOutAccount />,
                children: [
                    {
                        path: "/account",
                        element: <AccountPageIn4 />
                    },
                    {
                        path: "/account/order",
                        element: <AccountPageOrder />
                    }
                ]
            }
        ]
    },
    {
        path: "*",
        element: <div>Không tìm thấy web theo yêu cầu</div>
    }
]);
