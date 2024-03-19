interface IsEmailOptions {
    /**
     * If `allow_display_name` is set to `true`, the validator will also match `Display Name <email-address>`.
     *
     * @default false
     */
    allow_display_name?: boolean | undefined;
    /**
     * If `allow_utf8_local_part` is set to `false`, the validator will not allow any non-English UTF8 character in email address' local part.
     *
     * @default true
     */
    allow_utf8_local_part?: boolean | undefined;
    /**
     *  If blacklisted_chars receives a string, then the validator will reject emails that include
     *  any of the characters in the string, in the name part.
     */
    blacklisted_chars?: string | undefined;
    /**
     *  If host_blacklist is set to an array of strings
     *  and the part of the email after the @ symbol matches one of the strings defined in it,
     *  the validation fails.
     */
    host_blacklist?: string[] | undefined;
    /**
     *  If host_whitelist is set to an array of strings
     *  and the part of the email after the @ symbol matches one of the strings defined in it,
     *  the validation succeeds.
     */
    host_whitelist?: string[] | undefined;
    /**
     * If `ignore_max_length` is set to `true`, the validator will not check for the standard max length of an email.
     *
     * @default false
     */
    ignore_max_length?: boolean | undefined;
    /**
     * If `require_display_name` is set to `true`, the validator will reject strings without the format `Display Name <email-address>`.
     *
     * @default false
     */
    require_display_name?: boolean | undefined;
    /**
     * If `require_tld` is set to `false`, e-mail addresses without having TLD in their domain will also be matched.
     *
     * @default true
     */
    require_tld?: boolean | undefined;
}
export type { IsEmailOptions };
//# sourceMappingURL=is-email-options.d.ts.map