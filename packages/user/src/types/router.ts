interface RouteOverride {
  path?: string;
  disabled?: boolean;
}

interface RouteOverrides {
  home?: {
    public: string;
    private: string;
  };
  login: RouteOverride;
  signup: RouteOverride;
  forgetPassword?: RouteOverride;
  profile?: RouteOverride;
}

export type { RouteOverride, RouteOverrides };
