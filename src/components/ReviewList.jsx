import {Star} from "lucide-react"

export default function ReviewList({reviews}) {
    if(reviews.length === 0) {
        return <p className="text-gray-400">No reviews yet</p>
    }

    return (
        <div className="space-y-4">
            {reviews.map(review => (
                  <div key={review.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold dark:text-white">{review.userName}</span>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  className={star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                />
              ))}
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
        </div>
      ))}
      </div>
    )
}