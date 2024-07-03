import { HubDbTableType } from "@/types/db/hub";
import { GroupDbTableType } from "@/types/db/group";

export type EmployeeDbTableType = {
  id: number;
  name: string;
  nameKana: string | null;
  email: string;
  emailVerifiedAt: string | null;
  profileImageUrl: string;
  publicRemarks: string;
  joinedOn: string;
  currentAccessHubId: number | null;
  groupId: number;
  jobPositionId: number;
  createdAt: string;
  createdOn: string;
  updatedAt: string;
  updatedOn: string;
  deletedAt: string | null;

  // relation
  currentAccessHub: HubDbTableType | null;

  employeeHubs: {
    id: number;
    hubId: number;
    group: GroupDbTableType | null;
    groupId: number;
    employeeId: number;
    jobPositionId: number;
    employeeStatus: string;
    employeeStatusLabel: string;
    createdOn: string;
    updatedOn: string;
    createdAt: string;
    updatedAt: string;
    employee: string;
    jobPosition: string;
  }[];
};
