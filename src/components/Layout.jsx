import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export default function Layout() { 
    return (
        <div className="min-h-screen flex flex-col dark:bg-gray-900">
            <Header /><Toaster />
            <main className="flex-1 flex justify-center items-center min-h-0 dark:bg-gray-900">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
 }