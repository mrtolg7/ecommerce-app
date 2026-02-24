import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4 dark:text-white">404 - Page Not Found</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">The page you are looking for does not exist.</p>
            <Link to="/" className="text-blue-600 hover:underline bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition-all p-4">Go back to homepage</Link>
        </div>
    )
}