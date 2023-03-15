interface RouteOverride {
  path?: string;
}

interface RouteOverrides {
  home?: ((userRole: string[]) => string) | string;
  login: RouteOverride;
  signup: RouteOverride & { disabled?: boolean };
  forgetPassword?: RouteOverride & { disabled?: boolean };
  profile?: RouteOverride;
}

export type { RouteOverride, RouteOverrides };
