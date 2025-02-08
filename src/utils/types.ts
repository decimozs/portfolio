export type NavigationType = {
  label: string;
  href: string;
};

type ProjectFilterType = "Relevant" | "Case Study" | "Archives";
type ProjectCategoryType =
  | "Internet of Things"
  | "Web Development"
  | "Game Development"
  | "Mobile Development"
  | "Desktop Application"
  | "Machine Learning"
  | "CLI";
type BannerAcronym = "IOT" | "WEB" | "GAME" | "MAD" | "ML" | "CLI" | "DESK";

export type ProjectType = {
  no: number;
  id: string;
  title: string;
  type: ProjectFilterType[];
  category: ProjectCategoryType;
  header: string;
  name: string;
  description?: string;
  technologies: Array<string>;
  banner: BannerAcronym;
  source: string;
  createdAt?: string;
};

export type LinkType = {
  href: string;
  label: string;
};

export type WorkflowType = {
  tool: string;
  name: string;
};
