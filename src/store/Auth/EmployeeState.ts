import { AuthState, AuthStateType } from "@/store/Auth/AuthState";
import { EnumAuth } from "@/types/store/auth/RecoilType";
import { RecoilState } from "recoil";

const authState: AuthState = new AuthState(EnumAuth.Employee);

const EmployeeState: RecoilState<AuthStateType> = authState.getAuthState();

export { EmployeeState };
