import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Session from "supertokens-web-js/recipe/session";
import { EmailPasswordUserType } from "supertokens-web-js/recipe/thirdpartyemailpassword";

import { AuthState } from "@/types";

enum ActionTypeEnum {
  Auth = "auth",
  GetUser = "auth/getUser",
  Logout = "auth/logout",
}

export const getUser = createAsyncThunk(
  ActionTypeEnum.GetUser,
  async (_data, { rejectWithValue }) => {
    try {
      if (await Session.doesSessionExist()) {
        const userInfo = await Session.getAccessTokenPayloadSecurely();
        if (userInfo) {
          return userInfo.user as EmailPasswordUserType;
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const logout = createAction(ActionTypeEnum.Logout);

const initialState: AuthState = {
  loading: false,
  user: undefined,
  error: null,
};

const authSlice = createSlice({
  name: ActionTypeEnum.Auth,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload;
    });

    builder.addCase(getUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload as string;
    });

    builder.addCase(logout, () => {
      return initialState;
    });
  },
});

const authReducer = authSlice.reducer;

export { authReducer as default };
