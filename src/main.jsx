import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import Home from './route/home.jsx'
import Tentang from "./route/tentang.jsx"
import ADART from "./route/art.jsx"
import Navbar from "./components/nav.jsx"
import Footer from "./components/footer.jsx"
import {
    createBrowserRouter,
    RouterProvider,
    Outlet
} from "react-router-dom";
import Kegiatan from './route/kegiatan.jsx'
import Buku from './route/buku.jsx'
import PostDetail from './route/postDetails.jsx'
import { Buffer } from 'buffer';
window.Buffer = Buffer;

const Layout = () => (
    <>
        <Navbar />
        <section className="max-w-7xl m-auto">
            <Outlet />
        </section>
        <Footer />
    </>
)

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/kegiatan",
                element: <Kegiatan />
            },
            {
                path: "/buku",
                element: <Buku />
            },
            {
                path: "/art",
                element: <ADART />
            },
            {
                path: "/tentang", 
                element: <Tentang />
            },
            {
                path: "/post/:slug",
                element: <PostDetail />
            },
        ]
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
