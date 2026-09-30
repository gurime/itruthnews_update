  export interface NavLink {
  label: string;
  href: string;
  }

  export interface NavSection {
  id: string;
  label: string;
  links: NavLink[];
  }

export interface NavMenuItem {
  id: string;
  label: string;
  sections: NavSection[];
  /** If true, item renders as a locked upsell link unless the user is an elite member */
  isSubscribed?: boolean;
  /** If true, item is disabled and cannot be clicked */
  disabled?: boolean;
  /** Tailwind width class for the dropdown panel, e.g. "w-96" */
  panelWidth?: string;
  /**
   * Which edge of the trigger button the panel's same edge should anchor to
   * on desktop (md+).
   */
  align?: "left" | "right";
}


