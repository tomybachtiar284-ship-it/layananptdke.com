import { LucideIcon } from "lucide-react";

export interface ServiceItem {
  title: string;
  description: string;
  icon: LucideIcon;
  kbliCodes?: string[];
}

export interface TeamMember {
  name: string;
  role: string;
}

export interface NavItem {
  label: string;
  href: string;
}