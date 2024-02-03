import { UserService } from "../services/services.js";

export const updatedUserRoleController = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await UserService.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.role === "admin" || user.role === "premium") {
      return res
        .status(409)
        .json({ code: 1, error: "The user is already Admin or Premium" });
    }

    const rolePremium = "premium";

    const updatedUser = await UserService.update(user._id, {
      role: rolePremium,
    });
    res
      .status(201)
      .json({
        status: "success",
        message: "User role updated successfully",
        payload: updatedUser,
      });
  } catch (err) {
    logger.error("Error updating user role", err.message);
    res.status(500).json({ error: err.message });
  }
};
