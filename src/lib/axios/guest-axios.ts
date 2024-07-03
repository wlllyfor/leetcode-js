import { CoreApiRequest } from "@/lib/axios/axios";
import { EnumAuth } from "@/types/store/auth/RecoilType";

const GuestAxios: CoreApiRequest = new CoreApiRequest(EnumAuth.Guest);
export default GuestAxios;
