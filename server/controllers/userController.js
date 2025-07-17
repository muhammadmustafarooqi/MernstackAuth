import User from "../models/userModel.js";

export const getUserData = async (req, res) => {
    try {
        const {userId} = req.body; // Assuming user ID is stored in req.user

        const user = await User.findById(userId); // Fetch user data from the database
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            sucess: true,
            userData: {
                id: user._id,
                name: user.name,
                email: user.email,
                isAccountVerified: user.isAccountVerified,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        });
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}