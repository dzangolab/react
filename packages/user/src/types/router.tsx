interface RouteOverride {
  component?: React.ReactNode;
  path?: string;
  disabled?: boolean;
}

interface RouteOverrides {
  home?: {
    public: string;
    private: string;
  };
  login?: RouteOverride;
  signup?: RouteOverride;
  passwordReset?: RouteOverride;
  passwordResetRequest?: RouteOverride;
  passwordResetRequestAcknowledge?: RouteOverride;
  profile?: RouteOverride;
}

export type { RouteOverride, RouteOverrides };
