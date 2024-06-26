import { SessionClaim } from "supertokens-web-js/lib/build/recipe/session";

interface Response {
  gracePeriodEndsAt?: number;
  isVerified: boolean;
}

class ProfileValidationClaim implements SessionClaim<Response> {
  public static defaultMaxAgeInSeconds: number | undefined = undefined;
  public static id = "profileValidation";

  constructor() {
    /* empty */
  }

  getLastFetchedTime(): number | undefined {
    return undefined;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getValueFromPayload(payload: any): Response | undefined {
    return payload[ProfileValidationClaim.id] !== undefined
      ? payload[ProfileValidationClaim.id].v
      : undefined;
  }

  async refresh(): Promise<void> {
    /* empty */
  }
}

export default ProfileValidationClaim;
