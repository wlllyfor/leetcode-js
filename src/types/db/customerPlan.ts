import { EmployeeDbTableType } from "@/types/db/employee";
import { PlanDbType } from "@/types/db/plan";
import { GroupDbTableType } from "@/types/db/group";

export type CustomerPlanDbTableType = {
  id: number | null;
  chatWorkId: string;
  customerId: number;
  employeeId: number | null;
  groupId: number | null;
  isFree: boolean;
  status: string;
  lastPaidAt: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;

  // relation
  employee: EmployeeDbTableType | null;
  plan: PlanDbType;
  group: GroupDbTableType | null;

  // not relation
  statusLabel: string;
};
