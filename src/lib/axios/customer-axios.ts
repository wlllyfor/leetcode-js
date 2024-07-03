import { CoreApiRequest } from "@/lib/axios/axios";
import { EnumAuth } from "@/types/store/auth/RecoilType";

const CustomerAxios: CoreApiRequest = new CoreApiRequest(EnumAuth.Customer);
CustomerAxios.setupResponseInterceptorOnCustomer();
export default CustomerAxios;
