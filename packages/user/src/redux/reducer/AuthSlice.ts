import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Session from "supertokens-web-js/recipe/session";
import { EmailPasswordUserType } from "supertokens-web-js/recipe/thirdpartyemailpassword";

export interface AuthState {
  loading: boolean;
  user: EmailPasswordUserType | undefined;
  error: string | null;
}

enum ActionTypeEnum {
  Auth = "auth",
  GetUser = "auth/getUser",
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
  },
});

const authReducer = authSlice.reducer;

export { authReducer as default };
