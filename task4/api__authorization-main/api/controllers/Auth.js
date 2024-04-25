import AuthService from "../services/Auth.js";
import ErrorsUtils from "../utils/Errors.js";
import { COOKIE_SETTINGS } from "../constants.js";
import UserRepository from "../repositories/User.js";

class AuthController {

  static async signIn(req, res) {
    const { userName, password } = req.body;
    try {
      const user = await UserRepository.getUserData(userName);
      if (!user) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }

      if (user.is_blocked) {
        return res.status(403).json({ error: 'Этот аккаунт заблокирован' });
      }

      const { accessToken, refreshToken, accessTokenExpiration } =
        await AuthService.signIn({
          userName,
          password,
          fingerprint: req.fingerprint,
        });

      res.cookie("refreshToken", refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN);
      return res.status(200).json({ accessToken, accessTokenExpiration });
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }

  static async signUp(req, res) {
    const { userName, password, role } = req.body;
    const { fingerprint } = req;

    try {
      const { accessToken, refreshToken, accessTokenExpiration } =
        await AuthService.signUp({
          userName,
          password,
          role,
          fingerprint,
        });

      res.cookie("refreshToken", refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN);

      return res.status(200).json({ accessToken, accessTokenExpiration });
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }

  static async logOut(req, res) {
    const refreshToken = req.cookies.refreshToken;
    try {
      await AuthService.logOut(refreshToken);
      res.clearCookie("refreshToken");
      return res.sendStatus(200);
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }

  static async refresh(req, res) {
    const refreshToken = req.body.refreshToken || req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(400).send("Refresh token is required");
    }
    try {
      console.log("Refreshing token with:", refreshToken);
      const { userName } = await AuthService.verifyRefreshToken(refreshToken);
      const user = await UserRepository.getUserData(userName);
      if (!user) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }

      if (user.is_blocked) {
        return res.status(403).json({ error: 'Этот аккаунт заблокирован' });
      }

      const { accessToken, newRefreshToken, accessTokenExpiration } =
        await AuthService.refresh({
          refreshToken,
          fingerprint,
        });

      res.cookie("refreshToken", newRefreshToken, COOKIE_SETTINGS.REFRESH_TOKEN);
      return res.status(200).json({ accessToken, accessTokenExpiration });
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }


  static async blockUser(req, res) {
    try {
      const userId = req.params.userId;
      console.log("Blocking user ID:", userId);
      const user = await UserRepository.blockUser(userId);
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.status(200).send('User blocked successfully');
    } catch (error) {
      console.error("Error blocking user:", error);
      res.status(500).send('Internal Server Error');
    }
  }


  static async unblockUser(req, res) {
    const userId = req.params.userId;
    try {
      const user = await UserRepository.unblockUser(userId);
      if (!user) {
        return res.status(404).send('User not found');
      }
      return res.status(200).send('User unblocked successfully');
    } catch (error) {
      console.error("Error unblocking user:", error);
      res.status(500).send('Internal Server Error');
    }
  }

  static async deleteUser(req, res) {
    const userId = req.params.userId;
    try {
      const user = await UserRepository.deleteUser(userId);
      if (!user) {
        return res.status(404).send('User not found');
      }
      return res.status(200).send('User deleted successfully');
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).send('Internal Server Error');
    }
  }

}

export default AuthController;
