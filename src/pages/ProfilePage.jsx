import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { updateProfile, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth"
import { User, Mail, Calendar, Shield, KeyRound, Pencil, CheckCircle } from "lucide-react"

export default function ProfilePage() {
    const { currentUser } = useAuth()

    // Name edit
    const [newName, setNewName] = useState("")
    const [nameMessage, setNameMessage] = useState("")

    // Password change
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passwordMessage, setPasswordMessage] = useState("")

    const handleNameUpdate = async (e) => {
        e.preventDefault()
        if (!newName.trim()) return

        try {
            await updateProfile(currentUser, { displayName: newName })
            setNameMessage("✅ Name updated successfully!")
            setNewName("")
            setTimeout(() => setNameMessage(""), 3000)
        } catch (err) {
            setNameMessage("❌ " + err.message)
        }
    }

    const handlePasswordChange = async (e) => {
        e.preventDefault()

        if (newPassword !== confirmPassword) {
            setPasswordMessage("❌ New passwords do not match!")
            return
        }

        if (newPassword.length < 6) {
            setPasswordMessage("❌ Password must be at least 6 characters!")
            return
        }

        try {
            // First re-authenticate the user
            const credential = EmailAuthProvider.credential(currentUser.email, currentPassword)
            await reauthenticateWithCredential(currentUser, credential)

            // Then update the password
            await updatePassword(currentUser, newPassword)
            setPasswordMessage("✅ Password changed successfully!")
            setCurrentPassword("")
            setNewPassword("")
            setConfirmPassword("")
            setTimeout(() => setPasswordMessage(""), 3000)
        } catch (err) {
            if (err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
                setPasswordMessage("❌ Current password is incorrect!")
            } else {
                setPasswordMessage("❌ " + err.message)
            }
        }
    }

    // Avatar: first letter of displayName or email
    const avatarLetter = (currentUser.displayName?.[0] || currentUser.email?.[0] || "?").toUpperCase()

    return (
        <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">

            {/* Profile Header */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-indigo-200">
                        {avatarLetter}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            {currentUser.displayName || "No name set"}
                        </h1>
                        <p className="text-gray-500">{currentUser.email}</p>
                    </div>
                </div>
            </div>

            {/* Account Info */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
                    <User size={20} />
                    Account Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                        <Mail size={18} className="text-indigo-500" />
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider">Email</p>
                            <p className="text-sm font-medium text-gray-800 truncate">{currentUser.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                        <Shield size={18} className={currentUser.emailVerified ? "text-green-500" : "text-red-400"} />
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider">Email Verified</p>
                            <p className={`text-sm font-medium ${currentUser.emailVerified ? "text-green-600" : "text-red-500"}`}>
                                {currentUser.emailVerified ? "Verified" : "Not Verified"}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                        <Calendar size={18} className="text-indigo-500" />
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider">Member Since</p>
                            <p className="text-sm font-medium text-gray-800">
                                {new Date(currentUser.metadata.creationTime).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                        <Calendar size={18} className="text-indigo-500" />
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider">Last Login</p>
                            <p className="text-sm font-medium text-gray-800">
                                {new Date(currentUser.metadata.lastSignInTime).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Name */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
                    <Pencil size={20} />
                    Edit Display Name
                </h2>
                <form onSubmit={handleNameUpdate} className="flex gap-3">
                    <input
                        type="text"
                        value={newName}
                        placeholder={currentUser.displayName || "Enter your name"}
                        onChange={(e) => setNewName(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                    />
                    <button
                        type="submit"
                        className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-all duration-200 shadow-sm"
                    >
                        Save
                    </button>
                </form>
                {nameMessage && (
                    <p className="mt-3 text-sm font-medium">{nameMessage}</p>
                )}
            </div>

            {/* Change Password */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
                    <KeyRound size={20} />
                    Change Password
                </h2>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-500 mb-1">Current Password</label>
                        <input
                            type="password"
                            value={currentPassword}
                            placeholder="Enter current password"
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-500 mb-1">New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            placeholder="Enter new password"
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-500 mb-1">Confirm New Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            placeholder="Confirm new password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2.5 rounded-xl font-semibold hover:opacity-90 transition shadow-sm"
                    >
                        Update Password
                    </button>
                </form>
                {passwordMessage && (
                    <p className="mt-3 text-sm font-medium">{passwordMessage}</p>
                )}
            </div>

        </div>
    )
}