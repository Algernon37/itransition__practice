import pool from "../db.js";

class UserRepository {
  static async createUser({ userName, hashedPassword, role }) {
    const response = await pool.query(
      "INSERT INTO users (name, password, role) VALUES ($1, $2, $3) RETURNING *",
      [userName, hashedPassword, role]
    );
    return response.rows[0];
  }

  static async getUserData(userName) {
    const response = await pool.query("SELECT * FROM users WHERE name=$1", [
      userName,
    ]);

    if (!response.rows.length) {
      return null;
    }

    return response.rows[0];
  }

  static async blockUser(userId) {
    try {
      const response = await pool.query(
        "UPDATE users SET is_blocked = TRUE WHERE id = $1 RETURNING *",
        [userId]
      );
      if (response.rows.length === 0) {
        return null; 
      }
      return response.rows[0]; 
    } catch (error) {
      throw new Error(error);
    }
  }
  static async unblockUser(userId) {
    try {
      const response = await pool.query(
        "UPDATE users SET is_blocked = FALSE WHERE id = $1 RETURNING *",
        [userId]
      );
      if (response.rows.length === 0) {
        throw new Error('User not found');
      }
      return response.rows[0]; 
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async deleteUser(userId) {
    try {
      const response = await pool.query(
        "DELETE FROM users WHERE id = $1 RETURNING *",
        [userId]
      );
      if (response.rows.length === 0) {
        throw new Error('User not found');
      }
      return response.rows[0]; 
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
}
export default UserRepository;
