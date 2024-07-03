import { EnumAuth } from "@/types/store/auth/RecoilType";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export type AuthStateType = {
  accessToken: string | null;
  type: EnumAuth;
};

export class AuthState {
  constructor(readonly authType: EnumAuth) {
  }

  getAuthState = () => {
    const { persistAtom } = recoilPersist();

    const defaultAuth: AuthStateType = {
      accessToken: null,
      type: this.authType,
    };

    return atom<AuthStateType>({
      key: defaultAuth.type,
      default: defaultAuth,
      effects_UNSTABLE: [ persistAtom ],
    });
  };
}
