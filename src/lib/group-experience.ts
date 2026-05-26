export type ExperienceItem = { company: string };

export type Group = { company: string; roles: ExperienceItem[] };

export function groupByCompany(items: ExperienceItem[]): Group[] {
  return items.reduce<Group[]>((acc, item) => {
    const last = acc[acc.length - 1];
    const companyBase = item.company.split("–")[0]?.trim();
    if (last && last.company === companyBase) {
      last.roles.push(item);
    } else {
      acc.push({ company: companyBase || "", roles: [item] });
    }
    return acc;
  }, []);
}
