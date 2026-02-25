import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { addReview } from "../services/reviewService";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function ReviewForm({productId, onReviewSubmit}){
    const {currentUser} = useAuth()
    const [rating, setRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0) 
    const [comment, setComment] = useState("")
    const [loading, setLoading] = useState(false)

    if(!currentUser) {
        return (
            <div className="mt-6">
                <p className="text-gray-600 dark:text-gray-400">
                    Please <Link to="/auth" className="text-indigo-600 hover:underline">login</Link> to leave a review
                </p>
            </div>
        )
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(rating === 0) {
            toast.error("Please select a rating")
            return
        } 
        if(!comment.trim()) {
            toast.error("Please enter a comment")
            return
        } 

        setLoading(true)
        try {
            await addReview(productId, currentUser.uid, currentUser.displayName || "Anonimous", rating, comment)
            toast.success("Review add successfuly")
            setRating(0)
            setComment("")
            onReviewSubmit()
        } catch (err) {
            toast.error("Failed to add review")
        } finally{
            setLoading(false)
        }
    }

    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Add a Review</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">Rating</label>
                    <div className="flex space-x-1">
                        {[1,2,3,4,5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                className="focus:outline-none"
                            >
                                <Star
                                    className={`w-8 h-8 transition-colors ${rating >= star || hoverRating >= star
                                        ? "text-yellow-400 fill-yellow-400"
                                        : "text-gray-300 dark:text-gray-600"
                                        }`}
                                />
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">Comment</label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows="4"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Share your thoughts..."
                    ></textarea>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {loading ? "Submitting..." : "Submit Review"}
                </button>
            </form>
        </div>
    )
}
