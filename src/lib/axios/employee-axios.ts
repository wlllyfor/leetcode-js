import { CoreApiRequest } from "@/lib/axios/axios";
import { EnumAuth } from "@/types/store/auth/RecoilType";

const EmployeeAxios: CoreApiRequest = new CoreApiRequest(EnumAuth.Employee);
EmployeeAxios.setupResponseInterceptorOnEmployee();

export default EmployeeAxios;
