export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  isActive: (pathname: string) => boolean;
}
