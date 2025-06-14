export type Organization = {
  id: number;
  pid: string;
  name: string;
};

export type Instructor = {
  id: number;
  pid: string;
  name: string;
  organizationId: number;
};

export type Subject = {
  id: number;
  pid: string;
  name: string;
  organizationId: number;
};

export type StudentBillingType = "self" | "payer";

export type Student = {
  id: number;
  pid: string;
  name: string;
  billingType: StudentBillingType;
  organizationId: number;
};
