export class AuthState {
  user_id: number = 0;
  first_name: string = "Guest";
  last_name: string = "";
  email: string = "";
  role: string = "";
  jwt: string = "";
}

export enum AuthActionType {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  UPDATE_TOKEN = "UPDATE_TOKEN",
}

export interface AuthAction {
  type: AuthActionType;
  payload?: any;
}

export function createUserLoginAction(userData: any): AuthAction {
  return { type: AuthActionType.LOGIN, payload: userData };
}

export function createUserLogoutAction(): AuthAction {
  return { type: AuthActionType.LOGOUT };
}

export function createJwtUpdateAction(jwtToken: string): AuthAction {
  return { type: AuthActionType.UPDATE_TOKEN, payload: jwtToken };
}

export function authReducer(currentState: AuthState = new AuthState(), action: AuthAction): AuthState {
  let newState = { ...currentState };

  switch (action.type) {
    case AuthActionType.LOGIN:
      newState = {
        user_id: action.payload.user_id, // Add user_id
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        email: action.payload.email,
        role: action.payload.role,
        jwt: action.payload.jwt,
      };
      break;
    case AuthActionType.LOGOUT:
      newState = new AuthState();
      break;
    case AuthActionType.UPDATE_TOKEN:
      newState.jwt = action.payload;
      break;
  }

  return newState;
}
